import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { BsModalRef } from 'ngx-bootstrap/modal'
import { FormService } from 'src/app/shared/services/form/form.service'
import { DynamicFieldModel } from '../../dynamic-field'

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.scss'],
})
export class ModalFormComponent implements OnInit {
  @Input() fieldConfigs: Array<DynamicFieldModel>
  @Input() data: any

  @Output() action: EventEmitter<any> = new EventEmitter()

  form: FormGroup

  constructor(
    public bsModalRef: BsModalRef,
    private formService: FormService
  ) {}

  ngOnInit(): void {
    this.form = this.formService.buildForm(this.fieldConfigs)
    if (this.data) {
      this.form.patchValue(this.data)
    }
  }

  onSubmit() {
    if (this.form.invalid)
      return this.formService.validateAllFormFields(this.form)
    this.action.emit({ data: this.form.value })
    this.bsModalRef.hide()
  }

  getSubTopic(event, fName) {
    if (fName === 'topic') {
      this.fieldConfigs[4].options = event
    }
  }
}
