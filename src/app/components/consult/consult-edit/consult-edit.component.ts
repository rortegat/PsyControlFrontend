import { Component, OnInit, Input } from '@angular/core'
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

  @Input() id: number;

  public editorConfig: AngularEditorConfig = {
    editable: false,
    spellcheck: true,
    height: 'auto',
    minHeight: 'auto',
    maxHeight: '400px',
    width: 'auto',
    minWidth: '300px',
    translate: 'no',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Escriba aquí...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
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
    uploadUrl: '/api/files/upload',
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['superscript','italic'],
      ['subscript']
    ]
  };

  public editForm: FormGroup;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snack: MatSnackBar,
    private formBuilder: FormBuilder,
    private consultService: ConsultService,
    private sessionService: SessionService) {
      
    }

  ngOnInit(): void {
    setTimeout(() => { this.sessionService.loading.next(true) }, 0);
    this.editForm = this.formBuilder.group({
      id: [''],
      reason: ['', Validators.required],
      description: ['', Validators.required]
    });

    this.consultService.getConsult(this.id).subscribe((rsp) => {
      this.editForm.patchValue(rsp);
      this.sessionService.loading.next(false);
    });
  }

  onSubmit(): void {
    if (this.editForm.invalid) {
      return
    }
    console.log(this.editForm.value)
    this.consultService.updateConsult(this.editForm.value).subscribe(() => {
      this.snack.open("Consulta modificada")._dismissAfter(2000);
      this.router.navigate(["home/patient-list"]);
    });

  }

}
