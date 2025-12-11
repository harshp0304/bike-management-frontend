import { CommonModule } from '@angular/common';
import { Component, Inject, inject, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MasterService } from '../../services/master.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BikeDetails } from '../../models/master';
@Component({
  selector: 'app-edit-bike',
  imports: [FormsModule, CommonModule],
  templateUrl: './edit-bike.component.html',
  styleUrl: './edit-bike.component.scss',
})
export class EditBikeComponent implements OnInit {
  private masterService = inject(MasterService);
  private dialogRef = inject(MatDialogRef<EditBikeComponent>);

  bikeDetails = new BikeDetails();
  ID = 0;
  insuranceDetails: any = {
    CompanyName: '',
    Policy_Number: '',
    Valid_Until: '',
    Premium: 0,
    Coverage_Amount: 0,
  };
  maintenanceDetails: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any = {}) {
    console.log(this.data);
  }

  ngOnInit() {
    if (this.mode === 'edit' && this.bike) {
      this.formData = JSON.parse(JSON.stringify(this.bike));
    }
    if (this.data && this.data.bikeID) {
      this.getBikeDetailsByID(this.data.bikeID);
    } else {
      // Initialize with default values for new bike
      this.bikeDetails = new BikeDetails();
    }
  }

  getBikeDetailsByID(id: number) {
    this.masterService.getBikeDetailsById(id).subscribe((res: any) => {
      this.bikeDetails = res;
      // Initialize insuranceDetails with the first insurance record or a new one if none exists
      this.insuranceDetails = this.bikeDetails.InsuranceDetails?.[0] || {
        CompanyName: '',
        Policy_Number: '',
        Valid_Until: '',
        Premium: 0,
        Coverage_Amount: 0,
      };
      this.maintenanceDetails = this.bikeDetails.MaintenanceDetails;
      console.log('Bike Details:', this.bikeDetails);
      console.log('Insurance Details:', this.insuranceDetails);
    });
  }

  onSubmit() {
    // Create a new BikeDetails instance and map the form values
    const tempModel = {
      BikeID: this.bikeDetails.BikeID || 0,
      BikeName: this.bikeDetails.BikeName || '',
      Model: this.bikeDetails.Model || '',
      Brand: this.bikeDetails.Brand || '',
      Color: this.bikeDetails.Color || '',
      PurchaseDate: this.bikeDetails.PurchaseDate
        ? new Date(this.bikeDetails.PurchaseDate).toISOString()
        : new Date().toISOString(),
      Valid_Until: this.bikeDetails.Valid_Until
        ? new Date(this.bikeDetails.Valid_Until).toISOString()
        : new Date().toISOString(),
      Amount: Number(this.bikeDetails.Amount) || 0,
      RegistrationNo: this.bikeDetails.RegistrationNo || '',
      FuelType: this.bikeDetails.FuelType || '',
      InsuranceDetails: [
        {
          CompanyName: this.insuranceDetails?.CompanyName || '',
          Policy_Number: this.insuranceDetails?.Policy_Number || '',
          Valid_Until: this.insuranceDetails?.Valid_Until
            ? new Date(this.insuranceDetails.Valid_Until).toISOString()
            : new Date().toISOString(),
          Premium: Number(this.insuranceDetails?.Premium) || 0,
          Coverage_Amount: Number(this.insuranceDetails?.Coverage_Amount) || 0,
          Valid_From: this.insuranceDetails?.Valid_From
            ? new Date(this.insuranceDetails.Valid_From).toISOString()
            : new Date().toISOString(),
        },
      ],
    };

    console.log('Submitting bike data:', tempModel);

    if (this.bikeDetails.BikeID) {
      // Update existing bike
      this.masterService
        .updateBikeDetails(this.bikeDetails.BikeID, tempModel)
        .subscribe({
          next: (response) => {
            console.log('Bike updated successfully', response);
            this.dialogRef.close();
            // Handle success (e.g., show success message, navigate away)
          },
          error: (error) => {
            console.error('Error updating bike', error);
            // Handle error
          },
        });
    } else {
      // Create new bike
      this.masterService.addBike(tempModel).subscribe({
        next: (response) => {
          console.log('Bike created successfully', response);
          // Handle success
          this.dialogRef.close();
        },
        error: (error) => {
          console.error('Error creating bike', error);
          // Handle error
        },
      });
    }
  }

  @Input() isOpen: boolean = false;
  @Input() mode: 'create' | 'edit' = 'create';
  @Input() bike?: BikeDetails;

  currentStep: number = 1;
  totalSteps: number = 5;

  // Form data
  formData: Partial<BikeDetails> = {
    BikeID: 0,
    BikeName: '',
    Model: '',
    PurchaseDate: '',
    RegistrationNo: '',
    Amount: 0,
    FuelType: 'Petrol',
    Color: '',
    // InsuranceDetails: {
    //   provider: '',
    //   policyNumber: '',
    //   validUntil: '',
    //   premium: 0,
    //   coverageAmount: 0,
    // },
    // maintenance: [],
  };

  // Validation errors
  errors: any = {};

  close(): void {
    this.dialogRef.close();
    this.resetForm();
  }

  nextStep(): void {
    if (this.validateStep(this.currentStep)) {
      if (this.currentStep < this.totalSteps) {
      }
    }
    this.currentStep++;
  }

  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  goToStep(step: number): void {
    if (step <= this.currentStep || this.validateStep(this.currentStep)) {
    }
    this.currentStep = step;
  }

  validateStep(step: number): boolean {
    this.errors = {};

    switch (step) {
      case 1: // Basic Info
        if (!this.bikeDetails?.BikeName)
          this.errors.BikeName = 'Bike name is required';
        if (!this.bikeDetails?.Model) this.errors.Model = 'Brand is required';
        if (!this.bikeDetails?.PurchaseDate)
          this.errors.PurchaseDate = 'Model is required';
        if (!this.bikeDetails?.Amount || this.bikeDetails?.Amount <= 0)
          this.errors.amount = 'Valid amount is required';
        break;

      case 2: // Insurance
        const insurance = this.bikeDetails.InsuranceDetails?.[0]; // Get the first insurance record
        if (!insurance?.CompanyName)
          this.errors.CompanyName = 'Company name is required';
        if (!insurance?.Policy_Number)
          this.errors.Policy_Number = 'Policy number is required';
        if (!insurance?.Valid_Until)
          this.errors.Valid_Until = 'Validity date is required';
        if (!insurance?.Premium) this.errors.Premium = 'Premium is required';
        if (!insurance?.Coverage_Amount)
          this.errors.Coverage_Amount = 'Coverage amount is required';
        break;

      case 3: // Registration
        if (!this.bikeDetails.RegistrationNo)
          this.errors.RegistrationNo = 'Registration number is required';
        if (!this.bikeDetails.Valid_Until)
          this.errors.Valid_Until = 'Validity date is required';
        break;
    }

    return Object.keys(this.errors).length === 0;
  }

  // onSubmit(): void {
  //   if (this.validateStep(this.currentStep)) {
  //     // Generate ID for new bikes
  //     if (this.mode === 'create') {
  //       this.formData.id = Date.now();
  //     }

  //     this.saveBike.emit(this.formData as Bike);
  //     this.close();
  //   }
  // }

  resetForm(): void {
    this.currentStep = 1;
    this.errors = {};
    this.formData = {
      BikeID: 0,
      BikeName: '',
      Model: '',
      PurchaseDate: '',
      RegistrationNo: '',
      Amount: 0,
      FuelType: 'Petrol',
      Color: '',
    };
  }

  getProgressPercentage(): number {
    return (this.currentStep / this.totalSteps) * 100;
  }
}
