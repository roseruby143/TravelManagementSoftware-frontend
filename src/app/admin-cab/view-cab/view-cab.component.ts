import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { GetDataService } from './../../services/GetData.service';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tms-view-cab',
  templateUrl: './view-cab.component.html',
  styleUrls: ['./view-cab.component.css']
})
export class ViewCabComponent implements OnInit {

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    let url: string = state.url;
    console.log(`cab View canActivate urs: ${url}`);
    return this.checkLogin(url);
  }
  
  allCabs : any[]=[];
  public cabInfo:any;
  projectTitle:string = "Travel Buddy";
  closeResult='';
  
  constructor(private _getDataService : GetDataService, private _modalService:NgbModal, private _router:Router, private _cabModalService : NgbModal) { }

  ngOnInit(): void {
    this.projectTitle = this._getDataService.projectTitle;
    this._getDataService.getAllCabs().subscribe({
      next: data => {
        this.allCabs = data; 
        console.log(JSON.stringify(data));
      },
      error : err => console.log(err)
    });
  }

  checkLogin(url: string): true | UrlTree {
    //console.log("Url: " + url)
    let val: string | null = localStorage.getItem('isUserLoggedIn');

    if(val != null && val){
       if(url == "/login")
          return this._router.parseUrl('/all-cabs');
       else 
          return true;
    } else {
       return this._router.parseUrl('/login');
    }
 }

  openCabAddEditModal(modalRef:any, cabObject = null){
    //console.log(`----------- ${cabObject}`);    
    this._modalService.open(modalRef);
    this.cabInfo = cabObject;
  }

  closeModel(modelRef:any) {
    this._modalService.dismissAll(modelRef);
  }

  openDeleteCabModal(content:any, data:any){
    this.cabInfo = data;
    this._cabModalService.open(content).result.then(
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

  deleteCab(cabDataToBeDeleted:any){
    console.log(cabDataToBeDeleted);
    this._getDataService.deleteCab(cabDataToBeDeleted).subscribe({
      next: data => {
        this.allCabs.splice(this.allCabs.indexOf(cabDataToBeDeleted),1); 
        //console.log(JSON.stringify(data));
      },
      error : err => console.log(err)
    });
    this.closeModel('deleteCabModal');
  }

}
