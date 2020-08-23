import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsultService } from 'src/app/services/api/consult.service';
import { Consult } from 'src/app/models/consult';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SessionService } from 'src/app/services/session.service';
import { MatDialog } from '@angular/material/dialog';
import { ApplicationInfoComponent } from '../../modal/application-info/application-info.component';

@Component({
  selector: 'app-consult-list',
  templateUrl: './consult-list.component.html',
  styleUrls: ['./consult-list.component.scss']
})
export class ConsultListComponent implements OnInit {

  @Input() id: number;

  public consults: Consult[] = [];

  constructor(
    private router: Router,
    private consultService: ConsultService,
    private sessionService: SessionService,
    private dialog: MatDialog,
    private snack: MatSnackBar) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnChanges(changes) {
    if (changes['id']) {
      this.loadData();
    }
  }

  loadData(): void {
    this.sessionService.loading.next(true);
    setTimeout(() => { this.sessionService.loading.next(true) }, 0);
    this.consultService.getConsults(this.id).subscribe((rsp) => {
      this.consults = rsp;
      this.sessionService.loading.next(false);
    });
  }

  deleteConsultButton(id: number): void {
    var info: any = {
      action: "Eliminar consulta",
      message: "Está seguro de eliminar esta consulta?",
    };
    const dialogRef = this.dialog.open(ApplicationInfoComponent, {
      data: info
    });
    dialogRef.afterClosed().subscribe(rsp => {
      if (rsp == true)
        this.deleteConsult(id);
    });
  }

  deleteConsult(id: number): void {
    this.sessionService.loading.next(true);
    this.consultService.deleteConsult(id).subscribe(() => {
      this.snack.open("Consulta eliminada")._dismissAfter(2000);
      this.loadData();
    },
      (err) => {
        console.log(err);
        this.sessionService.loading.next(false);
      });
  }

}
