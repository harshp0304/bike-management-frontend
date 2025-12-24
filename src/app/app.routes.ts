import { Routes } from '@angular/router';
import { BikeDetailsComponent } from './pages/bike-details/bike-details.component';
import { BikeComponent } from './pages/bike/bike.component';
import { EditBikeComponent } from './pages/edit-bike/edit-bike.component';
import { LoginComponent } from './pages/start-up/login/login.component';
import { SignupComponent } from './pages/start-up/signup/signup.component';
import { authGuard } from './guard/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'bike', component: BikeComponent, canActivate: [authGuard] },
  {
    path: 'bike-details',
    component: BikeDetailsComponent,
    canActivate: [authGuard],
  },
  { path: 'edit-bike', component: EditBikeComponent, canActivate: [authGuard] },
];
