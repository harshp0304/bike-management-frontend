import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Cls_User } from '../../../models/master';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    SharedModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  hidePassword = true;
  user = new Cls_User();

  onSubmit() {
    const temmModel = new Cls_User();
    temmModel.MobileNo = this.user.MobileNo;
    temmModel.Password = this.user.Password;
    console.log(temmModel);

    this.authService.login(temmModel).subscribe((res) => {
      sessionStorage.setItem('token', res.access_token);
      sessionStorage.setItem('UMID', res.user.UMID);
      sessionStorage.setItem('MobileNo', res.user.MobileNo);
      this.router.navigate(['/bike']);

      console.log(res);
    });
  }
}
