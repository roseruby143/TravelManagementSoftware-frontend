import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { GetDataService } from '../../services/GetData.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-view-clients',
  templateUrl: './view-clients.component.html',
  styleUrls: ['./view-clients.component.css']
})
export class ViewClientsComponent implements OnInit,CanActivate {

  constructor(private _getDataService : GetDataService, private _modalService:NgbModal, private _router:Router, private _clientModalService : NgbModal) { }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    let url: string = state.url;
    console.log(`Client View canActivate urs: ${url}`);
    return this.checkLogin(url);
  }
  allClients : any[]=[];
  public clientInfo:any;
  projectTitle:string = "Travel Buddy";
  closeResult='';

  ngOnInit(): void {
    this.projectTitle = this._getDataService.projectTitle;
    this._getDataService.getAllClients().subscribe({
      next: data => {
        this.allClients = data; 
        //console.log(JSON.stringify(data));
      },
      error : err => console.log(err)
    });
  }

  checkLogin(url: string): true | UrlTree {
    //console.log("Url: " + url)
    let val: string | null = localStorage.getItem('isUserLoggedIn');

    if(val != null && val){
       if(url == "/login")
          return this._router.parseUrl('/welcome');
       else 
          return true;
    } else {
       return this._router.parseUrl('/login');
    }
 }

  openClientAddEditModal(modalRef:any, clientObject = null){
    //console.log(`----------- ${clientObject}`);    
    this._modalService.open(modalRef);
    this.clientInfo = clientObject;
  }

  closeModel(modelRef:any) {
    this._modalService.dismissAll(modelRef);
  }

  openDeleteClientModal(content:any, data:any){
    this.clientInfo = data;
    this._clientModalService.open(content).result.then(
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

  deleteClient(clientDataToBeDeleted:any){
    console.log(clientDataToBeDeleted);
    this._getDataService.deleteClient(clientDataToBeDeleted).subscribe({
      next: data => {
        this.allClients.splice(this.allClients.indexOf(clientDataToBeDeleted),1); 
        //console.log(JSON.stringify(data));
      },
      error : err => console.log(err)
    });
    this.closeModel('deleteClientModal');
  }

}
