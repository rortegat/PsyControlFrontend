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
  styleUrls: ['./consult-add.component.scss']
})
export class ConsultAddComponent implements OnInit {

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
      ['superscript', 'italic'],
      ['subscript']
    ]
  };

  public patientId: number;
  public addForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private consult: ConsultService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.patientId = parseInt(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      reason: ['', Validators.required],
      description: ['', Validators.required],
      patientId: ['']
    });
    this.addForm.controls['patientId'].setValue(this.patientId);
  }

  onSubmit(): void {
    //this.addForm.controls.patient.setValue(this.patient)
    if (this.addForm.invalid) {
      return;
    }
    this.consult.createConsult(this.addForm.value).subscribe((rsp) => {
      this.router.navigate(["home/patient", this.patientId]);
    });
  }

}
