import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { ConsultService } from 'src/app/services/api/consult.service'
import { MatSnackBar } from '@angular/material/snack-bar'
import { SessionService } from 'src/app/services/session.service'

@Component({
  selector: 'app-consult-edit',
  templateUrl: './consult-edit.component.html',
  styleUrls: ['./consult-edit.component.css']
})
export class ConsultEditComponent implements OnInit {

  public editForm: FormGroup
  public consultId: number


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snack: MatSnackBar,
    private formBuilder: FormBuilder,
    private consultService: ConsultService,
    private sessionService: SessionService
  ) {

    this.consultId = parseInt(this.route.snapshot.paramMap.get('id'))

   }

  ngOnInit(): void {

    setTimeout(()=>{this.sessionService.loading.next(true)},0)
    
    this.editForm = this.formBuilder.group({
      id:[''],
      reason: ['', Validators.required],
      description: ['', Validators.required]
    })


    this.consultService.getConsult(this.consultId).subscribe((rsp)=>{
      this.editForm.patchValue(rsp)
      this.sessionService.loading.next(false)
    })

  }

  onSubmit():void{

    //this.addForm.controls.patient.setValue(this.patient)

    if (this.editForm.invalid) {
      return
    }
    this.consultService.updateConsult(this.editForm.value).subscribe(
      (rsp)=>{
        this.snack.open("Consulta modificada")._dismissAfter(2000)
        this.router.navigate(["home/consult",this.consultId])
      }
    )

  }

}
