import { Router } from '@angular/router';
import { LoginServicesService } from './../services/login-services.service';
import { Component, OnInit } from '@angular/core';
import { GetDataService } from '../services/GetData.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private _companyName : string = 'Travel Buddy';
  //private _subscribeObject;
  errorMessage:string = '';
   
  constructor(private _navbardata:GetDataService, public loginServiceObj:LoginServicesService, private _router:Router) { }

  //userNameDisplayed:string = this.loginServiceObj.loginUser;
  //baseUrl:string = window.location.pathname;
  isUserLoggedIn = false;

  ngOnInit(): void {
  }

  get companyName():string{
    return this._companyName;
  }

  onLogout(){
    this.loginServiceObj.logout();
    this._router.navigate(['/login']);
  }
  
  viewBookingRouting(){
    if(this.loginServiceObj.loginUser == 'admin'){
      this._router.navigate(['/manage-booking']);
    }
    else if(this.loginServiceObj.loginUser == 'client1'){
      this._router.navigate(['/mybookings']);
    }
  }

}
