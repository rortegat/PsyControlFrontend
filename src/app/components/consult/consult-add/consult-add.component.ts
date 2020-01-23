import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConsultService } from 'src/app/services/api/consult.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Patient } from 'src/app/models/patient';
import { PatientService } from 'src/app/services/api/patient.service';

@Component({
  selector: 'app-consult-add',
  templateUrl: './consult-add.component.html',
  styleUrls: ['./consult-add.component.css']
})
export class ConsultAddComponent implements OnInit {

  public patient:Patient=null

  public addForm: FormGroup
  public mismatch: boolean = false

  constructor(
    private formBuilder: FormBuilder,
    private consult: ConsultService,
    private router: Router,
    private route: ActivatedRoute,
    private patientService: PatientService
    ) {
      
  }

  ngOnInit() {
    console.log(this.route.snapshot.paramMap.get('id'))
    this.patientService.getPatient(parseInt(this.route.snapshot.paramMap.get('id'))).subscribe((rsp)=>{
      console.log(rsp)
      this.patient=rsp
    }) 
    
    this.addForm = this.formBuilder.group({
      reason: ['', Validators.required],
      description: ['', Validators.required],
      patient: ['']
    })


    this.addForm.controls.patient.setValue(this.patient)
  }

  onSubmit(){

    if (this.addForm.invalid) {
      return
    }
    this.consult.createConsult(this.addForm.value).subscribe(
      (rsp)=>{
        this.router.navigate(["home/patient",this.patient.id])
      }
    )

  }

}
