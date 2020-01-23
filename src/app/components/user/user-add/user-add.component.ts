import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { PasswordValidation, EmailValidation, RepeatPasswordValidator, RepeatPasswordStateMatcher } from 'src/app/helpers/validators';
import { MatDialogRef } from '@angular/material';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  public addForm: FormGroup
  public mismatch: boolean = false
  public matcher = new RepeatPasswordStateMatcher()

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<UserAddComponent>
    ) {
  }

  ngOnInit() {
    
    this.addForm = this.formBuilder.group({
      username: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      password: ['', PasswordValidation],
      confirmation: ['',Validators.required],
      email: ['', EmailValidation],
    },
    { 
      validator: RepeatPasswordValidator 
    })

  }

  cancel(): void {
    this.dialogRef.close();
  }

}
