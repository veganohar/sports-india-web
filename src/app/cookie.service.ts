import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class CookiesService {

  constructor(
    private cookieService:CookieService
  ) { }

  
  setCookie(n,v,e){
    this.cookieService.set(n,v, {expires:new Date(e*1000)} );
  }
  getCookie(n){
     return this.cookieService.get(n);
  }
  getAllCookies(){
    return this.cookieService.getAll();
  }
  checkCookie(n){
    return this.cookieService.check(n);
  }
  deleteCookie(n){
    return this.cookieService.delete(n);
  }
  deleteAllCookies(){
    this.cookieService.deleteAll();
  }
}
