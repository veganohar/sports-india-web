import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookiesService } from '../cookie.service';
import { SidenavService } from '../sidenav.service';
import { SportsIndiaService } from '../sportsindia.service';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent implements OnInit {
  loginForm: FormGroup;
  loginform: boolean = true;
  forgetpassw: boolean = false;
  constructor(public sidenavservice: SidenavService,
    private fb: FormBuilder,
    private router: Router,
    private sis: SportsIndiaService,
    private cs: CookiesService,
    public sidenavService:SidenavService
  ) { }

  ngOnInit() {
    if (this.cs.checkCookie("accessToken")) {
      this.router.navigate(['/dashboard']);
    }
    this.initiateForm();
  }

  initiateForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  login(fd) {
this.sis.singin(fd).subscribe(res=>{
  let resp:any = res;
  this.cs.setCookie( 'accessToken', resp.accessToken, resp.exp );
  this.cs.setCookie("exp",resp.exp,resp.exp);
this.sidenavservice.emitShowSideNav(true);
  this.router.navigate(['/dashboard']);
},(err)=>{
  alert(err);
});
  }
  forgetpassword() {
    this.loginform = !this.loginform;
    this.forgetpassw = !this.forgetpassw;
  }
}
