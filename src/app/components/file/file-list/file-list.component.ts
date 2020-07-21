import { Component, OnInit } from '@angular/core';
import { FileService } from 'src/app/services/api/file.service';
import { FileResource } from 'src/app/models/file-resource';
import { ApplicationInfoComponent } from '../../modal/application-info/application-info.component';
import { MatDialog } from '@angular/material/dialog';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.scss']
})
export class FileListComponent implements OnInit {

  public fileList: FileResource[] = [];

  constructor(private fileService: FileService,
    private dialog: MatDialog,
    private sessionService: SessionService) { }

  ngOnInit(): void {
    this.loadData()
  }

  loadData(): void {
    setTimeout(() => { this.sessionService.loading.next(true) }, 0);
    this.fileService.getAllUserFiles().subscribe(
      (rsp) => {
        this.fileList = rsp;
        // rsp.forEach((image)=>{
        //   let obj = {
        //     'filename': image,
        //     'checked': false
        //   }
        //   this.filesList.push(obj)
        // });
        this.sessionService.loading.next(false);
      });
  }

  deleteImageButton(file: FileResource): void {
    var info: any = {
      action: "Eliminar Imágen",
      message: "Está seguro de eliminar " + file.filename,
      color: "warn"
    };
    const dialogRef = this.dialog.open(ApplicationInfoComponent, {
      data: info
    });
    dialogRef.afterClosed().subscribe(rsp => {
      if (rsp == true)
        this.deleteImage(file.id);
    });
  }

  deleteImage(id: string): void {
    this.fileService.deleteFile(id).subscribe(() => {
      this.loadData();
    });
  }

  checkUndcheck(image: any): void {
    image.checked = !image.checked
  }

  // deleteCheckedButton(): void {
  //   var info: any = {
  //     action: "Eliminar Imágenes",
  //     message: "Está seguro de eliminar las imágenes seleccionadas?",
  //     color: "warn"
  //   }
  //   const dialogRef = this.dialog.open(ApplicationInfoComponent, {
  //     data: info
  //   })
  //   dialogRef.afterClosed().subscribe(rsp => {
  //     if (rsp == true)
  //       this.deleteChecked()
  //   })
  // }

  // deleteChecked(): void{
  //   this.filesList.forEach((image)=>{
  //     if(image.checked)
  //     this.deleteImage(image.filename);
  //   });
  // }

}
