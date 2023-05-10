import { BookingModule } from '../admin-bookings/booking.module';
import { BookingManagementComponent } from '../admin-bookings/booking-management/booking-management.component';
import { ComponentAccessGuard } from '../guard/component-access.guard';
import { ClientCreationComponent } from './client-creation/client-creation.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditClientComponent } from './edit-client/edit-client.component';
import { ViewClientsComponent } from './view-clients/view-clients.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    ViewClientsComponent,
    EditClientComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path: 'all-clients' , component: ViewClientsComponent, canActivate:[ComponentAccessGuard]},
      {path: 'client-creation' , component: ClientCreationComponent, canActivate:[ComponentAccessGuard]}
    ])
  ]
})
export class ClientModule { }
