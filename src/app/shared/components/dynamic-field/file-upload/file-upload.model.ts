export interface IFileUpload {
  id?: string;
  name?: string; // file name
  path?: string;
  url?: string | ArrayBuffer; // file path
}

export class FileUpload implements IFileUpload {
  id: string;
  name: string; // file name
  path?: string;
  url: string | ArrayBuffer; // file path

  constructor(iFileUpload: IFileUpload) {
    this.id = iFileUpload.id ? iFileUpload.id : null;
    this.name = iFileUpload.name;
    this.path = iFileUpload.path ? iFileUpload.path : null;
    this.url = iFileUpload.url;
  }
}

export enum FileUploadType {
  logo = 'logo',
  galleries = 'galleries',
  documents = 'documents',
  cv = 'cv',
  coverLetter = 'coverLetter',
  certificate = 'certificate',
}
