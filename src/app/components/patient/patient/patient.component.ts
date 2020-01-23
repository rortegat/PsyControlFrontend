import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsultService } from 'src/app/services/api/consult.service';
import { Consult } from 'src/app/models/consult';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ConsultAddComponent } from '../../consult/consult-add/consult-add.component';
import { PatientService } from 'src/app/services/api/patient.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  public id: number=null
  public consults: Consult[] = []

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private consultService: ConsultService,
    private patientService: PatientService
  ) { }

  ngOnInit() {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'))
    this.consultService.getConsults(this.id).subscribe(
      (rsp) => {
        this.consults = rsp
      }
    )
  }

  newConsult(){
    this.router.navigate(['/home/consult-add',this.id])
  }

  deletePatient(){
    this.patientService.deletePatient(this.id).subscribe(()=>{console.log("Done!")})
  }

  deleteConsult(id:number){
    this.consultService.deleteConsult(id).subscribe(()=>{
      this.consultService.getConsults(this.id).subscribe((rsp)=>{
        this.consults=rsp
      })
    })
  }



}
