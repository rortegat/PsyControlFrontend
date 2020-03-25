import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsultService } from 'src/app/services/api/consult.service';
import { Consult } from 'src/app/models/consult';
import { PatientService } from 'src/app/services/api/patient.service';
import { Patient } from 'src/app/models/patient';
import { SessionService } from 'src/app/services/session.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ApplicationInfoComponent } from '../../modal/application-info/application-info.component';
import { ApplicationErrorComponent } from '../../modal/application-error/application-error.component';
import { ServerErrorComponent } from '../../modal/server-error/server-error.component';

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
    private dialog: MatDialog,
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

  deletePatientButton(){
    var info:any = {
      action: "Eliminar paciente",
      message: "Está seguro de eliminar al paciente "+this.patient.firstname,
    }
    const dialogRef = this.dialog.open(ApplicationInfoComponent, {
      data: info
    })
    dialogRef.afterClosed().subscribe(rsp => {
      if (rsp==true)
      this.deletePatient()
    })
  }

  deletePatient() {
    this.patientService.deletePatient(this.patient.id).subscribe(
      () => {
        this.snack.open("Paciente Eliminado")._dismissAfter(2000)
        this.router.navigate(['/home/patient-list'])
      },
      (error) => {
        console.log(error)
        this.dialog.open(ApplicationErrorComponent, {
          data: error
        })
      })
  }


}
