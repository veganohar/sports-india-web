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
  forgetpassw: boolean = false;
  resetPwForm:FormGroup;
  constructor(public sidenavservice: SidenavService,
    private fb: FormBuilder,
    private router: Router,
    private sis: SportsIndiaService,
    private cs: CookiesService,
    public sidenavService: SidenavService
  ) { }

  ngOnInit() {
    if (this.cs.checkCookie("accessToken")) {
      this.router.navigate(['/dashboard']);
    }
    this.initiateLoginForm();
    this.initiatePWResetForm();
  }

  initiateLoginForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

initiatePWResetForm(){
  this.resetPwForm = this.fb.group({
    email:['',Validators.required]
  })
}


  login(fd) {
    this.sis.singin(fd).subscribe(res => {
      let resp: any = res;
      this.cs.setCookie('accessToken', resp.accessToken, resp.exp);
      this.cs.setCookie("exp", resp.exp, resp.exp);
      this.sidenavservice.emitShowSideNav(true);
      this.router.navigate(['/dashboard']);
    }, (err) => {
      alert(err);
    });
  }
  forgetpassword() {
    this.forgetpassw = !this.forgetpassw;
    this.initiateLoginForm();
    this.initiatePWResetForm();
  }
  onResetPW(fd){
    this.sis.resetPW(fd).subscribe(res=>{
      console.log(res);
      let resp:any = res;
      this.forgetpassword();
      alert(resp.message);
    },(err)=>{
      console.log(err);
      alert(err);
    })
  }
}
