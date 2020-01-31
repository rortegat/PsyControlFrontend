import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsultService } from 'src/app/services/api/consult.service';
import { Consult } from 'src/app/models/consult';
import { PatientService } from 'src/app/services/api/patient.service';
import { Patient } from 'src/app/models/patient';
import { SessionService } from 'src/app/services/session.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  public patient: Patient = new Patient()
  public consults: Consult[] = []

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snack: MatSnackBar,
    private consultService: ConsultService,
    private patientService: PatientService,
    private sessionService: SessionService
  ) {
    this.sessionService.loading.next(true)
  }

  ngOnInit() {



    this.patientService.getPatient(parseInt(this.route.snapshot.paramMap.get('id'))).subscribe((rsp) => {
      this.patient = rsp
      this.consultService.getConsults(this.patient.id).subscribe(
        (rsp) => {
          this.consults = rsp
          this.sessionService.loading.next(false)
        }
      )
    })
  }

  newConsult() {
    this.router.navigate(['/home/consult-add', this.patient.id])
  }

  deletePatient() {
    this.patientService.deletePatient(this.patient.id).subscribe(
      () => {
        this.snack.open("Paciente Eliminado")._dismissAfter(2000)
        this.router.navigate(['/home/patient-list'])
      },
      (err) => {
        console.log(err)
      })
  }

  deleteConsult(id: number) {
    this.consultService.deleteConsult(id).subscribe(
      () => {
        this.snack.open("Consulta eliminada")._dismissAfter(2000)
        this.consultService.getConsults(this.patient.id).subscribe(
          (rsp) => {
            this.consults = rsp
          }
        )

      },
      (err) => {
        console.log(err)
      })
  }


}
