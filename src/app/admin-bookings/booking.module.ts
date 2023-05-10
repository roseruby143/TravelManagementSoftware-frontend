import { ComponentAccessGuard } from '../guard/component-access.guard';
import { ScheduleBookingComponent } from './schedule-booking/schedule-booking.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditBookingComponent } from './edit-booking/edit-booking.component';
import { BookingManagementComponent } from './booking-management/booking-management.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    BookingManagementComponent,
    EditBookingComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path: 'schedule-booking' , component: ScheduleBookingComponent, canActivate:[ComponentAccessGuard]},
      {path: 'manage-booking' , component: BookingManagementComponent, canActivate:[ComponentAccessGuard]}
    ])
  ],
  exports:[]
})
export class BookingModule { }
