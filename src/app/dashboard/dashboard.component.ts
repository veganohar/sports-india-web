import { Component, OnInit } from '@angular/core';
import { SportsIndiaService } from '../sportsindia.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  applications: any = [];
  limit = 25;
  skip = 0;
  totalApps = 0;
  cols:any=[];
  constructor(
    private router: Router,
    private sis: SportsIndiaService
  ) { }

  ngOnInit() {
    this.cols=[
      {field:'applicantId',header:'Application ID'},
      {field:'firstName',header:'First Name'},
      {field:'lastName',header:'Last Name'},
      {field:'mobile',header:'Mobile'},
      // {field:'email',header:'E-mail'},
      {field:'isVerified',header:'Verified'},
    ]
    this.getAppsCount();
    this.getApplications();
  }

  getAppsCount() {
    this.sis.getApplicationsCount().subscribe(res => {
      let resp: any = res;
      this.totalApps = resp.count;
            // this.totalApps = 1200;
    },(err)=>{
      console.log(err);
    });
  }
  getApplications() {
    this.sis.getApplications(this.skip,this.limit).subscribe(res => {
      let resp: any = res;
      this.applications = resp.data;
    },(err)=>{
      console.log(err);
    });
  }
  onActiveToggle(e,id){
    let fd = {
      isActive:e,
      id:id
    };
    this.sis.updateApplication(fd).subscribe(res=>{
      this.getApplications();
    },(err)=>{
      this.getApplications();
      console.log(err);
    });
  }

  verifyApplication(id){
    let fd = {
      isVerified:true,
      id:id
    };
    this.sis.updateApplication(fd).subscribe(res=>{
      this.getApplications();
      alert("Application Verified");
    },(err)=>{
      this.getApplications();
      console.log(err);
    });
  }


  paginate(e){
    this.limit=e.rows;
    this.skip=e.first;
    this.getApplications();
  }

  onView(aid){
    this.router.navigate(['/view',aid]);
  }

}
