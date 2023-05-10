import { ReactiveFormsModule } from '@angular/forms';
import { NewCabComponent } from './new-cab/new-cab.component';
import { ComponentAccessGuard } from './../guard/component-access.guard';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewCabComponent } from './view-cab/view-cab.component';
import { EditCabComponent } from './edit-cab/edit-cab.component';



@NgModule({
  declarations: [
    ViewCabComponent,
    EditCabComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path: 'all-cabs' , component: ViewCabComponent, canActivate:[ComponentAccessGuard]},
      {path: 'new-cab' , component: NewCabComponent, canActivate:[ComponentAccessGuard]}
    ])
  ]
})
export class AdminCabModule { }
