import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SharedModule } from '../../shared/shared.module';
import { MatDialog } from '@angular/material/dialog';
import { EditBikeComponent } from '../edit-bike/edit-bike.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bike',
  imports: [SharedModule],
  templateUrl: './bike.component.html',
  styleUrl: './bike.component.scss',
})
export class BikeComponent implements OnInit {
  private masterService = inject(MasterService);
  private dialog = inject(MatDialog);
  private router = inject(Router);

  ngOnInit() {
    this.getData();
  }

  activeTab: string = 'overview';
  bikeData: any;
  displayedColumns: string[] = [
    'BikeName',
    'Model',
    'PurchaseDate',
    'RegistrationNo',
    'Insurance',
    'Color',
    'Amount',
    'Action',
  ];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  getData() {
    this.masterService.getBikes().subscribe((res: any) => {
      this.bikeData = res.data;
      console.log(this.bikeData);
      this.dataSource.data = this.bikeData;
    });
  }

  onAdd() {
    this.dialog.open(EditBikeComponent);

    this.dialog.afterAllClosed.subscribe(() => {
      this.getData();
    });
  }

  onEdit(id: any) {
    this.dialog.open(EditBikeComponent, { data: { bikeID: id } });
    console.log(id);
    this.dialog.afterAllClosed.subscribe(() => {
      this.getData();
    });
  }

  getTotalInvestment(): number {
    return this.bikeData
      ? this.bikeData.reduce(
          (sum: any, bike: any) => sum + Number(bike.Amount || 0),
          0
        )
      : 0;
  }

  getActiveInsuranceCount(): number {
    return this.bikeData
      ? this.bikeData.filter(
          (bike: any) =>
            bike.Insurance && !this.isInsuranceExpired(bike.Insurance)
        ).length
      : 0;
  }

  isInsuranceExpired(validUntil: string): boolean {
    const today = new Date();
    const expiryDate = new Date(validUntil);
    return expiryDate < today;
  }

  getTotalServiceRecords(): number {
    return this.bikeData
      ? this.bikeData.reduce(
          (sum: any, bike: any) => sum + (bike.MaintenanceDetails?.length || 0),
          0
        )
      : 0;
  }

  onViewDetails(id: any) {
    this.router.navigate(['/bike-details'], { queryParams: { bikeID: id } });
    console.log(id);
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }
}
