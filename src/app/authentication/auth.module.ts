import { ComponentAccessGuard } from './../guard/component-access.guard';
import { WelcomeComponent } from './../welcome/welcome.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';



@NgModule({
  declarations: [
    LoginComponent,
    ForgotPasswordComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:'login', component:LoginComponent},
      {path:'welcome', component:WelcomeComponent, canActivate:[ComponentAccessGuard]}
    ]),
    NgbNavModule,
    FormsModule
  ]
})
export class AuthModule { }
