import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/models/user';
import { Role } from 'src/app/models/role';
import { RoleService } from 'src/app/services/api/role.service';
import { RepeatPasswordStateMatcher, PasswordValidation, EmailValidation, RepeatPasswordValidator } from 'src/app/helpers/validators';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  public userForm: FormGroup;
  public rolesList: Role[] = [];
  public userRoles: Role[] = [];

  public mismatch: boolean = false;
  public matcher = new RepeatPasswordStateMatcher();


  constructor(
    private rolesService: RoleService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) private user: User
  ) { }

  ngOnInit(): void {

    this.userForm = this.formBuilder.group({
      username: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', EmailValidation],
      roles: ['']
    });

    this.rolesService.getRoles().subscribe((rsp) => {
      this.rolesList = rsp;
      if (this.user != null) {
        this.rolesList.forEach((role, index) => {
          this.user.roles.forEach((roleUser) => {
            if (role.rolename === roleUser)
              this.userRoles.push(this.rolesList[index]);
          });
        });

        this.userForm.patchValue(this.user);
        this.userForm.controls['roles'].patchValue(this.userRoles);
      }
    });


  }

  cancel(): void {
    this.dialogRef.close();
  }

}