import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { trigger, state, transition, animate, style } from '@angular/animations';
import { FileService } from 'src/app/services/api/file.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 100 })),
      transition('* => void', [
        animate(300, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class FileUploadComponent implements OnInit {

  public form: FormGroup

  constructor(private formBuilder: FormBuilder,
    private fileService: FileService) { }

  ngOnInit() {

    this.form = this.formBuilder.group({
      file: ['']
    })

  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0]
      this.form.get('file').setValue(file)
    }
  }

  onSubmit() {
    const formData = new FormData()
    formData.append('file', this.form.get('file').value)

    this.fileService.uploadSingleFile(formData).subscribe(
      (rsp) => console.log(rsp),
      (err) => console.log(err)
    )
  }

  download() {
    this.fileService.downloadSingleFile("android.png")
  }

}
