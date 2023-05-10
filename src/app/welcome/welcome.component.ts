import { LoginServicesService } from './../services/login-services.service';
import { GetDataService } from './../services/GetData.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(private _getDateServiceObj:GetDataService,  public loginServiceObj:LoginServicesService) { }

  projectTitle:string = "Travel Buddy";

  ngOnInit(): void {
    this.projectTitle = this._getDateServiceObj.projectTitle;
  }

}
