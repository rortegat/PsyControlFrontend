import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/api/user.service';
import { SessionService } from 'src/app/services/session.service';
import { UserFormComponent } from '../user-edit/user-form.component';
import { ApplicationInfoComponent } from '../../modal/application-info/application-info.component';
import { ApplicationErrorComponent } from '../../modal/application-error/application-error.component';
import { UserAddComponent } from '../user-add/user-add.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  public displayedColumns: string[] = ['username', 'firstname', 'lastname', 'email', 'acciones'];
  public users: MatTableDataSource<User>;

  public value;
  public masterSelect: boolean;

  constructor(
    private snack: MatSnackBar,
    public dialog: MatDialog,
    private userService: UserService,
    private sessionService: SessionService
  ) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    setTimeout(() => this.sessionService.loading.next(true), 0);
    this.userService.getUsers().subscribe(data => {
      this.users = new MatTableDataSource(data);
      this.sessionService.loading.next(false);
    });
  }

  clear(): void {
    this.value = "";
    this.users.filter = "";
  }

  filterField(filterValue: string): void {
    this.users.filter = filterValue.trim().toLowerCase();
  }

  addUser(): void {
    const dialogRef = this.dialog.open(UserAddComponent, {
      width: '650px'
    });

    dialogRef.afterClosed().subscribe(rsp => {
      if (rsp != undefined) {
        let user: User = new User();
        user.username = rsp.username;
        user.firstname = rsp.firstname;
        user.lastname = rsp.lastname;
        user.password = rsp.password;
        user.email = rsp.email;
        user.roles = rsp.roles;
        this.userService.createUser(user).subscribe(() => {
          this.loadData();
          this.snack.open("Usuario agregado")._dismissAfter(2000);
        },
          (error) => {
            console.log(error);
            this.dialog.open(ApplicationErrorComponent, {
              data: error
            });
          });
      }
    });
  }

  editUser(username: string): void {
    this.userService.getUser(username).subscribe(rsp => {
      const dialogRef = this.dialog.open(UserFormComponent, {
        width: '650px',
        data: rsp
      });
      dialogRef.afterClosed().subscribe(rsp => {
        if (rsp != undefined) {
          let user: User = new User();
          user.username = rsp.username;
          user.firstname = rsp.firstname;
          user.lastname = rsp.lastname;
          user.password = rsp.password;
          user.email = rsp.email;
          user.roles = rsp.roles;
          user = rsp;
          this.userService.updateUser(user).subscribe(() => {
            this.loadData();
            this.snack.open("User modificado")._dismissAfter(2000)
          });
        }
      });
    });
  }

  deleteUserButton(username: string): void {
    var info: any = {
      action: "Eliminar usuario",
      message: "Está seguro de eliminar al usuario " + username,
    };
    const dialogRef = this.dialog.open(ApplicationInfoComponent, {
      data: info
    });
    dialogRef.afterClosed().subscribe(rsp => {
      if (rsp == true)
        this.deleteUser(username);
    });
  }

  deleteUser(username: string): void {
    this.userService.deleteUser(username).subscribe(() => {
      this.loadData();
    },
      (error) => {
        console.log(error)
        this.dialog.open(ApplicationErrorComponent, {
          data: error
        });
      });
  }

}
