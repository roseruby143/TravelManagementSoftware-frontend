import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { GetDataService } from '../../services/GetData.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-booking-management',
  templateUrl: './booking-management.component.html',
  styleUrls: ['./booking-management.component.css']
})
export class BookingManagementComponent implements OnInit {

  bookingList : any[] = [];
  //bookingKeys : any[] = [];
  bookingInfo : any;
  projectTitle:string = "";
  closeResult = '';
  public clientId:Number = 1;

  constructor(private _getDataService : GetDataService, private _bookingModalService : NgbModal) { }

  ngOnInit(): void {
    this.projectTitle = this._getDataService.projectTitle;
    this._getDataService.getBookingList().subscribe({
      next: data => {
        this.bookingList = data;
        //console.log(`onInit() this.bookingList : ${JSON.stringify(this.bookingList)}`);
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

  openBookingAddEditModal(modalRef:any, bookingObject = null){
    //console.log(`----------- ${clientObject}`);    
    this._bookingModalService.open(modalRef);
    this.bookingInfo = bookingObject;
  }

  closeModel(modelRef:any) {
    this._bookingModalService.dismissAll(modelRef);
  }

  /* openBookingCancelModal(modalRef:any, bookingId:any) {
    cancelBooking(bookingId);
    } */

  cancelBooking(bookingToBeCanceled:any){
    console.log(`booking to be canceled is : ${JSON.stringify(bookingToBeCanceled)}`);
    this._getDataService.deleteBooking(bookingToBeCanceled).subscribe({
      next: data => {
        //console.log(`before splice : this._getDataService.bookingListFromService is : ${this._getDataService.bookingListFromService}`)
        this.bookingList.splice(this.bookingList.indexOf(bookingToBeCanceled),1);
      },
      error : err => console.log(err)
    });
    this.closeModel('bookingCancelModal');
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
