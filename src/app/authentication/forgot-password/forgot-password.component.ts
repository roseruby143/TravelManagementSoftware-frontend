import { ValidateFormInputService } from './../../services/validate-form-input.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  sendButtonDisabled:boolean = true;
  
  constructor(private _ngModalObj : NgbModal, private _validateFormInputObj: ValidateFormInputService) { }

  ngOnInit(): void {
  }

  checkModalInput(emailInput:any){
    console.log(`--- forgotPasswordFormDate is: ${emailInput.forgotPasswordEmail} and its length is : ${(<string>emailInput.forgotPasswordEmail).trim().length}`);
    let emailInputElement = document.getElementById('forgotPasswordEmail');
    if(emailInputElement && emailInput && (<string>emailInput.forgotPasswordEmail).trim().length > 0)
    {
      this.sendButtonDisabled = !this._validateFormInputObj.validateEmail(emailInputElement);
    }
    else{
      console.log(`--- checkModalInput is: ${emailInputElement}`);
      this._validateFormInputObj.displayErrorMessage(emailInputElement,'Enter your email');
      this.sendButtonDisabled = true;
    }
  }

  sendNewPassword(modalInput:any){
    console.log(`--- forgotPasswordFormDate is: ${modalInput.forgotPasswordEmail}`);
  }

  close(){
    this._ngModalObj.dismissAll();
  }

}
