import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core'
import { Router } from '@angular/router'
import { BsModalService } from 'ngx-bootstrap/modal'
import { DbService } from 'src/app/shared/services/db/db.service'
// import { AuthService } from 'src/app/auth/auth.service'
import { SearchFilterComponent } from '../search-filter/search-filter.component'
import { Column, EditOption, IColumnSort, InputData } from './input-data.model'
// import * as dataInput from './data-input.json'
import Swal, { SweetAlertOptions } from 'sweetalert2'
import { ShortDateTimePipe } from 'src/app/shared/pipes/date.pipe'
import { pipe } from 'rxjs'

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent implements OnInit {
  @Input() totalCount = 0
  @Input() data: any = []

  // pagination
  offset: number
  currentPage: number

  // table checkbox
  editOption = false
  isSelectedAll: boolean
  checkedList: Array<string> = []

  // search
  searchValue = ''
  searchFilterValue = ''

  input: InputData

  // table field sort
  config: IColumnSort

  @Output() pageChange: EventEmitter<{
    currentPage: number
    offset: number
    searchValue: string
    filterValue: string
  }> = new EventEmitter()

  @Output() clickEvent: EventEmitter<string> = new EventEmitter()

  constructor(
    private router: Router,
    private modalService: BsModalService,
    private db: DbService,
    // public authService: AuthService,
    private shortDateTime: ShortDateTimePipe
  ) {
    // if (this.router.url.includes('account')) {
    //   this.db.getHelper('admin').subscribe((result) => {
    //     if (result.data)
    //       this.input.searchFilter[0].options = result.data.access_levels
    //   })
    // }
  }

  ngOnInit(): void {
    // this.input = new InputData(
    //   (dataInput as any).default[
    //     this.router.url.split('/')[this.router.url.split('/').length - 1]
    //   ]
    // )
  }

  // change page in pagination
  onPageChange(page) {
    this.checkedList = []
    this.currentPage = page.activePage
    this.offset = page.numPerPage
    this.doChangePage()
  }

  // change action
  doChangePage() {
    this.config = {
      sortBy: '',
      sortDirection: 'desc',
    }
    this.isSelectedAll = false
    this.pageChange.emit({
      currentPage: this.currentPage,
      offset: this.offset,
      searchValue: this.searchValue,
      filterValue: JSON.stringify(this.searchFilterValue),
    })
  }

  // search filter
  doSearch() {
    const bsModalRef = this.modalService.show(SearchFilterComponent, {
      initialState: {
        fieldConfigs: this.input.searchFilter,
        data: this.searchFilterValue ? this.searchFilterValue : undefined,
      },
      class: 'modal-dialog-centered modal-lg',
    })
    bsModalRef.content.event.subscribe((res) => {
      if (res.data) {
        this.searchFilterValue = JSON.parse(JSON.stringify(res.data))
        this.doChangePage()
      }
    })
  }

  // table checkbox
  checkUncheckAll() {
    this.data = this.data.map((item) => {
      return { ...item, isSelected: this.isSelectedAll }
    })
    this.getCheckedItemList()
  }

  isAllSelected() {
    this.isSelectedAll = this.data.every((item: any) => {
      return item.isSelected === true
    })
    this.getCheckedItemList()
  }

  getCheckedItemList() {
    this.checkedList = []
    this.checkedList = this.data
      .filter((item) => item.isSelected === true)
      .map((value) => {
        return value.id
      })
    this.checkedList.length > 0
      ? (this.editOption = true)
      : (this.editOption = false)
  }

  // detail page
  doDetail(data) {
    if (this.input.detailUrl !== 'modal')
      this.router.navigate([`/${this.router.url}/profile/${data.id}`])
    else this.clickEvent.emit(data)
  }

  // swal config
  // swalConfirmConfig: SweetAlertOptions<any, any> = {
  //   title: 'Are you sure?',
  //   text: `You won't be able to revert this!`,
  //   icon: 'warning',
  //   showCancelButton: true,
  //   confirmButtonText: 'Yes, confirm!',
  //   confirmButtonColor: '#3085d6',
  //   cancelButtonText: 'No, cancel!',
  //   cancelButtonColor: '#d33',
  // }

  // swal noti list
  swalNoti(condition: string, message?: string) {
    switch (condition) {
      case 'delete':
        Swal.fire(
          'Deleted!',
          message !== undefined ? message : 'Item has been deleted.',
          'success'
        )
        break
      case 'update':
        Swal.fire(
          'Updated!',
          message !== undefined ? message : 'Item has been updated.',
          'success'
        )
        break
      case 'error':
        Swal.fire(
          'Error!',
          message !== undefined ? message : 'Please contact admin!',
          'error'
        )
        break

      default:
        Swal.fire(
          'Cancelled!',
          message !== undefined ? message : 'Action has been cancelled',
          'error'
        )
        break
    }
  }

  // unselect all
  unselectAll() {
    this.data.map((v) => (v.isSelected = false))
    this.isSelectedAll = false
    this.checkedList = []
  }

  deleteFunction() {
    // return this.db.delete(`${this.input.backendApi}`, this.checkedList)
  }

  updateFunction(collection, option) {
    // return this.db.update(
    //   `${collection}/update/${option.fieldName}`,
    //   this.checkedList,
    //   option.fieldValue
    // )
  }

  // edition option action
  doEditOption(option: EditOption) {
    if (this.checkedList.length > 0) {
      Swal.fire({
        title: 'Are you sure?',
        text: `You won't be able to revert this!`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, confirm!',
        confirmButtonColor: '#3085d6',
        cancelButtonText: 'No, cancel!',
        cancelButtonColor: '#d33',
      }).then((result) => {
        if (result.value) {
          // const collection = this.router.url.split('/')[
          //   this.router.url.split('/').length - 1
          // ]
          // const doEdit =
          //   option.fieldName === 'deleted_at'
          //     ? this.deleteFunction()
          //     : this.updateFunction(collection, option)

          // doEdit.subscribe(
          //   () => {
          //     this.swalNoti(
          //       option.fieldName === 'deleted_at' ? 'delete' : 'update'
          //     )
          //     this.doChangePage()
          //     this.checkedList = []
          //   },
          //   (error) => {
          //     this.swalNoti('error')
          //   }
          // )
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          this.swalNoti('cancel')
          this.unselectAll()
        }
      })
    } else {
      this.swalNoti('error','Please select an item first!')
      // Toast message to show
      // Please select an item first!
    }
  }

  // sort table column
  sortHeader(column: Column) {
    if (this.config.sortBy === column.fieldName)
      this.config.sortDirection =
        this.config.sortDirection === 'asc' ? 'desc' : 'asc'
    this.config.sortBy = column.fieldName
    this.sort(this.config.sortBy, this.config.sortDirection, column.isNumeric)
  }

  private sort(fieldName: string, direction: string, isNumeric: boolean) {
    const sortFunc = (field, rev, _primer) => {
      // Return the required a,b function
      return (a, b) => {
        // Reset a, b to the field
        ;(a = primer(pathValue(a, field))), (b = primer(pathValue(b, field)))
        // Do actual sorting, reverse as needed
        return (a < b ? -1 : a > b ? 1 : 0) * (rev ? -1 : 1)
      }
    }

    // Have to handle deep paths
    const pathValue = (obj, path) => {
      path = path.split('.')
      for (let i = 0, len = path.length; i < len; i++) {
        obj = obj[path[i]]
      }
      return obj
    }

    const primer = isNumeric
      ? (a) => {
          const retValue = parseFloat(String(a).replace(/[^0-9.-]+/g, ''))
          return isNaN(retValue) ? 0.0 : retValue
        }
      : (a) => {
          return String(a).toUpperCase()
        }
    this.data.sort(sortFunc(fieldName, direction === 'desc', primer))
  }

  getCellValue(row: any, column: Column): string {
    const result: string = column.fieldName
      .split('.')
      .reduce((prev: any, curr: string) => prev[curr], row)
    if (column.pipe) {
      switch (column.pipe) {
        case 'shortDateTime': {
          return this.shortDateTime.transform(result)
        }
      }
    }
    return result
  }
}
