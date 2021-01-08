import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SportsIndiaService } from '../sportsindia.service';

@Component({
  selector: 'app-view-application',
  templateUrl: './view-application.component.html',
  styleUrls: ['./view-application.component.css']
})
export class ViewApplicationComponent implements OnInit {
application:any;
  constructor(
    private sis:SportsIndiaService,
    private route:ActivatedRoute
  ) { }

  ngOnInit() {
    let p:any = this.route.params;
    this.getAppById(p.value.aid);
  }

getAppById(aid){
  this.sis.getApplicationById(aid).subscribe(res=>{
    console.log(res);
    let resp:any = res;
    this.application = resp.data;
  },(err)=>{
    console.log(err);
  });
}

}
