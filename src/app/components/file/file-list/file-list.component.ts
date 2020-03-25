import { Component, OnInit } from '@angular/core';
import { FileService } from 'src/app/services/api/file.service';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.css']
})
export class FileListComponent implements OnInit {

  constructor(private fileService: FileService) { }

  ngOnInit() {
  }

}
