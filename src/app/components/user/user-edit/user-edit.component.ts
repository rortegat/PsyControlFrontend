import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/api/user.service';
import { Role } from 'src/app/models/role';
import { RoleService } from 'src/app/services/api/role.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  public editForm: FormGroup
  public rolesList: Role[] = []
  public roleSelect: Role[] = [
    {
      "id": 1,
      "rolename": "ADMIN"
    },
    {
      "id": 2,
      "rolename": "DEMO"
    }
  ]

  public testRoles: Role[] = [
    {
      "id": 2,
      "rolename": "DEMO"
    }
  ]


  constructor(
    private userService: UserService,
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
      roles: [{
        "id": 2,
        "rolename": "DEMO"
      }]
    })

    this.editForm.controls['roles'].patchValue(this.testRoles)

    // this.rolesService.getRoles().subscribe((rsp) =>{
    //   this.rolesList=rsp
    //   this.editForm.patchValue(this.user)
    // })

  }

  cancel(): void {
    this.dialogRef.close();
  }

}
