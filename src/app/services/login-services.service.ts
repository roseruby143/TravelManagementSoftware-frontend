import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginServicesService {

  constructor() { }

  loginUser:string = "Login/Register";

  isUserLoggedIn: boolean = false;

  login(userName: string, password: string): Observable<boolean> {
    //console.log(userName);
    //console.log(password);
    this.loginUser = userName;
    this.isUserLoggedIn = (userName == 'admin' && password == 'admin') || (userName == 'client1' && password == 'client1');
    localStorage.setItem('isUserLoggedIn', this.isUserLoggedIn ? "true" : "false"); 

    return of(this.isUserLoggedIn).pipe(
        delay(100),
        tap(val => { 
          //console.log("Is User Authentication is successful: " + val); 
        })
    );
  }

   logout(): void {
      this.isUserLoggedIn = false;
      localStorage.removeItem('isUserLoggedIn'); 
   }
}
