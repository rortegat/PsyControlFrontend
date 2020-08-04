import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Patient } from 'src/app/models/patient';

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.scss']
})
export class PatientFormComponent implements OnInit {

  public patientForm: FormGroup;
  public title: string = "Nuevo paciente";

  constructor(
    public dialogRef: MatDialogRef<PatientFormComponent>,
    public formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private patient: Patient
  ) { }

  ngOnInit(): void {

    this.patientForm = this.formBuilder.group({
      id: [''],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      phone: [''],
      mobile: ['']
    })

    if (this.patient != null) {
      this.title = "Modificar paciente";
      this.patientForm.patchValue(this.patient);
    }

  }

  cancel(): void {
    this.dialogRef.close();
  }

}
