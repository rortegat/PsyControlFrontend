import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Patient } from 'src/app/models/patient';

@Component({
  selector: 'app-patient-edit',
  templateUrl: './patient-edit.component.html',
  styleUrls: ['./patient-edit.component.css']
})
export class PatientEditComponent implements OnInit {

  public editForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<PatientEditComponent>,
    public formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public patient: Patient
    ) {}
    
  ngOnInit() {

    this.editForm = this.formBuilder.group({
      id:[''],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      phone:[''],
      mobile:['']
    })

    this.editForm.patchValue(this.patient)

  }

  cancel(): void {
    this.dialogRef.close();
  }


}
