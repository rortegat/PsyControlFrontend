import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsultService } from 'src/app/services/api/consult.service';
import { Consult } from 'src/app/models/consult';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-consult-list',
  templateUrl: './consult-list.component.html',
  styleUrls: ['./consult-list.component.scss']
})
export class ConsultListComponent implements OnInit {

  @Input() id: number;

  public consults: Consult[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private consultService: ConsultService,
    private sessionService: SessionService,
    private snack: MatSnackBar) {

  }

  ngOnInit(): void {
    this.loadData(this.id);
  }

  ngOnChanges(changes) {
    if (changes['id']) {
      this.loadData(changes.id.currentValue);
    }
  }

  loadData(id: number): void {
    setTimeout(() => { this.sessionService.loading.next(true) }, 0);
    this.consultService.getConsults(id).subscribe((rsp) => {
      this.consults = rsp;
      this.sessionService.loading.next(false);
    });
  }

  deleteConsult(id: number): void {
    this.consultService.deleteConsult(id).subscribe(() => {
      this.snack.open("Consulta eliminada")._dismissAfter(2000);
      this.router.navigate(['/home/consult-list']);
    },
      (err) => {
        console.log(err);
      });
  }

}
