import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientEditBookingComponent } from './client-edit-booking.component';

describe('ClientEditBookingComponent', () => {
  let component: ClientEditBookingComponent;
  let fixture: ComponentFixture<ClientEditBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientEditBookingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientEditBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
