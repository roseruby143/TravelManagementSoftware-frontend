import { ViewCabComponent } from './../view-cab/view-cab.component';
import { GetDataService } from './../../services/GetData.service';
import { ValidateFormInputService } from './../../services/validate-form-input.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'tms-edit-cab',
  templateUrl: './edit-cab.component.html',
  styleUrls: ['./edit-cab.component.css']
})
export class EditCabComponent implements OnInit {

  @Input()
  cabInfo:any;

  @Output()
  public closeModel: EventEmitter<void> = new EventEmitter<void>();

  hasCabData: boolean = false;
  cabInfoForm:FormGroup = new FormGroup({});
  private _validModel : boolean = true;
  private _validPlate : boolean = true;
  private _validPriceperHour : boolean = true;
  saveButtonDisabled:boolean = false;

  constructor(private formBuilder:FormBuilder, private _validateForm : ValidateFormInputService, private _getDateService : GetDataService, private _cabManagement: ViewCabComponent) { }

  ngOnInit(): void {
    //console.log(this.cabInfo);
    if(this.cabInfo) {
      this.initialForm(this.cabInfo);
    } else{
      this.initialForm();
    }
  }

  initialForm(cabInfoObj: any = null) {
    console.log(JSON.stringify(cabInfoObj));
    if (cabInfoObj === null) {
      this.cabInfoForm = this.formBuilder.group({
        id: [null, Validators.required],
        cabModel: ["", Validators.required],
        cabType: ["", Validators.required],
        plateNo: ["", Validators.required],
        pricePerHour: ["",Validators.required]
      });
      this.saveButtonDisabled = true;
      this._validModel = false;
      this._validPriceperHour= false;
      this._validPlate = false;
      //console.log(this.cabInfoForm);
    } else {
      this.cabInfoForm = this.formBuilder.group({
        id: [Number(cabInfoObj.id), Validators.required],
        cabType: [cabInfoObj.cabType, Validators.required],
        cabModel: [cabInfoObj.cabModel, Validators.required],
        plateNo: [cabInfoObj.plateNo, Validators.required],
        pricePerHour: [cabInfoObj.pricePerHour, Validators.required]
      });
      this.hasCabData = true;
      //console.log(cabInfoObj);
      //console.log(!this.cabInfoForm);
    }
  }

  close() {
    this.closeModel.emit();
  }

  validateModel(){
    const inputElement:any = document.getElementById('cabCreationInputModel');
    this._validModel = (inputElement?.value && inputElement?.value.trim()!='')?true:false;
    //console.log(`is name valid : ${this.validName}`);
    if(!this._validModel){
      this._validateForm.displayErrorMessage(inputElement,'Model cannot be blank');
    }else{
      this._validateForm.removeErrorMessage(inputElement);
    }
    this.isInputFieldEmpty();
  }

  validatePlate(){
    const inputElement:any = document.getElementById('cabCreationInputPlate');
    if(inputElement && inputElement.value.trim()!=='')
    {
      this._validPlate =  true;
      this._validateForm.removeErrorMessage(inputElement);
    }else{
      this._validateForm.displayErrorMessage(inputElement,'License Plate cannot be blank');
    }
    this.isInputFieldEmpty();
  }

  validatePrice(){
    const inputElement:any = document.getElementById('cabCreationInputPrice');
    if(inputElement && (<HTMLInputElement>inputElement).value.trim() === ''){
      this._validateForm.displayErrorMessage(inputElement,'Price cannot be blank');
      this._validPriceperHour = false;
    }else if(inputElement && Number((<HTMLInputElement>inputElement).value.trim()) < 0){
      this._validateForm.displayErrorMessage(inputElement,'Price cannot be negative ');
      this._validPriceperHour = false;
    }
    else{
      this._validateForm.removeErrorMessage(inputElement);
      this._validPriceperHour = true;
    }
    this.isInputFieldEmpty();
  }

  isInputFieldEmpty(){
    if(this._validModel && this._validPlate && this._validPriceperHour){
      this.saveButtonDisabled = false;
    }else{
      this.saveButtonDisabled = true;
    }    
  }

  updateCab(data:any){
    let action = this.cabInfo?'update':'save';
    console.log(`action : ${action}`);
    this._getDateService.updateCab(data.cabInfoForm.value,action).subscribe({
      next: data => {
        if(action=='save')
          this._cabManagement.allCabs.push(data);
        else if(action=='update'){
          let updatingDataIndex = this._cabManagement.allCabs.findIndex(e => e.id == data.id);
          this._cabManagement.allCabs[updatingDataIndex] = data;
          //console.log(`updatingDataIndex : ${updatingDataIndex}`);
        }
      },
      error : err => console.log(err)
    });
    this.close();
  }

}
