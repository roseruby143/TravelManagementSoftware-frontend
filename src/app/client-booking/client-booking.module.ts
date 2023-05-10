import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentAccessGuard } from './../guard/component-access.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientBookingManagementComponent } from './client-booking-management/client-booking-management.component';
import { RouterModule } from '@angular/router';
import { ClientEditBookingComponent } from './client-edit-booking/client-edit-booking.component';



@NgModule({
  declarations: [
    ClientBookingManagementComponent,
    ClientEditBookingComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: 'mybookings' , component: ClientBookingManagementComponent, canActivate:[ComponentAccessGuard]},
      {path: 'manage-mybookings' , component: ClientEditBookingComponent, canActivate:[ComponentAccessGuard]}
    ]),
    ReactiveFormsModule
  ]
})
export class ClientBookingModule { }
