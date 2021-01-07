import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SportsIndiaService {

  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }
  postHeaders() {
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    // headers.append("Access-Control-Allow-Origin","*");
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

}
