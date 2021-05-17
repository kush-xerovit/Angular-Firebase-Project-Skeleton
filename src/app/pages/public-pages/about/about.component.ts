import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUploadService } from './file-upload.service';
import { FileUpload } from './file-upload.model';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  @ViewChild('inputFile') myInputVariable: ElementRef;
  data: any;
  selectedFiles: [];
  currentFileUpload: FileUpload[] = [];
  percentage: number;
  fileUploads: any[];
  constructor(private route: ActivatedRoute, private uploadService: FileUploadService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params["data"]) {
        this.data = JSON.parse(params["data"])

      }
    });
    this.uploadService.getFiles(6).snapshotChanges().pipe(
      map(changes =>
        // store the key
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(fileUploads => {
      this.fileUploads = []
      this.fileUploads = fileUploads;
    });
  }
  selectFile(event): void {
    this.selectedFiles = event.target.files;
  }

  async upload() {
    let file = [];
    for (let i = 0; i < this.selectedFiles.length; i++) {
      if(this.selectedFiles[i]['size'] > 10 * 1024 * 1024) {
        alert('File size must be less than 10 MB')
      }
      await file.push(this.selectedFiles[i]);
      await this.currentFileUpload.push(new FileUpload(file[i]))
    }
    this.selectedFiles = [];
    this.uploadService.pushFileToStorage(this.currentFileUpload)
    this.currentFileUpload = []
    this.myInputVariable.nativeElement.value = '';
  }

  deleteFileUpload(fileUpload): void {
    this.uploadService.deleteFile(fileUpload);
  }

}
