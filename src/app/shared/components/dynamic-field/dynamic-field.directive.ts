import {
  ComponentFactoryResolver,
  Directive,
  Input,
  OnInit,
  ViewContainerRef,
  Output,
  EventEmitter,
  AfterViewInit,
} from '@angular/core'

import { DynamicFieldModel } from './dynamic-field.model'
import { FormGroup } from '@angular/forms'
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
import { FileUploadComponent } from './file-upload/file-upload.component'


const componentMapper = {
  input: InputComponent,
  textarea: TextAreaComponent,
  select: SelectInputComponent,
  date: DateComponent,
  datetime: DateTimeComponent,
  radio: RadioButtonComponent,
  texteditor: TextEditorComponent,
  formArray: FormArrayComponent,
  taginput: TagInputComponent,
  checkbox: CheckBoxComponent,
  image: ImageUploadComponent,
  material: FileUploadComponent,
}

@Directive({
  selector: '[appDynamicField]',
})
export class DynamicFieldDirective implements OnInit, AfterViewInit {
  @Input() field: DynamicFieldModel
  @Input() formGroup: FormGroup
  componentRef: any

  @Output() eventOutput: EventEmitter<any> = new EventEmitter<any>()

  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef
  ) {}

  ngOnInit() {
    const factory = this.resolver.resolveComponentFactory(
      componentMapper[this.field.type]
    )
    this.componentRef = this.container.createComponent(factory)
    this.componentRef.instance.field = this.field
    this.componentRef.instance.formGroup = this.formGroup
  }

  ngAfterViewInit() {
    // get topic data
    if (this.componentRef.instance.field.name === 'topic') {
      this.componentRef.instance.output.subscribe((event) => {
        this.eventOutput.emit(event)
      })
    }
  }
}
