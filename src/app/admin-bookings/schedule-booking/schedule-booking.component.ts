import { GetDataService } from '../../services/GetData.service';
import { ValidateFormInputService } from '../../services/validate-form-input.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tms-schedule-booking',
  templateUrl: './schedule-booking.component.html',
  styleUrls: ['./schedule-booking.component.css']
})
export class ScheduleBookingComponent implements OnInit {

  constructor(private _validateInputServiceObj : ValidateFormInputService, private _getDataServiceObj : GetDataService) { }

  projectTitle:string = "Travel Buddy";

  ngOnInit(): void {
    this.projectTitle = this._getDataServiceObj.projectTitle;
  }

  validateDate():boolean{
    const dateInputElement:any = document.getElementById('meetingScheduleMDateInput');
    return this._validateInputServiceObj.validateDate(dateInputElement);
  }

  validateTime():boolean{
    const timeInputElement:any = document.getElementById('meetingTime');
    return true;//this._validateInputServiceObj.validateTime(timeInputElement);
  }

}
