import { Component, OnInit, Input } from '@angular/core'
import { FormGroup, FormArray } from '@angular/forms'
import { DynamicFieldModel } from '../dynamic-field.model'
import { FormService } from 'src/app/shared/services/form/form.service'

@Component({
  selector: 'app-form-array',
  templateUrl: './form-array.component.html',
  styleUrls: ['./form-array.component.scss'],
})
export class FormArrayComponent implements OnInit {
  @Input() formGroup: FormGroup
  @Input() field: DynamicFieldModel

  constructor(private formService: FormService) {}

  ngOnInit() {}

  formArrays(): FormArray {
    return this.formGroup.get(this.field.name) as FormArray
  }

  removeFormGroup(index: number) {
    this.formArrays().removeAt(index)
  }

  addFormGroup() {
    this.formArrays().push(this.formService.buildForm(this.field.formGroup))
  }
}
