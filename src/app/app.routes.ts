import { Routes } from '@angular/router';
import { BikeDetailsComponent } from './pages/bike-details/bike-details.component';
import { BikeComponent } from './pages/bike/bike.component';
import { EditBikeComponent } from './pages/edit-bike/edit-bike.component';

export const routes: Routes = [
  { path: '', redirectTo: 'bike', pathMatch: 'full' },
  { path: 'bike', component: BikeComponent },
  { path: 'bike-details', component: BikeDetailsComponent },
  { path: 'edit-bike', component: EditBikeComponent },

];
