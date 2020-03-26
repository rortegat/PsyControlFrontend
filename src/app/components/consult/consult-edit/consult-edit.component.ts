import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { ConsultService } from 'src/app/services/api/consult.service'
import { MatSnackBar } from '@angular/material/snack-bar'
import { SessionService } from 'src/app/services/session.service'
import { AngularEditorConfig } from '@kolkov/angular-editor'

@Component({
  selector: 'app-consult-edit',
  templateUrl: './consult-edit.component.html',
  styleUrls: ['./consult-edit.component.scss']
})
export class ConsultEditComponent implements OnInit {

  public editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '30vh',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Escriba aquí...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['superscript', 'italic'],
      ['subscript']
    ]
}

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
    console.log(this.editForm.value)
    this.consultService.updateConsult(this.editForm.value).subscribe(
      ()=>{
        this.snack.open("Consulta modificada")._dismissAfter(2000)
        this.router.navigate(["home/consult",this.consultId])
      }
    )

  }

}
