import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FileService } from 'src/app/services/api/file.service';
import { FileSystemDirectoryEntry, NgxFileDropEntry, FileSystemFileEntry } from 'ngx-file-drop';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  public form: FormGroup;
  public ngxFiles: NgxFileDropEntry[] = [];
  public files: File[] = [];
  public progress: number[] = [];

  constructor(private formBuilder: FormBuilder,
    private fileService: FileService) { }

  ngOnInit(): void {

    // this.form = this.formBuilder.group({
    //   file: ['']
    // })

  }

  uploadImages(): void {
    this.files.forEach((file, index) => {
      this.fileService.uploadSingleFile(file).subscribe(
        (rsp) => {
          if (rsp.message != undefined)
            this.progress[index] = rsp.message;
            console.log(this.progress[index])
            //this.progress.splice(index);
        },
        (err) => console.log(err)
      );
    });
  }

dropped(files: NgxFileDropEntry[]): void {
    this.ngxFiles = files;
    for (const droppedFile of files) {
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          if (file.size < (5 * 1024 * 1024)) {
            this.files.push(file);
            this.progress.push(0);
          }
          // Here you can access the real file
          //console.log(droppedFile.relativePath, file);
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  public fileOver(event) {
    console.log(event);
  }

  public fileLeave(event) {
    console.log(event);
  }

}
