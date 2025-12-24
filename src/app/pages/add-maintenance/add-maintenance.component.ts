import { Component, Inject, inject, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MasterService } from '../../services/master.service';
import { BikeDetails, Maintenance } from '../../models/master';

@Component({
  selector: 'app-add-maintenance',
  imports: [SharedModule],
  templateUrl: './add-maintenance.component.html',
  styleUrl: './add-maintenance.component.scss',
})
export class AddMaintenanceComponent implements OnInit {
  private dialogRef = inject(MatDialogRef<AddMaintenanceComponent>);
  private masterService = inject(MasterService);
  constructor(@Inject(MAT_DIALOG_DATA) public data: any = {}) {
    console.log(this.data);
  }

  ngOnInit(): void {
    if (this.data && this.data.mnID) {
      console.log(this.data.mnID);
      this.getMaintenanceDetailsByID(this.data.mnID);
    }
  }

  maintenanceDetails = new Maintenance();

  getMaintenanceDetailsByID(id: number) {
    this.masterService.getMaintenanceDetailsById(id).subscribe((res: any) => {
      if (res && res.length > 0) {
        this.maintenanceDetails = res[0];
        if (this.maintenanceDetails.Service_Date) {
          this.maintenanceDetails.Service_Date = new Date(
            this.maintenanceDetails.Service_Date
          )
            .toISOString()
            .split('T')[0];
        }
      }
    });
  }

  onSubmit() {
    const tempModal: any = {
      Service_Type: this.maintenanceDetails.Service_Type,
      Service_Cost: this.maintenanceDetails.Service_Cost,
      Mileage: this.maintenanceDetails.Mileage,
      Service_Center: this.maintenanceDetails.Service_Center,
      Notes: this.maintenanceDetails.Notes,
      Service_Date: this.maintenanceDetails.Service_Date,
      BikeID: this.data.bikeID,
    };

    if (this.data.mnID) {
      // For update, include the MNID
      this.masterService
        .updateMaintenance(this.data.mnID, tempModal)
        .subscribe((res: any) => {
          this.dialogRef.close();
        });
    } else {
      this.masterService.addMaintenance(tempModal).subscribe((res: any) => {
        this.dialogRef.close();
      });
    }
  }
  close(): void {
    this.dialogRef.close();
  }
}
