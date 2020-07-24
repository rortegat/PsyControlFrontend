import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Privilege } from 'src/app/models/privilege';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PrivilegeService } from 'src/app/services/api/privilege.service';
import { Role } from 'src/app/models/role';

@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.scss']
})
export class RoleFormComponent implements OnInit {

  public roleForm: FormGroup;

  public privilegesList: Privilege[] = [];
  public rolePrivileges: Privilege[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private privilegeService: PrivilegeService,
    public dialogRef: MatDialogRef<RoleFormComponent>,
    @Inject(MAT_DIALOG_DATA) private role: Role
  ) {
  }

  ngOnInit(): void {

    this.roleForm = this.formBuilder.group({
      id:[''],
      rolename: ['', Validators.required],
      privileges: ['']
    });

    this.privilegeService.getPrivileges().subscribe((rsp) => {
      this.privilegesList = rsp;

      if (this.role != null) {
        this.privilegesList.forEach((privilege, index) => {
          this.role.privileges.forEach((rolePrivilege) => {
            if (privilege.privilegename === rolePrivilege.privilegename)
              this.rolePrivileges.push(this.privilegesList[index])
          });
        });
        this.roleForm.controls['privileges'].patchValue(this.rolePrivileges);
      }

    });

    if (this.role != null)
      this.roleForm.patchValue(this.role);

  }

  cancel(): void {
    this.dialogRef.close();
  }

}
