import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormControl, Validators, FormGroup } from '@angular/forms';
import { SportsIndiaService } from '../sportsindia.service';


@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {
  form: FormGroup;
  hqsdd: any = [];
  employmentTypes: any = [];
  employmentSubTypes: any = [];
  isValidPin: boolean = false;
  photoid_proof: File;
  addressid_proof: File;
  image: File;
  cv: File;
  constructor(
    private sis: SportsIndiaService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.hqsdd = ["Primary School", "SSC", "Intermediate", "Bachelor's degree", "Master's degree", "Doctorate or higher"];
    this.initiateForm();
    this.getAllEmploymentTypes();
  }
  getAllEmploymentTypes() {
    this.sis.getAllEmploymentTypes().subscribe(res => {
      let resp: any = res;
      this.employmentTypes = resp.data;
    })
  }
  initiateForm() {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      middleName: [''],
      fatherName: ['', Validators.required],
      motherName: ['', Validators.required],
      dob: ['', Validators.required],
      mobile: ['', Validators.required],
      email: ['', Validators.required],
      employmentsubtype: ['', Validators.required],
      highestQualification: ['', Validators.required],
      photoid_proof: ['', Validators.required],
      addressid_proof: ['', Validators.required],
      seeker: [false],
      provider: [false],
      address: this.fb.group({
        pin: ['', Validators.required],
        state: ['', Validators.required],
        district: ['', Validators.required],
        circle: ['', Validators.required],
        line1: ['', Validators.required],
        line2: ['', Validators.required],
        landMark: ['']
      }),
      qualifications: this.fb.array([this.newQualification()])
    });
  }

  qualifications(): FormArray {
    return this.form.get("qualifications") as FormArray
  }

  newQualification(): FormGroup {
    return this.fb.group({
      school: ['', Validators.required],
      degree: ['', Validators.required],
      field: ['', Validators.required],
      startYear: ['', Validators.required],
      endYear: ['', Validators.required]
    })
  }

  addQualification() {
    this.qualifications().push(this.newQualification());
  }

  removeQualification(i: number) {
    this.qualifications().removeAt(i);
  }

  onSubmit() {
    let formData = new FormData();
    formData.append("image", this.image);
    formData.append("photoid_proof", this.photoid_proof);
    formData.append("addressid_proof", this.addressid_proof);
    this.cv ? formData.append("cv", this.cv) : '';
    formData.append("fd", JSON.stringify(this.form.value));
    // console.log(this.form.value);
    // for(let p in this.form.value){
    //   let v = p=='address'||p=='qualifications'?JSON.stringify(this.form.value[p]):this.form.value[p];
    //   formData.append(p,v);
    // }
    this.sis.postApplication(formData).subscribe(res => {
      console.log(res);
    })
  }
  onEmpType(e) {
    this.getEmpSubTypebyEmpTypeId(e.target.value);
  }

  getEmpSubTypebyEmpTypeId(etid) {
    this.sis.getEmpSubTypesByEmpTypeId(etid).subscribe(res => {
      let resp: any = res;
      this.employmentSubTypes = resp.data;
    })
  }

  onPin(e) {
    if (e.target.value.length != 6) {
      return;
    }
    this.sis.getAddressByPin(e.target.value).subscribe(res => {
      let resp: any = res;
      if (resp.Status == "Success") {
        this.patchAddr(resp.PostOffice[0]);
      } else {
        this.isValidPin = false;
      }
    })
  }

  patchAddr(data) {
    this.form.patchValue({
      address: {
        state: data.State,
        district: data.District,
        circle: data.Circle
      }
    })
    this.isValidPin = true;
  }


  onFileUpload(files: FileList, name) {
    let file = files[0];
    name == "photoid_proof" ? this.photoid_proof = file : name == "addressid_proof" ? this.addressid_proof = file : name == "image" ? this.image = file : this.cv = file;
  }
}

