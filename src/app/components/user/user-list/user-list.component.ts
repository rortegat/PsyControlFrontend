import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/api/user.service';
import { SessionService } from 'src/app/services/session.service';
import { UserAddComponent } from '../user-add/user-add.component';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { ApplicationInfoComponent } from '../../modal/application-info/application-info.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  public  displayedColumns: string[] = ['username', 'firstname','lastname','email', 'acciones'];
  public users : MatTableDataSource<User>; 

  public value;
  public masterSelect: boolean;

  constructor(
    private snack: MatSnackBar,
    public dialog: MatDialog,
    private userService: UserService,
    private sessionService: SessionService
    ) {
      this.sessionService.loading.next(true);
  }

  ngOnInit() {
    
    this.userService.getUsers().subscribe(data =>{ 
      console.log(data)
      this.users = new MatTableDataSource(data);
      this.sessionService.loading.next(false);
    } );
  }

  clear(){
    this.value="";
    this.users.filter="";
  }

  filterField(filterValue: string) {
    this.users.filter = filterValue.trim().toLowerCase();
  }

  addUser(){
    
    const dialogRef = this.dialog.open(UserAddComponent, {
      //width: '650px'
    });

    dialogRef.afterClosed().subscribe(rsp => {
      
      if(rsp!=undefined){
      let user: User = new User()
      user.username = rsp.username
      user.firstname = rsp.firstname
      user.lastname = rsp.lastname
      user.password = rsp.password
      user.email = rsp.email
      user.roles = rsp.roles
      
        this.userService.createUser(user).subscribe(
          ()=>{
            this.userService.getUsers().subscribe(rsp=>this.users.data=rsp)
            this.snack.open("User agregado")._dismissAfter(2000)
          },
          (error)=>{
            console.log(error)
            console.log(error.error.message)
          }
        );
      
      }
    });
  }

  editUser(username:string){

    let user: User  =  new User()

    this.userService.getUser(username).subscribe(rsp=>{
      console.log(rsp);
      user=rsp;

      const dialogRef = this.dialog.open(UserEditComponent, {
        width: '650px',
        data: user
      })
  
      dialogRef.afterClosed().subscribe(rsp => {
        console.log(rsp)
        if(rsp!=undefined){
          this.userService.updateUser(rsp).subscribe(
            ()=>{
              this.userService.getUsers().subscribe(rsp=>this.users.data=rsp)
              this.snack.open("User modificado")._dismissAfter(2000)
            }
          )
        }
      })

      
    })
  }

  deleteUserButton(username:string){
    var info:any = {
      action: "Eliminar usuario",
      message: "Está seguro de eliminar al usuario "+username,
    }
    const dialogRef = this.dialog.open(ApplicationInfoComponent, {
      data: info
    })
    dialogRef.afterClosed().subscribe(rsp => {
      if (rsp==true)
      this.deleteUser(username)
    })
  }

  deleteUser(username:string){
    this.userService.deleteUser(username).subscribe(()=>{
      this.userService.getUsers().subscribe((rsp)=>this.users.data=rsp)
    },
    (error)=>console.log(error))
  }




}
