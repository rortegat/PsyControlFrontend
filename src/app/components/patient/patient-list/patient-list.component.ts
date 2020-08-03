import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Patient } from 'src/app/models/patient';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SessionService } from 'src/app/services/session.service';
import { PatientService } from 'src/app/services/api/patient.service';
import { PatientFormComponent } from '../patient-form/patient-form.component';
import { Router } from '@angular/router';
import { ApplicationInfoComponent } from '../../modal/application-info/application-info.component';
import { ApplicationErrorComponent } from '../../modal/application-error/application-error.component';
import { Page } from 'src/app/models/page';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent implements OnInit {

  public page: Page<Patient> = new Page();
  public pageSize: number = 10;
  public pageIndex: number = 0;
  public length: number = 0;

  public displayedColumns: string[] = ['id', 'firstname', 'lastname', 'email', 'phone', 'mobile', 'accion'];
  public patients: MatTableDataSource<Patient>;
  public filterValue: string = "";

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private snack: MatSnackBar,
    public dialog: MatDialog,
    private session: SessionService,
    private patient: PatientService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  getServerData(event: PageEvent): void {
    this.page.pageable.pageSize = event.pageSize;
    this.page.pageable.pageNumber = event.pageIndex;
    this.loadData();
  }

  loadData(): void {
    setTimeout(() => { this.session.loading.next(true) }, 0);
    this.patient.getPatients(this.page.pageable).subscribe((page) => {
      this.page = page;
      console.log(this.page.totalElements);
      this.length = this.page.totalElements;
      this.pageSize = this.page.size;
      this.pageIndex = this.page.number;
      this.patients = new MatTableDataSource(page.content);
      this.patients.paginator = this.paginator;
      this.session.loading.next(false);
    });
  }

  clear(): void {
    console.log("Por implementar")
    this.filterValue = "";
  }

  filterField(filterValue: string): void {
    console.log(filterValue.trim().toLowerCase());
  }

  addPatient(): void {
    const dialogRef = this.dialog.open(PatientFormComponent, {})

    dialogRef.afterClosed().subscribe(rsp => {
      if (rsp != undefined) {
        this.patient.createPatient(rsp).subscribe(() => {
          this.loadData();
          this.snack.open("Paciente Agregado")._dismissAfter(2000);
        });
      }
    });
  }

  editPatient(id: number): void {

    this.patient.getPatient(id).subscribe(rsp => {
      const dialogRef = this.dialog.open(PatientFormComponent, {
        data: rsp
      });

      dialogRef.afterClosed().subscribe(rsp => {
        if (rsp != undefined) {
          this.patient.updatePatient(rsp).subscribe(
            () => {
              this.loadData();
              this.snack.open("Paciente modificado")._dismissAfter(2000);
            });
        }
      });
    });
  }

  deletePatientButton(patient: Patient): void {
    var info: any = {
      action: "Eliminar paciente",
      message: "Está seguro de eliminar al paciente " + patient.firstname,
    };
    const dialogRef = this.dialog.open(ApplicationInfoComponent, {
      data: info
    });
    dialogRef.afterClosed().subscribe(rsp => {
      if (rsp == true)
        this.deletePatient(patient);
    });
  }

  deletePatient(patient: Patient): void {
    this.patient.deletePatient(patient.id).subscribe(
      () => {
        this.snack.open("Paciente Eliminado")._dismissAfter(2000);
        this.router.navigate(['/home/patient-list']);
      },
      (error) => {
        console.log(error);
        this.dialog.open(ApplicationErrorComponent, {
          data: error
        });
      });
  }

  onSelect(row: Patient): void {
    console.log(row);
    this.router.navigate(["home/patient", row.id]);
  }

}
