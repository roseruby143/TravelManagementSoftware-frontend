import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientBookingManagementComponent } from './client-booking-management.component';

describe('ClientBookingManagementComponent', () => {
  let component: ClientBookingManagementComponent;
  let fixture: ComponentFixture<ClientBookingManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientBookingManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientBookingManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
