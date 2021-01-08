import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CookiesService } from './cookie.service';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SportsIndiaService {

  baseUrl = environment.baseUrl;

  onErrorInterceptor$: Subject<any> = new BehaviorSubject<any>(null);
  emitErrorInterceptor(value: boolean) {
    this.onErrorInterceptor$.next(value);
  }
  get showErrorInterceptor(): BehaviorSubject<any> {
    return (this.onErrorInterceptor$ as BehaviorSubject<any>);
  }

  constructor(private http: HttpClient,
    private cs: CookiesService
  ) { }
  postHeaders() {
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    return headers;
  }

  getAllEmploymentTypes() {
    let url = `${this.baseUrl}employmenttypes/getAllEmploymentTypes`
    return this.http.get(url);
  }

  getEmpSubTypesByEmpTypeId(etid) {
    let url = `${this.baseUrl}employmentsubtypes/getEmploymentSubTypesByTypeId/${etid}`
    return this.http.get(url);
  }

  getAddressByPin(pin) {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    let url = `http://www.postalpincode.in/api/pincode/${pin}`;
    return this.http.get(proxyurl + url);
  }

  postApplication(data) {
    let url = `${this.baseUrl}applications/createApplication`;
    let headers = this.postHeaders();
    return this.http.post(url, data, { headers: headers });
  }

  singin(creds) {
    let url = `${this.baseUrl}users/signin`;
    let headers = this.postHeaders();
    return this.http.post(url, creds, { headers: headers });
  }

  changePW(data) {
    let url = `${this.baseUrl}users/changePassword`;
    let headers = this.postHeaders();
    return this.http.post(url, data, { headers: headers });
  }

  createEmpSubType(data) {
    let url = `${this.baseUrl}employmentsubtypes/createEmploymentSubType`;
    let headers = this.postHeaders();
    return this.http.post(url, data, { headers: headers });
  }
  updateEmpSubType(data) {
    let url = `${this.baseUrl}employmentsubtypes/updateEmploymentSubType`;
    let headers = this.postHeaders();
    return this.http.put(url, data, { headers: headers });
  }
  getAllEmpSubTypes() {
    let url = `${this.baseUrl}employmentsubtypes/getAllEmploymentSubTypes`
    return this.http.get(url);
  }
  resetPW(data){
    let url = `${this.baseUrl}users/resetPassword`;
    let headers = this.postHeaders();
    return this.http.post(url, data, { headers: headers });
  }
}
