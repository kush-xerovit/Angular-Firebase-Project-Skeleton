import { DynamicFieldModel } from '../../dynamic-field'

export interface IColumnSort {
  sortBy: string
  sortDirection: string
}
export class Column {
  label: string
  cssClass?: string
  fieldName: string
  icon?: string
  isNumeric?: boolean
  pipe?: string

  constructor(data) {
    this.label = data.label ? data.label : null
    this.cssClass = data.cssClass ? data.cssClass : null
    this.fieldName = data.fieldName ? data.fieldName : null
    this.icon = data.icon ? data.icon : null
    this.isNumeric = data.isNumeric ? data.isNumeric : false
    this.pipe = data.pipe ? data.pipe : ''
  }
}

export class EditOption {
  label: string
  cssClass?: string
  fieldName: string
  fieldValue?: string
  menuOption: string

  constructor(data) {
    this.label = data.label ? data.label : null
    this.cssClass = data.cssClass ? data.cssClass : null
    this.fieldName = data.fieldName ? data.fieldName : null
    this.fieldValue = data.fieldValue ? data.fieldValue : null
    this.menuOption = data.menuOption ? data.menuOption : null
  }
}

export interface IInputData {
  checkbox: boolean
  serialNo: boolean
  columns: Array<Column>
  searchFilter?: Array<DynamicFieldModel>
  editOptionAction: Array<EditOption>
  detailUrl: 'modal' | 'page'
  backendApi: string
}

export class InputData {
  checkbox: boolean
  serialNo: boolean
  columns: Array<Column>
  searchFilter?: Array<DynamicFieldModel>
  editOptionAction: Array<EditOption>
  detailUrl: 'modal' | 'page'
  backendApi: string

  constructor(data: IInputData) {
    this.checkbox = data.checkbox ? data.checkbox : false
    this.serialNo = data.serialNo ? data.serialNo : false
    this.columns =
      data.columns && data.columns.length > 0
        ? data.columns.map((column) => {
            return new Column(column)
          })
        : []

    this.editOptionAction =
      data.editOptionAction && data.editOptionAction.length > 0
        ? data.editOptionAction.map((field) => {
            return new EditOption(field)
          })
        : []
    this.searchFilter =
      data.searchFilter && data.searchFilter.length > 0 ? data.searchFilter : []
    this.detailUrl = data.detailUrl ? data.detailUrl : 'page'
    this.backendApi = data.backendApi ? data.backendApi : ''
  }
}
