import { Component, OnInit, EventEmitter, Input } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { BsModalRef } from 'ngx-bootstrap/modal'
import { FormService } from 'src/app/shared/services/form/form.service'
import { DynamicFieldModel } from '../../dynamic-field'

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss'],
})
export class SearchFilterComponent implements OnInit {
  @Input() fieldConfigs: Array<DynamicFieldModel>
  @Input() data: any

  modalForm: FormGroup
  public event: EventEmitter<any> = new EventEmitter()

  constructor(
    public bsModalRef: BsModalRef,
    private formService: FormService
  ) {}

  ngOnInit(): void {
    this.modalForm = this.formService.buildForm(this.fieldConfigs)
    if (this.data) {
      this.modalForm.patchValue(this.data)
    }
  }

  doSearch(type?: string): void {
    if (type)
      Object.keys(this.modalForm.value).forEach((key) => {
        this.modalForm.get(key).setValue('')
      })
    this.event.emit({ data: this.modalForm.value })
    this.bsModalRef.hide()
  }
}
