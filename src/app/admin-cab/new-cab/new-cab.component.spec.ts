import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCabComponent } from './new-cab.component';

describe('NewCabComponent', () => {
  let component: NewCabComponent;
  let fixture: ComponentFixture<NewCabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewCabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
