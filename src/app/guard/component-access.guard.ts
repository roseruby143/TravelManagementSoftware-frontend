import { LoginServicesService } from './../services/login-services.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComponentAccessGuard implements CanActivate {
  
  constructor(private _loginService: LoginServicesService, private _router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let url: string = state.url;
      return this.checkLogin(url);
    }
  
  checkLogin(url: string): true | UrlTree {
    //console.log("Url: " + url)
    let val: string|null = localStorage.getItem('isUserLoggedIn');

    if(val != null && val){
        if(url == "/login")
          return this._router.parseUrl('/welcome');
        else 
          return true;
    } else {
        return this._router.parseUrl('/login');
    }
  }
  
}
