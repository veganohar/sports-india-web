import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-subtypes',
  templateUrl: './subtypes.component.html',
  styleUrls: ['./subtypes.component.css']
})
export class SubtypesComponent implements OnInit {
  display: boolean = false;
  constructor() { }

  ngOnInit() {
  }
  addsubtype(){
    this.display = true;
  }
}
