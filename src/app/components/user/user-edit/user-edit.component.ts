import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/api/user.service';
import { Role } from 'src/app/models/role';
import { RoleService } from 'src/app/services/api/role.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  public editForm: FormGroup
  public rolesList: Role[] = []
  public userRoles: Role[] = []


  constructor(
    private rolesService: RoleService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<UserEditComponent>,
    @Inject(MAT_DIALOG_DATA) public user: User
  ) { }

  ngOnInit() {

    this.editForm = this.formBuilder.group({
      username: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      roles: ['']
    })

    this.editForm.patchValue(this.user)

    this.rolesService.getRoles().subscribe((rsp) =>{
      this.rolesList=rsp

      this.rolesList.forEach((role, index)=>{
        this.user.roles.forEach((roleUser)=>{
          if (role.rolename===roleUser.rolename)
          this.userRoles.push(this.rolesList[index])
        })
      })

      this.editForm.controls['roles'].patchValue(this.userRoles)

    })

  }

  cancel(): void {
    this.dialogRef.close();
  }

}
