import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterService } from '../../services/master.service';
import { BikeDetails, Maintenance } from '../../models/master';
import { SharedModule } from '../../shared/shared.module';
import { EditBikeComponent } from '../edit-bike/edit-bike.component';
import { MatDialog } from '@angular/material/dialog';
import { AddMaintenanceComponent } from '../add-maintenance/add-maintenance.component';

@Component({
  selector: 'app-bike-details',
  imports: [SharedModule],
  templateUrl: './bike-details.component.html',
  styleUrl: './bike-details.component.scss',
})
export class BikeDetailsComponent implements OnInit {
  bikeData: BikeDetails = {
    BikeName: '',
    Model: '',
    Brand: '',
    Color: '',
    Amount: 0,
    RegistrationNo: '',
    FuelType: 'Petrol',
    InsuranceDetails: [],
  };
  activeTab: string = 'overview';

  // Maintenance dialog
  isMaintenanceDialogOpen: boolean = false;
  maintenanceForm: Partial<Maintenance> = {
    Service_Date: new Date(),
    Service_Type: '',
    Service_Cost: 0,
    Mileage: 0,
    Notes: '',
  };

  // Edit mode
  isEditMode: boolean = false;
  EditVike: BikeDetails = {
    BikeName: '',
    Model: '',
    Brand: '',
    Color: '',
    Amount: 0,
    RegistrationNo: '',
    FuelType: 'Petrol',
    InsuranceDetails: [],
  };
  bikeID: number = 0;
  MaintenanceDetails: any;
  InsuranceDetails: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private masterService: MasterService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params['bikeID'] && params['bikeID'] > 0) {
        const bikeID = +params['bikeID'];
        this.getDetailsByID(bikeID);
      }
    });

    // if (!this.bike) {
    //   this.router.navigate(['/bike']);
    // } else {
    //   this.editedBike = JSON.parse(JSON.stringify(this.bike));
    // }
  }

  getDetailsByID(id: number) {
    this.masterService.getBikeDetailsById(id).subscribe((res: any) => {
      this.bikeData = res;
      console.log(this.bikeData);
      this.MaintenanceDetails = this.bikeData?.MaintenanceDetails;
      console.log(this.MaintenanceDetails);
      this.InsuranceDetails = this.bikeData?.InsuranceDetails?.[0];
      console.log(this.InsuranceDetails);
    });
  }
  goBack(): void {
    this.router.navigate(['/bike']);
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  getTotalMaintenanceCost(): number {
    return (
      this.MaintenanceDetails?.reduce(
        (sum: number, m: any) => sum + m.Service_Cost,
        0
      ) || 0
    );
  }

  getInsuranceStatus(): { status: string; daysLeft: number; color: string } {
    if (!this.InsuranceDetails)
      return { status: 'Unknown', daysLeft: 0, color: '#999' };

    const today = new Date();
    const expiryDate = new Date(this.InsuranceDetails.Valid_Until);
    const daysLeft = Math.ceil(
      (expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysLeft < 0) {
      return {
        status: 'Expired',
        daysLeft: Math.abs(daysLeft),
        color: '#e74c3c',
      };
    } else if (daysLeft <= 30) {
      return { status: 'Expiring Soon', daysLeft, color: '#f39c12' };
    } else {
      return { status: 'Active', daysLeft, color: '#2ecc71' };
    }
  }

  // Maintenance Management
  // openAddMaintenanceDialog(): void {
  //   this.maintenanceForm = {
  //     date: new Date().toISOString().split('T')[0],
  //     type: '',
  //     cost: 0,
  //     mileage: this.bikeData?.currentMileage || 0,
  //     notes: '',
  //   };
  //   this.isMaintenanceDialogOpen = true;
  // }

  closeMaintenanceDialog(): void {
    this.isMaintenanceDialogOpen = false;
  }

  // addMaintenance(): void {
  //   if (this.bikeData && this.maintenanceForm.type && this.maintenanceForm.cost) {
  //     this.bikeData.Maintenance.unshift({
  //       date:
  //         this.maintenanceForm.date || new Date().toISOString().split('T')[0],
  //       type: this.maintenanceForm.type,
  //       cost: this.maintenanceForm.cost,
  //       mileage: this.maintenanceForm.mileage || 0,
  //       notes: this.maintenanceForm.notes,
  //     });

  //     // Update bike in service
  //     // this.masterService.updateBike(this.bike.id, this.bike);

  //     this.closeMaintenanceDialog();
  //   }
  // }

  // deleteMaintenance(index: number): void {
  //   if (confirm('Are you sure you want to delete this maintenance record?')) {
  //     this.bikeData?.Maintenance.splice(index, 1);
  //     if (this.bikeData) {
  //       // this.masterService.updateBike(this.bike.id, this.bike);
  //     }
  //   }
  // }

  // Edit Mode

  onEdit(bikeID: number) {
    this.dialog.open(EditBikeComponent, {
      data: {
        bikeID: bikeID,
      },
    });
    console.log(bikeID);
    this.dialog.afterAllClosed.subscribe(() => {
      this.getDetailsByID(bikeID);
    });
  }

  // Delete Bike
  deleteBike(): void {
    if (
      confirm(
        `Are you sure you want to delete ${this.bikeData?.BikeName}? This action cannot be undone.`
      )
    ) {
      if (this.bikeData) {
        // this.bikeService.deleteBike(this.bike.id);
        this.router.navigate(['/dashboard']);
      }
    }
  }

  openAddMaintenance(bikeID: number) {
    this.dialog.open(AddMaintenanceComponent, {
      data: {
        bikeID: bikeID,
      },
    });
    console.log(bikeID);
    this.dialog.afterAllClosed.subscribe(() => {
      this.getDetailsByID(bikeID);
    });
  }

  openEditMaintenance(mnID: number) {
    this.dialog.open(AddMaintenanceComponent, {
      data: {
        mnID: mnID,
      },
    });
    console.log(mnID);
    // this.dialog.afterAllClosed.subscribe(() => {
    //   this.getDetailsByID(mnID);
    // });
  }

  // Calculate average maintenance cost
  getAverageMaintenanceCost(): any {
    if (!this.bikeData?.MaintenanceDetails) return 0;
    return (
      this.getTotalMaintenanceCost() / this.bikeData?.MaintenanceDetails.length
    );
  }

  // Get last maintenance
  // getLastMaintenance(): Maintenance | undefined {
  //   return this.bikeData?.Maintenance[0];
  // }

  // Calculate days since last service
  getDaysSinceLastService(): number {
    // const lastService = this.getLastMaintenance();
    if (!this.MaintenanceDetails) return 0;

    const today = new Date();
    const serviceDate = new Date(this.MaintenanceDetails[0].Service_Date);
    return Math.floor(
      (today.getTime() - serviceDate.getTime()) / (1000 * 60 * 60 * 24)
    );
  }

  getLastMaintenance(): Maintenance | undefined {
    if (!this.MaintenanceDetails || this.MaintenanceDetails.length === 0) {
      return undefined;
    }

    const sorted = [...this.MaintenanceDetails].sort(
      (a: Maintenance, b: Maintenance) =>
        new Date(b.Service_Date || '').getTime() - new Date(a.Service_Date || '').getTime()
    );

    return sorted[0];
  }

  // Export bike data as JSON
  exportBikeData(): void {
    if (!this.bikeData) return;

    const dataStr = JSON.stringify(this.bikeData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${this.bikeData?.BikeName?.replace(/\s+/g, '_')}_data.json`;
    link.click();
    URL.revokeObjectURL(url);
  }

  // Print bike details
  printDetails(): void {
    window.print();
  }

  // Share bike details
  shareBike(): void {
    if (navigator.share && this.bikeData) {
      navigator
        .share({
          title: this.bikeData?.BikeName,
          text: `Check out my ${this.bikeData?.BikeName} ${this.bikeData?.Model}`,
          url: window.location.href,
        })
        .catch((err) => console.log('Error sharing:', err));
    } else {
      // Fallback: copy link to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  }
}
