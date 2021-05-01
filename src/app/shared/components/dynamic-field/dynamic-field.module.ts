import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

// plugin
import { BsDatepickerModule, DatepickerModule } from 'ngx-bootstrap/datepicker'
import { TimepickerModule } from 'ngx-bootstrap/timepicker'
import { DatetimePopupModule } from 'ngx-bootstrap-datetime-popup'
import { BsDropdownModule } from 'ngx-bootstrap/dropdown'
import { QuillModule } from 'ngx-quill'
import { NgSelectModule } from '@ng-select/ng-select'
import { TagInputModule } from 'ngx-chips'

// directive
import { DynamicFieldDirective } from './dynamic-field.directive'

// component
import { InputComponent } from './input/input.component'
import { TextAreaComponent } from './text-area/text-area.component'
import { SelectInputComponent } from './select-input/select-input.component'
import { DateComponent } from './date/date.component'
import { RadioButtonComponent } from './radio-button/radio-button.component'
import { TextEditorComponent } from './text-editor/text-editor.component'
import { FormArrayComponent } from './form-array/form-array.component'
import { TagInputComponent } from './tag-input/tag-input.component'
import { CheckBoxComponent } from './check-box/check-box.component'
import { DateTimeComponent } from './date-time/date-time.component'
import { ImageUploadComponent } from './image-upload/image-upload.component'
import { FileUploadComponent } from './file-upload/file-upload.component';

const components = [
  InputComponent,
  TextAreaComponent,
  SelectInputComponent,
  DateComponent,
  RadioButtonComponent,
  TextEditorComponent,
  FormArrayComponent,
  TagInputComponent,
  CheckBoxComponent,
  DateTimeComponent,
  ImageUploadComponent,
]
const directive = [DynamicFieldDirective]
const modules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  NgSelectModule,
  TagInputModule,
]

@NgModule({
  declarations: [...components, ...directive, FileUploadComponent],
  imports: [
    ...modules,
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    DatetimePopupModule,
    QuillModule.forRoot(),
  ],
  exports: [...components, ...directive, ...modules],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class DynamicFieldModule {}
