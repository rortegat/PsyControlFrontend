import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { PasswordValidation, EmailValidation, RepeatPasswordValidator, RepeatPasswordStateMatcher } from 'src/app/helpers/validators';
import { MatDialogRef } from '@angular/material/dialog';
import { Role } from 'src/app/models/role';
import { RoleService } from 'src/app/services/api/role.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {

  public addForm: FormGroup
  public mismatch: boolean = false
  public matcher = new RepeatPasswordStateMatcher()

  public rolesList: string[] = []

  constructor(
    private formBuilder: FormBuilder,
    private rolesService: RoleService,
    public dialogRef: MatDialogRef<UserAddComponent>
    ) {
  }

  ngOnInit() {

    this.rolesService.getRoles().subscribe((rsp)=>this.rolesList = rsp.map(role=>role.rolename));
    
    this.addForm = this.formBuilder.group({
      username: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      password: ['', PasswordValidation],
      confirmation: ['',Validators.required],
      email: ['', EmailValidation],
      roles:['']
    },
    { 
      validator: RepeatPasswordValidator 
    })

  }

  cancel(): void {
    this.dialogRef.close();
  }

}
