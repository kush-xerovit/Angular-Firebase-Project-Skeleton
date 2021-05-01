import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core'
import { FormGroup, FormArray, FormBuilder, FormControl } from '@angular/forms'
import { DynamicFieldModel } from '../dynamic-field.model'
import { IFileUpload } from './file-upload.model'

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef

  @Input()
  formGroup: FormGroup

  @Input()
  field: DynamicFieldModel
  files = []

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    if (this.formGroup.get(this.field.name).value) {
      this.formGroup.get(this.field.name).value.forEach((file: IFileUpload) => {
        this.files.push(file)
        this.formGroup.get(this.field.name).setValue(this.files)
        console.log(this.formGroup.get(this.field.name).value)
      })
    }
  }

  async addFiles(event) {
    if (event.target.files && event.target.files[0]) {
      for (const f of event.target.files) {
        const blob = await this.readFileBlob(f)
        const uploadFiles: IFileUpload = { name: f.name, url: blob }
        this.files.push(uploadFiles)
        this.formGroup.get(this.field.name).setValue(this.files)
      }
    }
  }

  readFileBlob(file: File): Promise<any> {
    return new Promise((resolve, _) => {
      const reader = new FileReader()
      reader.onloadend = (e) => {
        resolve(reader.result)
      }
      reader.readAsDataURL(file)
    })
  }

  addFileForm(item: IFileUpload = {}): FormGroup {
    return this.fb.group({
      name: new FormControl(item.name),
      url: new FormControl(item.url),
    })
  }

  removeFile(material) {
    const index = this.formGroup.get(this.field.name).value.indexOf(material)
    this.formGroup.get(this.field.name).value.splice(index, 1)
  }
}
