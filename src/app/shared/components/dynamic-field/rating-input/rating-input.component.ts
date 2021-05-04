import { Component, OnInit, Input } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { DynamicFieldModel } from '../dynamic-field.model'
@Component({
  selector: 'app-rating-input',
  templateUrl: './rating-input.component.html',
  styleUrls: ['./rating-input.component.scss']
})
export class RatingInputComponent implements OnInit {

  @Input()
  formGroup: FormGroup

  @Input()
  field: DynamicFieldModel
  constructor() { }

  ngOnInit(): void {
  }

}
