import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { DbService } from '../db/db.service';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  constructor(private storage: AngularFireStorage, private db: DbService) {}

  fileCompare(otherArray) {
    return (current) => {
      return (
        otherArray.filter((other) => {
          return other.name === current.name && other.url === current.url;
        }).length === 0
      );
    };
  }

  async fileCheck(files, collection, id, type) {
    const newFiles = [];
    const oldFiles = [];
    files.forEach((file: any, index) => {
      if (!file.url.includes('https://firebasestorage.googleapis.com/')) {
        newFiles.push(file);
      } else {
        oldFiles.push(file);
      }
      if (files.length - 1 === index) {
        this.fileUpload(collection, id, type, newFiles, oldFiles);
      }
    });
  }

  fileUpload(collection, id, type, newFiles, oldFiles) {
    if (newFiles.length > 0) {
      const tempFiles = [...oldFiles];
      newFiles.forEach((base64, index) => {
        // get bolb file from base64
        const file = this.writeFileBlob(base64.url);
        const path = `${collection}/${type}/${Date.now()}_${base64.name}`;
        const customMetadata = { app: 'Angular Tutorial', developer: 'Xerovit' };
        const fileRef = this.storage.ref(path);

        this.storage.upload(path, file, { customMetadata }).then(
          () => {
            fileRef.getDownloadURL().subscribe(async (url) => {
              tempFiles.push({ name: base64.name, url: url, path: path });
              if (newFiles.length - 1 === index) {
                if (type === 'photo') {
                  this.db.updateAt(`${collection}/${id}`, { logo: tempFiles }, true);
                } else if (type === 'gallery') {
                  this.db.updateAt(`${collection}/${id}`, { galleries: tempFiles }, true);
                } else if (type === 'coverLetter') {
                  this.db.updateAt(`${collection}/${id}`, { coverLetter: tempFiles }, true);
                } else if (type === 'cv') {
                  this.db.updateAt(`${collection}/${id}`, { cv: tempFiles }, true);
                } else if (type === 'certificate') {
                  this.db.updateAt(`${collection}/${id}`, { certificate: tempFiles }, true);
                } else {
                  this.db.updateAt(`${collection}/${id}`, { documents: tempFiles }, true);
                }
              }
            });
          },
          (error) => console.log(error)
        );
      });
    }
  }

  writeFileBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    let byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0) byteString = atob(dataURI.split(',')[1]);
    else byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], { type: mimeString });
  }

  getUploadFileURL(collection, type, uploadFiles) {
    return new Promise((response) => {
      const urls: any[] = [];
      uploadFiles.forEach((uploadFile) => {
        if (!uploadFile.url.includes('https://firebasestorage.googleapis.com/')) {
          const file = this.writeFileBlob(uploadFile.url);
          const path = `${collection}/${type}/${Date.now()}_${uploadFile.name}`;
          const customMetadata = { app: 'JobFit Myanmar', developer: 'Xerovit' };
          const fileRef = this.storage.ref(path);
          this.storage
            .upload(path, file, { customMetadata })
            .snapshotChanges()
            .pipe(
              finalize(() => {
                fileRef.getDownloadURL().subscribe((url) => {
                  urls.push({ name: uploadFile.name, url: url, path: path });
                  if (uploadFiles.length === urls.length) {
                    response(urls);
                  }
                });
              })
            )
            .subscribe();
        } else {
          urls.push(uploadFile);
          if (uploadFiles.length === urls.length) {
            response(urls);
          }
        }
      });
    });
  }
}
