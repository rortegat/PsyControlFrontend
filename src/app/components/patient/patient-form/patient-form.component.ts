import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Patient } from 'src/app/models/patient';
import { User } from 'src/app/models/user';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.scss']
})
export class PatientFormComponent implements OnInit {

  public patientForm: FormGroup;
  public title: string = "Nuevo paciente";
  public currentUser: User;

  constructor(
    private dialogRef: MatDialogRef<PatientFormComponent>,
    private formBuilder: FormBuilder,
    private sessionService: SessionService,
    @Inject(MAT_DIALOG_DATA) private patient: Patient ) {
    this.currentUser = this.sessionService.getUserData();
   }

  ngOnInit(): void {

    this.patientForm = this.formBuilder.group({
      id: [''],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      phone: [''],
      mobile: [''],
      username:['']
    });

    this.patientForm.controls['username'].setValue(this.currentUser.username);

    if (this.patient != null) {
      this.title = "Modificar paciente";
      this.patientForm.patchValue(this.patient);
    }

  }

  cancel(): void {
    this.dialogRef.close();
  }

}
