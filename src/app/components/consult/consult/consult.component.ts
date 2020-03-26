import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsultService } from 'src/app/services/api/consult.service';
import { Consult } from 'src/app/models/consult';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-consult',
  templateUrl: './consult.component.html',
  styleUrls: ['./consult.component.scss']
})
export class ConsultComponent implements OnInit {

  public consultId: number
  public consult: Consult = new Consult

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private consultService: ConsultService,
    private sessionService: SessionService,
    private snack: MatSnackBar) {

      this.consultId = parseInt(this.route.snapshot.paramMap.get('id'))
     }

  ngOnInit() {
    setTimeout(()=>{this.sessionService.loading.next(true)},0)
    this.consultService.getConsult(this.consultId).subscribe(
      (rsp) => {
        this.consult = rsp
        this.sessionService.loading.next(false)
      }
    )
  }

  deleteConsult(id: number) {
    this.consultService.deleteConsult(id).subscribe(
      () => {
        this.snack.open("Consulta eliminada")._dismissAfter(2000)
        this.router.navigate(['/home/patient-list'])
      },
      (err) => {
        console.log(err)
      })
  }

}
