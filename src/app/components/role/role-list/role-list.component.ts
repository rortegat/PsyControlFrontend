import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/models/role';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { SessionService } from 'src/app/services/session.service';
import { RoleService } from 'src/app/services/api/role.service';
import { Router } from '@angular/router';
import { RoleAddComponent } from '../role-form/role-form.component';
import { ApplicationInfoComponent } from '../../modal/application-info/application-info.component';
import { ApplicationErrorComponent } from '../../modal/application-error/application-error.component';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss']
})
export class RoleListComponent implements OnInit {

  public displayedColumns: string[] = ['rolename', 'privileges', 'accion']
  public roles: MatTableDataSource<Role>

  constructor(
    private snack: MatSnackBar,
    public dialog: MatDialog,
    private session: SessionService,
    private role: RoleService
  ) {

  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    setTimeout(() => { this.session.loading.next(true) }, 0);
    this.role.getRoles().subscribe((rsp) => {
      this.roles = new MatTableDataSource(rsp);
      this.session.loading.next(false);
    });
  }

  addRole(): void {
    const dialogRef = this.dialog.open(RoleAddComponent, {});

    dialogRef.afterClosed().subscribe(rsp => {
      if (rsp != undefined) {
        this.role.createRole(rsp).subscribe(() => {
          this.loadData();
          this.snack.open("Rol agregado")._dismissAfter(2000);
        });
      }
    });
  }

  editRole(id: number): void {
    this.role.getRole(id).subscribe(rsp => {
      const dialogRef = this.dialog.open(RoleAddComponent, {
        data: rsp
      });

      dialogRef.afterClosed().subscribe(rsp => {
        if (rsp != undefined) {
          console.log(rsp)
          this.role.updateRole(rsp).subscribe(
            () => {
              this.loadData();
              this.snack.open("Rol modificado")._dismissAfter(2000)
            }
          )
        }
      })
    })
  }

  deleteRoleButton(role: Role): void {
    var info: any = {
      action: "Eliminar rol",
      message: "Está seguro de eliminar el rol " + role.rolename,
    }
    const dialogRef = this.dialog.open(ApplicationInfoComponent, {
      data: info
    });
    dialogRef.afterClosed().subscribe(rsp => {
      if (rsp == true)
        this.deleteRole(role);
    });
  }

  deleteRole(role: Role): void {
    this.role.deleteRole(role.id).subscribe(() => {
      this.loadData();
      this.snack.open("Rol eliminado")._dismissAfter(2000);
    },
      (error) => {
        console.log(error)
        this.dialog.open(ApplicationErrorComponent, {
          data: error
        });
      });
  }

}
