import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCabComponent } from './view-cab.component';

describe('ViewCabComponent', () => {
  let component: ViewCabComponent;
  let fixture: ComponentFixture<ViewCabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
