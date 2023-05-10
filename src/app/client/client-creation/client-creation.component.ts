import { Router } from '@angular/router';
import { GetDataService } from '../../services/GetData.service';
import { ValidateFormInputService } from '../../services/validate-form-input.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-creation',
  templateUrl: './client-creation.component.html',
  styleUrls: ['./client-creation.component.css']
})
export class ClientCreationComponent implements OnInit {

  constructor(private _validateForm : ValidateFormInputService, private _getDataServiceObj:GetDataService, private _router:Router) { }
  projectName = this._getDataServiceObj.projectTitle;
  validateName():boolean{
    const inputElement:any = document.getElementById('clientCreationInputName');
    return this._validateForm.validateName(inputElement);
  }

  validateEmail():boolean{
    const inputElement:any = document.getElementById('clientCreationInputEmail');
    return this._validateForm.validateEmail(inputElement);
  }

  ngOnInit(): void {
    
  }

}
