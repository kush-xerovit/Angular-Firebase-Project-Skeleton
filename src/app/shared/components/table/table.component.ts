import { Component, Input, ViewChild, OnInit, ChangeDetectorRef, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { AuthService } from 'src/app/auth/auth.service';
import { DbService } from 'src/app/services/db/db.service';
import { ExportCsvService } from 'src/app/services/export-csv/export-csv.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { IColumn, IFilter, FieldType } from './table.model';
import * as searchField from './search-field.json';

export enum SelectionType {
  single = 'single',
  multi = 'multi',
  multiClick = 'multiClick',
  cell = 'cell',
  checkbox = 'checkbox',
}
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @ViewChild(DatatableComponent) table: DatatableComponent;

  @Input() module: string;
  @Input() title: string;
  @Input() columns: Array<IColumn>;
  @Input() data: any;
  @Output() editBtnClick: EventEmitter<any> = new EventEmitter();
  @Output() pageClick: EventEmitter<any> = new EventEmitter();

  temp: Array<any>;
  rows: Array<any>;

  SelectionType = SelectionType;
  fieldFilter: Array<IFilter>;
  searchFields: string;
  role: string;
  isLoading: boolean;

  pageLimitOptions: Array<number> = [10, 25, 50, 100];
  totalElements = 0;
  curPage = 1;
  pageSize = 10;
  pageBehaviour: string;
  searchValue = '';

  constructor(
    public router: Router,
    private db: DbService,
    private exportCsvService: ExportCsvService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.fieldFilter = (searchField as any).default[this.module];
    this.searchFields = this.fieldFilter.map((o) => o.name).join(', ');
  }

  setDataInit(data) {
    this.temp = data.data;
    this.rows = data.data;
    this.totalElements = data.count;
    this.role = this.authService?.currentUser?.value?.role;
    this.cdr.markForCheck();
  }

  /**
   *
   * @param event  // select page in pagination
   */

  async onPageChange(event?: any) {
    const page = event ? event.page : 1;
    const offset = page > 1 ? page - 1 : 0;
    if (page === 1) {
      this.pageBehaviour = 'first';
    } else if (page === Math.ceil(this.totalElements / this.pageSize)) {
      this.pageBehaviour = 'last';
    } else if (page > this.curPage) {
      this.pageBehaviour = 'next';
    } else {
      if (this.pageBehaviour === 'next' || this.pageBehaviour === 'last') {
        this.pageBehaviour = 'prev';
      }
    }
    this.curPage = page;
    this.pageClick.emit({
      pageBehaviour: this.pageBehaviour,
      offset: offset,
      pageSize: this.pageSize,
      searchValue: this.searchValue,
    });
  }

  pageSizeChange($event) {
    this.pageSize = parseInt($event.target.value);
    // this.onPageChange();
  }

  /**
   *
   * @param event // search value
   */

  filterTable(event) {
    this.isLoading = true;
    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter((d) => {
      let flag = false;
      this.fieldFilter.forEach((element) => {
        switch (element.fieldType) {
          case FieldType.string: {
            if (
              (d[element.fieldName] &&
                d[element.fieldName] !== undefined &&
                d[element.fieldName].toLowerCase().indexOf(val) !== -1) ||
              !val
            )
              flag = true;
            break;
          }
          case FieldType.array: {
            if (d[element.fieldName] && d[element.fieldName] !== undefined) {
              d[element.fieldName].forEach((arrVal) => {
                if (arrVal.toLowerCase().indexOf(val) !== -1 || !val) flag = true;
              });
            }
            break;
          }
          case FieldType.arrayObject: {
            d[element.fieldName].forEach((obj) => {
              for (const key in obj) {
                if (obj.hasOwnProperty(key))
                  if (obj[key] && key !== 'id' && key !== 'startDate' && key !== 'endDate')
                    if (obj[key].toLowerCase().indexOf(val) !== -1 || !val) flag = true;
              }
            });
            break;
          }
          case FieldType.Object: {
            for (const key in d[element.fieldName]) {
              if (d[element.fieldName].hasOwnProperty(key))
                if (d[element.fieldName][key] && key !== 'id' && key !== 'startDate' && key !== 'endDate')
                  if (d[element.fieldName][key].toLowerCase().indexOf(val) !== -1 || !val) flag = true;
            }
            break;
          }
        }
      });
      return flag;
    });
    this.rows = temp;
    this.isLoading = false;
  }

  searchFilter(event) {
    this.searchValue = event.target.value.toLowerCase();
    this.onPageChange();
  }

  onActivate(event) {
    if (event.type === 'click') {
      this.router.navigate([`/jobs/${event.row.id}`]);
    }
  }

  doEdit(id) {
    if (this.module.includes('common-setting')) this.editBtnClick.emit(id);
    else this.router.navigate([`${this.module}/form/${id}`]);
  }

  doProfile(id: string) {
    this.router.navigate([`${this.module}/profile/${id}`]);
  }

  doDelete(rowIndex, id: string) {
    let module;
    if (this.module.includes('common-setting')) {
      module = this.module.substring(15);
      module = module.replace('-', '_');
    } else if (this.module.includes('user-setting')) {
      module = this.module.substring(13);
      module = module.replace('user', 'userProfile');
    } else {
      module = this.module;
    }
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      confirmButtonColor: '#3085d6',
      cancelButtonText: 'No, cancel!',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.value) {
        this.db.delete(`${module}/${id}`).then(
          () => {
            Swal.fire('Deleted!', 'Item has been deleted.', 'success');
            this.onPageChange();
          },
          (error) => {
            Swal.fire('Cancelled', 'Item is not deleted.', 'error');
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Item is not deleted.', 'error');
      }
    });
  }

  onSelect(row) {
    this.router.navigate([`/jobs/${row.id}`]);
  }

  trackById(obj) {
    return obj.id;
  }

  /**
   * check module
   */
  checkModule() {
    if (this.module.includes('common-setting') || this.module.includes('user-setting')) {
      return true;
    }
  }

  async doStatusVerify(rowIndex, id) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Verify it!',
      confirmButtonColor: '#3085d6',
      cancelButtonText: 'No, cancel!',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.value) {
        this.db.updateAt(`userProfile/${id}`, { status: 'verified' }, true);
        const msg = this.db.updateAt(`${this.module}/${id}`, { status: 'verified' });
        if (msg) {
          Swal.fire('Verify!', 'Item has been verified.', 'success');
          this.onPageChange();
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Item is not verified.', 'error');
      }
    });
  }

  /**
   * CSV export
   */

  exportCSV() {
    let header = [];
    console.log(this.data);
    const exportData = JSON.parse(JSON.stringify(this.data.data));
    exportData.forEach((col: any) => {
      delete col.createdAt;
      header = Object.keys(col);
      this.formatData(col, header);
    });
    this.exportCsvService.exportCSV(exportData, this.title, header);
  }

  formatData(col, header) {
    for (const property of header) {
      if (Array.isArray(col[property])) {
        const data = [];
        col[property].forEach((element, index) => {
          if (typeof element === 'object') {
            if (element.url) {
              data.push(index + 1 + ': ' + element.url);
            } else {
              delete element.startDate;
              delete element.endDate;
              data.push(JSON.stringify(element));
            }
          } else {
            data.push(element);
          }
        });
        col[property] = data.toString();
      } else {
        if (typeof col[property] === 'object') {
          let name = '';
          name = col[property]?.name;
          col[property] = name;
        }
      }
    }
  }

  /**
   * Custom Table Pagination
   */
  totalPages() {
    return Math.ceil(this.totalElements / this.pageSize);
  }
  canNext(): boolean {
    return this.curPage < this.totalPages();
  }
  canPrevious(): boolean {
    return this.curPage > 1;
  }
}
