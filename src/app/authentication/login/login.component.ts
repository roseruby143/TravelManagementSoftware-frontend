import { LoginServicesService } from './../../services/login-services.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ValidateFormInputService } from './../../services/validate-form-input.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _validateFormInputObj : ValidateFormInputService, private _forgotPasswordModal : NgbModal, private _loginServiceObj:LoginServicesService, private _router: Router ) { }

  private _userName:string = '';
  private _password:string = '';
  active = 'login';
  private _validuserName:boolean = false;
  private _validPassword:boolean = false;
  disableLoginButton : boolean = true;

  ngOnInit(): void {
    /* console.log(`---- validateInput() : nav active id is : ${(<HTMLInputElement>inputObj).value.trim()}`); */
    // ------ delete after backend code ------- //
    //this._loginServiceObj.loginUser = "Login/Register";
  }

  validateInput(elementId:string):boolean{
    const inputObj = document.getElementById(elementId);
    if(inputObj && (<HTMLInputElement>inputObj).value.trim() === ""){
      switch(elementId){
        case 'loginName' : 
          this._validateFormInputObj.displayErrorMessage(inputObj,"Email/Username cannot be blank");
          this._validuserName = false;
          break;
        case 'loginPassword' : 
          this._validateFormInputObj.displayErrorMessage(inputObj,"Password cannot be blank");
          this._validPassword = false;
          break;
      }
      return this.loginButtonDisabled();
    }else if(inputObj && (<HTMLInputElement>inputObj).value.trim() !== ""){
      switch(elementId){
        case 'loginName' : 
          this._validateFormInputObj.removeErrorMessage(inputObj);
          this._validuserName = true;
          break;
        case 'loginPassword' : 
          this._validateFormInputObj.removeErrorMessage(inputObj);
          this._validPassword = true;
          break;
      }
      return this.loginButtonDisabled();
    }
    return this.loginButtonDisabled();
  }

  loginButtonDisabled():boolean{
    if(this._validuserName && this._validPassword)
      this.disableLoginButton = false;
    return this.disableLoginButton;
  }

  onLogin(onLoginInputData:any){
    //console.log(`---- validateInput() : nav active id is : ${onLoginInputData.loginName}`);
    //console.log(`---- validateInput() : nav active id is : ${onLoginInputData.loginPassword}`);
    this._loginServiceObj.loginUser = onLoginInputData.loginName; // *********** not needed
    this._userName = onLoginInputData.loginName;
    this._password = onLoginInputData.loginPassword;

    this._loginServiceObj.login(this._userName, this._password)
         .subscribe( data => { 
          if(this._userName =='admin')  
            this._router.navigate(['/manage-booking']);
          else if(this._userName =='client1')  
            this._router.navigate(['/mybookings']);
      });
  }

  forgotPassword(modalRef:any){
    //console.log(`----------- ${clientObject}`);    
    this._forgotPasswordModal.open(modalRef);
  }

  closeModel(modelRef:any) {
    this._forgotPasswordModal.dismissAll(modelRef);
  }

  /* onChangeTab(){
    console.log(`---- nav active id is : ${this.active}`);
    if(this.active=='register'){
      console.log(`---- nav active id's parent class : ${document.querySelector('registerNavContent')?.parentElement }`);
      document.querySelector('registerNavContent')?.classList.remove('fade');
    }
  } */

}
