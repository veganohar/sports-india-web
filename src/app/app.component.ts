import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material';
import { Router } from '@angular/router';
import { SidenavService } from './sidenav.service';
import { trigger, transition, animate, style } from "@angular/animations";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  innerwidth: any;
  onResize(event){
    this.innerwidth = event.target.innerwidth;  
  }
  title = 'Sports-india';
  screenWidth: any;
  showHeader: boolean = false;
  realm: string;
  sidenavElements: any = [];
  tabId = 0;
  isVisible: boolean = false;
  childVisible: boolean = false;
  childId: any;
  show: boolean = false;
  display: boolean = false;
  @ViewChild('drawer', { static: true }) public sidenav: MatDrawer;
  constructor(public sidenavservice: SidenavService, private router: Router) {
    this.sidenavservice.showSideNav.subscribe(val => {
      this.showHeader = val;
      if (val) {
        this.loadSideNavEle();
        this.sidenav.open();
      }
    });
  }

  ngOnInit(){
    if(localStorage.getItem('isLogin')=='true'){
      this.showHeader = true;
      this.loadSideNavEle();
      this.sidenav.open();
      this.tabId = localStorage.getItem('tabId')?parseInt(localStorage.getItem('tabId')):0;
    }else{
      this.sidenav.close();
      this.showHeader = false;
    }
    this.innerwidth = window.screen.width;
    console.log();
    if(this.innerwidth >= '768'){
      this.isVisible = false;
      this.sidenav.open();
    }else{
      this.isVisible = true;
      this.sidenav.close();
    }
    console.log(this.innerwidth);
  }


  loadSideNavEle() {
      this.sidenavElements = [
        { id: 1, name: 'Dashboard', routerLink: "/dashboard", src: "../assets/dashboard2.png"},
        { id: 2, name: 'Add Subtypes', routerLink: "/subtype", src: "../assets/orders2.png" },
        { id: 3, name: 'Change Password', routerLink: "/", src: "../assets/filters2.png" },
        { id: 4, name: 'Logout', routerLink: "/", src:"../assets/srvnitem2.png"}
      ];
  }
  onSubMenuClick(item,child,value){
    this.tabId = item.id;
    child ? this.childId = child.id : this.childId = null;
    child.routerLink = child ? child.routerLink : item.routerLink;
    this.router.navigate([child.routerLink])
    // if(item.childern || value == '1'){
    //   this.childVisible = true;
    // }
  }
  toggle(item){ 
     this.show = !this.show;
    if(this.show && item.childern && item.name != 'Logout'){
      console.log(this.show);
      this.childVisible = true;
    }else{
      this.show = false;
      this.childVisible = false;
    }
  }
  onSideNavClick(item,value?) {
    console.log(item);
    if(item.id == 3){
      this.display = true
    }
    if (item.name != 'Logout') {
      item.childern ? this.childVisible = true : this.childVisible = false;
      this.childId = null;
      this.router.navigate([item.routerLink]);
      this.tabId = item.id;
      localStorage.setItem('tabId', String(this.tabId));
    } else {
      this.onLogOut();
    }

  }


  onLogOut(){
    this.showHeader = false;
    this.tabId = 0;
    this.sidenav.close();
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
