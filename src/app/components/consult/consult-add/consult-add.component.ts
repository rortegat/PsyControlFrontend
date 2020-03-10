import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConsultService } from 'src/app/services/api/consult.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Patient } from 'src/app/models/patient';
import { PatientService } from 'src/app/services/api/patient.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-consult-add',
  templateUrl: './consult-add.component.html',
  styleUrls: ['./consult-add.component.css']
})
export class ConsultAddComponent implements OnInit {

  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '0',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
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
      ['bold', 'italic'],
      ['fontSize']
    ]
};

  public patientId:number

  public addForm: FormGroup
  public mismatch: boolean = false

  constructor(
    private formBuilder: FormBuilder,
    private consult: ConsultService,
    private router: Router,
    private route: ActivatedRoute,
    private patientService: PatientService
    ) {
      
  }

  ngOnInit() {

    this.patientId= parseInt(this.route.snapshot.paramMap.get('id'))

    this.addForm = this.formBuilder.group({
      reason: ['', Validators.required],
      description: ['', Validators.required]
    })


    
  }

  onSubmit(){

    //this.addForm.controls.patient.setValue(this.patient)

    if (this.addForm.invalid) {
      return
    }
    this.consult.createConsult(this.patientId, this.addForm.value).subscribe(
      (rsp)=>{
        this.router.navigate(["home/patient",this.patientId])
      }
    )

  }

}
