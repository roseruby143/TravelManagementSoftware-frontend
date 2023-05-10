import { BookingManagementComponent } from '../booking-management/booking-management.component';
import { GetDataService } from '../../services/GetData.service';
import { ValidateFormInputService } from '../../services/validate-form-input.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'tms-edit-booking',
  templateUrl: './edit-booking.component.html',
  styleUrls: ['./edit-booking.component.css']
})
export class EditBookingComponent implements OnInit {

  @Input()
  public bookingInfo:any;
  @Input()
  public clientId:any;

  @Output()
  public closeModel: EventEmitter<void> = new EventEmitter<void>();

  bookingInfoForm:FormGroup = new FormGroup({});
  hasBookingData:boolean = false;
  saveButtonDisabled:boolean = false;
    
  private _validNoOfDays = true;
  private _validCabDetail = true;
  private _validDate = true;
  
  public listOfCabs:any;

  constructor(private formBuilder:FormBuilder, private _validateForm : ValidateFormInputService, private _getDataService :GetDataService, private _bookingManagement: BookingManagementComponent) { }

  ngOnInit(): void {
    //console.log(`Input bookingInfo data is : ${this.bookingInfo}`);
    this._getDataService.getAllCabs().subscribe({
      next: data => {
        this.listOfCabs = data;
        //this._getDataService.bookingListFromService = data; 
      },
      error : err => console.log(err)
    });
    if(this.bookingInfo) {
      this.initialForm(this.bookingInfo);
    } else{
      this.initialForm();
    }
  }

  initialForm(bookingInfoObj: any = null) {
    console.log(`edit booking initial form data: ${JSON.stringify(bookingInfoObj)}`);
    if (bookingInfoObj === null) {
      this.bookingInfoForm = this.formBuilder.group({
        bookingId: ["", Validators.required],
        clientName: ["", Validators.required],
        cabModel: ["", Validators.required],
        date: ["",Validators.required],
        noOfDays: ["",Validators.required],
        total: ["",Validators.required]
      });
      this.saveButtonDisabled = true;
      this._validCabDetail = false;
      this._validNoOfDays = false;
      this._validDate = false;
      //console.log(this.clientInfoForm);
    } else {
      console.log();
      //const price = bookingInfoObj.price * (bookingInfoObj.noOfDays);
      //const timings = `${startTime}`
      //const preSelectedCab = `${bookingInfoObj.cab.id} - ${bookingInfoObj.cab.id}`;
      this.bookingInfoForm = this.formBuilder.group({
        bookingId: [bookingInfoObj.id, Validators.required],
        clientName: [bookingInfoObj.client.name, Validators.required],
        cabModel: [bookingInfoObj.cab.id, Validators.required],
        date: [bookingInfoObj.date, Validators.required],
        noOfDays: [bookingInfoObj.noOfDays,Validators.required],
        total: [bookingInfoObj.price, Validators.required]
      });
      this.bookingInfoForm.controls['cabModel'].setValue(`${bookingInfoObj.cab.id} - ${bookingInfoObj.cab.id}`, {onlySelf: true});
      this.hasBookingData = true;
    }
  }

  close(){
    this.closeModel.emit();
  }

  validateInputEmpty(elementId:string,errorDisplayName:string){
    const inputElement:any = document.getElementById(elementId);
    //console.log(`validate input value : ${inputElement.value}`);
    if(inputElement && (<HTMLInputElement>inputElement).value.trim() === "" || inputElement.value.trim() < 1){
      this._validateForm.displayErrorMessage(inputElement,`Invalid ${errorDisplayName}`);
      switch(elementId){
        case 'bookingNoOfDays':
          this._validNoOfDays = false;
          break;
        case 'cabDeatilDropdown':
          this._validCabDetail = false;
          break;
        case 'bookingDateModal':
          this._validDate = false;
          break;
      }
    }else{
      this._validateForm.removeErrorMessage(inputElement);
      switch(elementId){
        case 'bookingNoOfDays':
          this._validNoOfDays = inputElement.value > 0 ? true : false;
          break;
        case 'bookingDateModal':
          this._validDate = this._validateForm.validateDate(inputElement);
          break;
        case 'cabDeatilDropdown':
          this._validCabDetail = inputElement.value != 'chooseCab';
          break;
      }
    }
    this.isInputFieldEmpty();
  }

  isInputFieldEmpty(){
    if(this._validCabDetail && this._validNoOfDays && this._validDate){
      this.saveButtonDisabled = false;
    }else{
      this.saveButtonDisabled = true;
    }    
  }

  reCalculateAmount(inputId:any){
    if(inputId == 'bookingNoOfDays')
      this.validateInputEmpty('bookingNoOfDays','Number of Days');
    //this._validateForm.validateDate(document.getElementById('bookingNoOfDays'));//this.validateInputEmpty('number','Number of Days');
    else if(inputId == 'cabDeatilDropdown'){
      this.validateInputEmpty('cabDeatilDropdown','Cab Selected');
    }
    const cabId = ((document.getElementById('cabDeatilDropdown')) as HTMLSelectElement).selectedOptions[0].id ;
    if(cabId && cabId!= 'chooseCab')
    {
      let cabPrice = 0;
      let totalAmount =0;
      
      const cabDetail = this.listOfCabs.find((e: { id: Number; }) => e.id === Number(cabId));
      cabPrice = cabDetail.pricePerHour;
      //console.log(`price of cab : ${cabPrice}`);
      const noOfDays:any = (document.getElementById('bookingNoOfDays') as HTMLSelectElement).value;
      totalAmount = cabPrice * noOfDays;
      (document.getElementById('bookingPrice') as HTMLSelectElement).value = (totalAmount).toString();
    }
  }

  updateBooking(data:any){
    //console.log(`data to be updated is : ${data}`);
    let action:any;
    if(this.bookingInfo === null){
      this.bookingInfo = {
        client:{id:this.clientId},
        cab:this.listOfCabs.find((e: { id: Number; }) => e.id === Number(((document.getElementById('cabDeatilDropdown')) as HTMLSelectElement).selectedOptions[0].id)),
        date:(document.getElementById('bookingDateModal') as HTMLSelectElement).value,
        noOfDays:Number((document.getElementById('bookingNoOfDays') as HTMLSelectElement).value),
        price:(document.getElementById('bookingPrice') as HTMLSelectElement).value
      };
      action = 'save';
    }
    else{
      this.bookingInfo.date = (document.getElementById('bookingDateModal') as HTMLSelectElement).value;

    //this.bookingInfo.cab = null;
      this.bookingInfo.noOfDays = Number((document.getElementById('bookingNoOfDays') as HTMLSelectElement).value);
      this.bookingInfo.price =(document.getElementById('bookingPrice') as HTMLSelectElement).value;

      this.bookingInfo.cab = this.listOfCabs.find((e: { id: Number; }) => e.id === Number(((document.getElementById('cabDeatilDropdown')) as HTMLSelectElement).selectedOptions[0].id));
      action = 'update';
    }
    //console.log(`Booking ID to be updated is : ${JSON.stringify(this.bookingInfo)}`);
    this._getDataService.updateBooking(this.bookingInfo,action).subscribe({
      next: data => {
        if(action=='save')
          this._bookingManagement.bookingList.push(data);
      },
      error : err => console.log(err)
    });
    this.close();
  }

}
