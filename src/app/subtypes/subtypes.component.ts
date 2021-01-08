import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SportsIndiaService } from '../sportsindia.service';

@Component({
  selector: 'app-subtypes',
  templateUrl: './subtypes.component.html',
  styleUrls: ['./subtypes.component.css']
})
export class SubtypesComponent implements OnInit {
  display: boolean = false;
  subTypesForm: FormGroup;
  empTypes: any = [];
  empSubTypes:any=[];
  isEdit: boolean = false;
  cols:any=[];
  
  constructor(
    private sis: SportsIndiaService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.cols=[
      { field: 'name', header: 'Name' },
      { field: 'employmenttype', header: 'Employment Type' },
      { field: 'isActive', header: 'Active' },
    ]
    this.getAllEmployementSubTypes();
    this.getAllEmployementTypes();
  }

  initiateForm(data?) {
    this.subTypesForm = this.fb.group({
      name: [data ? data.name : '', Validators.required],
      employmenttype: [data ? data.employmenttype._id : '', Validators.required],
      id:[data?data._id:null]
    });
  }

  getAllEmployementTypes() {
    this.sis.getAllEmploymentTypes().subscribe(res => {
      let resp: any = res;
      this.empTypes = resp.data;
    }, (err) => {
      console.log(err);
    })
  }

  getAllEmployementSubTypes() {
    this.sis.getAllEmpSubTypes().subscribe(res => {
      console.log(res);
      let resp: any = res;
      this.empSubTypes = resp.data;
    }, (err) => {
      console.log(err);
    })
  }

  addsubtype() {
    this.initiateForm();
    this.display = true;
    this.isEdit=false;
  }

  onSubmit(fd) {
    if(this.subTypesForm.invalid){
      alert("Fill all the fileds");
      return;
    }
    this.isEdit?this.update(fd):this.create(fd);
  }

  create(fd){
    delete fd.id;
    this.sis.createEmpSubType(fd).subscribe(res=>{
      console.log(res);
      this.display = false;
      this.getAllEmployementSubTypes();
    },(err)=>{
      alert(err);
    });
  }

  update(fd){
    this.sis.updateEmpSubType(fd).subscribe(res=>{
      console.log(res);
      this.display = false;
      this.isEdit = false;
      this.getAllEmployementSubTypes();
    },(err)=>{
      alert(err);
    });
  }

  onEdit(data){
    this.initiateForm(data);
    this.isEdit=true;
    this.display = true;
  }
  onActiveToggle(e,id){
   let fd = {
     id:id,
     isActive:e
   }
   this.sis.updateEmpSubType(fd).subscribe(res=>{
     this.getAllEmployementSubTypes();
   },(err)=>{
     console.log(err);
     this.getAllEmployementSubTypes();
   })
  }

}
