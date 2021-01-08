import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material';
import { Router } from '@angular/router';
import { SidenavService } from './sidenav.service';
import { CookiesService } from './cookie.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SportsIndiaService } from './sportsindia.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {
  innerwidth: any;
  onResize(event) {
    this.innerwidth = event.target.innerwidth;
  }
  title = 'Sports-india';
  screenWidth: any;
  showHeader: boolean = false;
  realm: string;
  sidenavElements: any = [];
  tabId = 0;
  isVisible: boolean = false;
  show: boolean = false;
  display: boolean = false;
  changePwForm: FormGroup;
  @ViewChild('drawer', { static: true }) public sidenav: MatDrawer;
  constructor(public sidenavservice: SidenavService,
    private router: Router,
    private cs: CookiesService,
    private fb: FormBuilder,
    private sis:SportsIndiaService
  ) {
    this.sidenavservice.showSideNav.subscribe(val => {
      this.showHeader = val;
      if (val) {
        this.loadSideNavEle();
        this.sidenav.open();
      }
    });
    this.sis.showErrorInterceptor.subscribe(val=>{
      if(val){
        this.onLogOut();
      }
    })
  }

  ngOnInit() {
    if (this.cs.checkCookie('accessToken')) {
      this.showHeader = true;
      this.loadSideNavEle();
      this.sidenav.open();
      this.tabId = this.cs.getCookie("tabId") ? parseInt(this.cs.getCookie("tabId")) : 0;
    } else {
      this.sidenav.close();
      this.showHeader = false;
    }
    this.innerwidth = window.screen.width;
    if (this.innerwidth >= '768') {
      this.isVisible = false;
      // this.sidenav.open();
    } else {
      this.isVisible = true;
      this.sidenav.close();
    }
    console.log(this.innerwidth);
    
  }

  initiateChangePwForm() {
    this.changePwForm = this.fb.group({
      oldPassword:['',Validators.required],
      newPassword:['',Validators.required],
      confirmPassword:['',Validators.required]
    })
  }

  loadSideNavEle() {
    this.sidenavElements = [
      { id: 0, name: 'Dashboard', routerLink: "/dashboard", src: "../assets/dashboard2.png" },
      { id: 1, name: 'Add Subtypes', routerLink: "/subtype", src: "../assets/orders2.png" },
      { id: 2, name: 'Change Password', routerLink: "/", src: "../assets/filters2.png" },
      { id: 3, name: 'Logout', routerLink: "/", src: "../assets/srvnitem2.png" }
    ];
  }
 
  toggle(item) {
    this.show = !this.show;
    if (this.show  && item.name != 'Logout') {
    } else {
      this.show = false;
    }
  }
  onSideNavClick(item, value?) {
    if(item.id==0 || item.id==1){
      this.router.navigate([item.routerLink]);
      this.tabId = item.id;
      this.cs.setCookie("tabId", this.tabId, parseInt(this.cs.getCookie('exp')));
    }else if(item.id == 2){
      this.initiateChangePwForm();
      this.display = true;
    }
    else {
      this.onLogOut();
    }

  }


  onLogOut() {
    this.showHeader = false;
    this.tabId = 0;
    this.sidenav.close();
    this.router.navigate(['/login']);
    this.cs.deleteAllCookies();

  }

  onChangePw() {
    if(this.changePwForm.invalid){
      alert("Fill all the fields");
      return;
    }
    let fd = this.changePwForm.value;
    if(fd.newPassword!=fd.confirmPassword){
      alert("New Password and Confirm Passwords should be matched");
      return;
    }
    this.sis.changePW(fd).subscribe(res=>{
      alert(res);
      this.display =false;
    },(err)=>{
      alert(err);
    })
  }

}
