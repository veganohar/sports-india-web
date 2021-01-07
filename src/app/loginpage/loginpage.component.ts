import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SidenavService } from '../sidenav.service';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent implements OnInit {
loginForm:FormGroup;
  loginform : boolean = true;
  forgetpassw : boolean = false;
  constructor(public sidenavservice: SidenavService, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    if(localStorage.getItem('isLogin')=='true'){
      this.router.navigate(['/dashboard'])
    }
    this.initiateForm();
  }

initiateForm(){
this.loginForm = this.fb.group({
  username:['',Validators.required],
  password:['',Validators.required]
});
}


login(fd){
  if (fd.username == 'sports' && fd.password == 'sports'){
  localStorage.setItem('isLogin','true');
  this.sidenavservice.emitShowSideNav(true);
  this.router.navigate(['/dashboard']);
}else{
  alert('Please Enter Valid User Name and password ');
  return;
}
}
  forgetpassword(){
    this.loginform = !this.loginform;
    this.forgetpassw = !this.forgetpassw;
  }
}
