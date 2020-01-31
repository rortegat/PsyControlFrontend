import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  public uploadForm: FormGroup

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.uploadForm = this.formBuilder.group({
      file: ['']
    })
  
  }

  onSubmit(){
    console.log(this.uploadForm.value)
  }

}
