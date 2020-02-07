import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/api/user.service';
import { SessionService } from 'src/app/services/session.service';
import { UserAddComponent } from '../user-add/user-add.component';
import { UserEditComponent } from '../user-edit/user-edit.component';

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
    let user: User  =  new User()

    const dialogRef = this.dialog.open(UserAddComponent, {
      width: '650px',
      //data: user
    });

    dialogRef.afterClosed().subscribe(rsp => {
      console.log(rsp)
      if(rsp!=undefined){
      user.username = rsp.username
      user.firstname = rsp.firstname
      user.lastname = rsp.lastname
      user.password = rsp.password
      user.email = rsp.email
      console.log(user)
      
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

  deleteUser(username:string){
    this.userService.deleteUser(username).subscribe(()=>{
      this.userService.getUsers().subscribe((rsp)=>this.users.data=rsp)
    },
    (error)=>console.log(error))
  }




}
