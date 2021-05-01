import { FormGroup } from '@angular/forms'

export interface DynamicFieldModel {
  formGroup?: Array<DynamicFieldModel> // form group
  label?: string // label
  name: string // field's name
  type: string // field's type e.g. text, select, formarray
  inputType?: string
  inputGroupAppend?: string
  placeholder?: string // field's placeholder
  required?: boolean // field's requirement state
  options?: Array<Option> // select options
  multiple?: boolean // multiple select options
  value?: any
  validations?: Array<Validator>
  formArray?: boolean
  class?: string
  defaultImage?: string
  disabled?: boolean
  maxDate?: Date
  minDate?: Date
  height?: string
  showPicker?: boolean
  row?: string
}

export interface Validator {
  name: string
  validator: any
  message: string
}

export interface Option {
  text: string
  value: string | boolean | number
}

export interface QueryFilter {
  fieldName: string
  fieldValue: string | boolean | Date
  operator: any
}

export interface QueryOrder {
  fieldName: string
  direction: 'desc' | 'asc'
  limit?: number
}

export interface CollectionJoin {
  collection: string
  leftJoinId: string
  selectField: string
}
