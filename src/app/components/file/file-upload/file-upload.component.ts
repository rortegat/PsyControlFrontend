import { Component, OnInit } from '@angular/core';
import { FileService } from 'src/app/services/api/file.service';
import { FileSystemDirectoryEntry, NgxFileDropEntry, FileSystemFileEntry } from 'ngx-file-drop';
import { MatDialog } from '@angular/material/dialog';
import { ServerErrorComponent } from '../../modal/server-error/server-error.component';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  public ngxFiles: NgxFileDropEntry[] = [];
  public files: File[] = [];
  public progress: number[] = [];

  constructor(private fileService: FileService, private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  uploadImages(): void {
    this.files.forEach((file, index) => {
      this.fileService.uploadSingleFile(file).subscribe(
        (rsp) => {
          if (rsp.message!=undefined)
            //console.log(rsp.message)
          this.progress[index] = rsp.message;
          if(this.progress[index]==100)
          console.log("COMPLETADO")
          //this.progress.splice(index);
        },
        (err) => {
          this.dialog.open(ServerErrorComponent,{data:err});
          this.fileSplice(index);
        });
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

  fileOver(event): void {
    console.log(event);
  }

  fileLeave(event): void {
    console.log(event);
  }

  public fileSplice(index: number): void {
    this.files.splice(index, 1);
    this.progress.splice(index, 1);
  }

}
