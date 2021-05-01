import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { DynamicFieldModel } from '../dynamic-field.model'

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss'],
})
export class ImageUploadComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef

  @Input()
  formGroup: FormGroup

  @Input()
  field: DynamicFieldModel

  imagePreviewUrl: string | ArrayBuffer

  constructor() {}

  ngOnInit() {}

  handleImageChange($event: Event) {
    $event.preventDefault()
    const file = ($event.target as HTMLInputElement).files[0]
    this.formGroup.get(this.field.name).setValue(file)
    this.formGroup.get(this.field.name).updateValueAndValidity()
    const reader = new FileReader()
    reader.onloadend = () => {
      this.imagePreviewUrl = reader.result
    }
    reader.readAsDataURL(file)
  }

  handleRemove() {
    this.imagePreviewUrl = null
    this.formGroup.get(this.field.name).setValue('')
    this.fileInput.nativeElement.value = null
  }
}
