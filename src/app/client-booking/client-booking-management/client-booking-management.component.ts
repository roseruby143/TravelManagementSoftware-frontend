import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { GetDataService } from './../../services/GetData.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tms-client-booking-management',
  templateUrl: './client-booking-management.component.html',
  styleUrls: ['./client-booking-management.component.css']
})
export class ClientBookingManagementComponent implements OnInit {
  projectTitle: string = 'Travel Buddy';
  myBookingList: any[] = [];
  bookingInfo : any;
  closeResult = '';
  public clientId:Number = 1;
  public clientName:any;

  constructor(private _getDataService:GetDataService, private _bookingModalService : NgbModal) { }

  ngOnInit(): void {
    this.projectTitle = this._getDataService.projectTitle;
    this._getDataService.getMyBookings(this.clientId).subscribe({
      next: data => {
        this.myBookingList = data;
        this.clientName = data[0]?.client.name;
        console.log(`onInit() this.clientName : ${this.clientName}`);
        //this._getDataService.bookingListFromService = data; 
      },
      error : err => console.log(err)
    });
  }

  modalShowHandler(data:Event){
    //console.log(data.currentTarget);
    if(document.getElementById("clientIdinModal")){
     // document.getElementById("clientIdinModal").innerText= data.currentTarget;
    }
  }

  openBookingAddEditModal(modalRef:any, bookingObject:any){
    //console.log(`----------- ${clientObject}`);    
    this._bookingModalService.open(modalRef);
    this.bookingInfo = bookingObject;
  }

  closeModel(modelRef:any) {
    this._bookingModalService.dismissAll(modelRef);
  }

  openBookingCancelModal(content:any, data:any){
    this.bookingInfo = data;
    this._bookingModalService.open(content).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
  }

  cancelBooking(bookingToBeCanceled:any){
    console.log(`booking to be canceled is : ${JSON.stringify(bookingToBeCanceled)}`);
    this._getDataService.deleteClientBooking(bookingToBeCanceled).subscribe({
      next: data => {
        //console.log(`before splice : this._getDataService.bookingListFromService is : ${JSON.stringify(data)}`)
        this.myBookingList.splice(this.myBookingList.indexOf(bookingToBeCanceled),1);
        //this._getDataService.bookingListFromService = this.bookingList;
        //console.log(`after splice : this._getDataService.bookingListFromService is : ${this._getDataService.bookingListFromService}`);
      },
      error : err => console.log(err)
    });
    this.closeModel('bookingCancelModal');
  }

  private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}
	}

}
