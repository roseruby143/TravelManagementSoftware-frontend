import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateFormInputService {

  constructor() { }

  validateNoOfDays(emailInput:any):boolean{
    if(emailInput.value > 0)
      return true;
    else
      return false;
  }

  validateEmail(emailInput:any):boolean {
    //let input = document.getElementById("inputEmail3");
    let validRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;///^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;  
    if (emailInput.value.match(validRegex)) {
        this.removeErrorMessage(emailInput);
        return true;
    } else {
        this.displayErrorMessage(emailInput,'Enter a valid Email Address');
        return false;
    }
  }

  validateName(nameInput:any):boolean{
    let validNameRegex = /^[ a-zA-Z\-\’]+$/;
    if(nameInput.value.match(validNameRegex)){
        this.removeErrorMessage(nameInput);
        return true;
    }else{
        this.displayErrorMessage(nameInput,'Enter a valid name');
        return false;
    }
}

validateDate(dateInput:any):boolean{
    let dateRegExp = /^\d{4}\-\d{1,2}\-\d{1,2}$/ ; // /^\d{1,2}\/\d{1,2}\/\d{4}$/;  
    let dayOfTheWeek = (new Date(dateInput.value)).getDay();
    
    //console.log(`${new Date(dateInput.value).getTime() >= new Date(new Date().toISOString().slice(0, 10)).getTime()}`);
    console.log(dateInput.value.match(dateRegExp));
    if(dateInput.value.match(dateRegExp)){
      console.log(new Date(dateInput.value).getTime() < new Date(new Date().toISOString().slice(0, 10)).getTime());
        this.removeErrorMessage(dateInput);
        if(new Date(dateInput.value).getTime() < new Date(new Date().toISOString().slice(0, 10)).getTime()){
          this.displayErrorMessage(dateInput,'Select a future date');
          return false;
        }
        return true;
    }else{
        this.displayErrorMessage(dateInput,'Enter a valid date');
        return false;
    }
}

validateTime(timeInput:any):boolean{
  const time = timeInput.value;
  //console.log(`---- time is: ${time} comparision is: ${time >= '08:00' && time <= '18:00'}`);
  if(time >= '08:00' && time <= '18:00'){
    this.removeErrorMessage(timeInput);
    return true;
  }
  this.displayErrorMessage(timeInput,'Select business hours');
  return false;
}

displayErrorMessage(input:any, message:string){
  input.classList.add('invalid-input');
  //var x = input.nextSibling.childNodes;
  if(input.nextSibling == null || input.nextSibling.childNodes.length <= 0){
      let childElement = document.createElement('div');
      childElement.innerHTML = message;
      childElement.setAttribute('class','invalid-input-error-message');
      childElement.setAttribute('style','color:red;padding:0px 5px;');

      if(input.nextSibling){
        input.parentNode.insertBefore(childElement,input.nextSibling);
      }else{
        input.parentNode.appendChild(childElement);
      }
  }
}

removeErrorMessage(input:any){
  if(input.classList != null)
    input.classList.remove('invalid-input');
  if(input.nextSibling!=null && input.nextSibling.className === 'invalid-input-error-message')
    input.nextSibling.remove();  
  }
}

