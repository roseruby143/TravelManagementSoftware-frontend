import { ViewClientsComponent } from '../view-clients/view-clients.component';
import { GetDataService } from '../../services/GetData.service';
import { ValidateFormInputService } from '../../services/validate-form-input.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {

  hasClientData: boolean = false;
  clientInfoForm:FormGroup = new FormGroup({});
  private _validName : boolean = true;
  private _validEmail : boolean = true;
  private _validPhone : boolean = true;
  private _validPOC : boolean = true;
  saveButtonDisabled:boolean = false;

  @Input()
  public clientInfo:any;

  @Output()
  public closeModel: EventEmitter<void> = new EventEmitter<void>();

  constructor(private formBuilder:FormBuilder, private _validateForm : ValidateFormInputService, private _getDateService : GetDataService, private _clientManagement: ViewClientsComponent) { }


  ngOnInit(): void {
    //console.log(this.clientInfo);
    if(this.clientInfo) {
      this.initialForm(this.clientInfo);
    } else{
      this.initialForm();
    }
  }

  initialForm(clientInfoObj: any = null) {
    console.log(JSON.stringify(clientInfoObj));
    if (clientInfoObj === null) {
      this.clientInfoForm = this.formBuilder.group({
        clientId: [null, Validators.required],
        name: ["", Validators.required],
        address: ["", Validators.required],
        phone: ["",Validators.required]
      });
      this.saveButtonDisabled = true;
      this._validEmail = false;
      this._validName = false;
      this._validPOC = false;
      this._validPhone = false;
      //console.log(this.clientInfoForm);
    } else {
      this.clientInfoForm = this.formBuilder.group({
        clientId: [Number(clientInfoObj.clientId), Validators.required],
        name: [clientInfoObj.name, Validators.required],
        address: [clientInfoObj.address, Validators.required],
        phone: [clientInfoObj.phone, Validators.required]
      });
      this.hasClientData = true;
      //console.log(clientInfoObj);
      //console.log(!this.clientInfoForm);
    }
  }

  close() {
    this.closeModel.emit();
  }

  validateName(){
    const inputElement:any = document.getElementById('clientCreationInputName');
    this._validName = this._validateForm.validateName(inputElement);
    //console.log(`is name valid : ${this.validName}`);
    this.isInputFieldEmpty();
  }

  validateAddress(){
    const inputElement:any = document.getElementById('clientCreationInputEmail');
    if(inputElement && inputElement.value.trim()!=='')
      this._validEmail =  true;
    //console.log(`is email valid : ${this.validEmail}`);
    this.isInputFieldEmpty();
  }

  validatePhone(){
    const inputElement:any = document.getElementById('clientPhoneModal');
    if(inputElement && (<HTMLInputElement>inputElement).value.trim() === ""){
      this._validateForm.displayErrorMessage(inputElement,'Phone cannot be blank');
      this._validPhone = false;
    }else{
      this._validateForm.removeErrorMessage(inputElement);
      this._validPhone = true;
    }
    this.isInputFieldEmpty();
  }

  isInputFieldEmpty(){
    if(this._validEmail && this._validName && this._validPhone){
      this.saveButtonDisabled = false;
    }else{
      this.saveButtonDisabled = true;
    }    
  }

  updateClient(data:any){
    let action = this.clientInfo?'update':'save';
    console.log(`action : ${action}`);
    this._getDateService.updateClient(data.clientInfoForm.value,action).subscribe({
      next: data => {
        if(action=='save')
          this._clientManagement.allClients.push(data);
        else if(action=='update'){
          let updatingDataIndex = this._clientManagement.allClients.findIndex(e => e.clientId == data.clientId);
          this._clientManagement.allClients[updatingDataIndex] = data;
          //console.log(`updatingDataIndex : ${updatingDataIndex}`);
        }
      },
      error : err => console.log(err)
    });
    this.close();
  }
}
