import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnChanges,
} from '@angular/core'
@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() totalRecords = 0
  @Output() pageChange: EventEmitter<{
    activePage: number
    numPerPage: number
  }> = new EventEmitter()

  pages: Array<number> = []

  activePage: number
  numPerPage = 10
  pageSizeOptions = [10, 25, 50, -1]

  startPages: Array<number> = []
  endPages: Array<number> = []

  ngOnInit(): void {}

  ngOnChanges(): any {
    const pageCount = this.getPageCount()
    this.pages = this.getArrayOfPage(pageCount)
    this.activePage = 1
    this.pageChange.emit({ activePage: 1, numPerPage: this.numPerPage })
  }

  private getPageCount(): number {
    const pageCount = this.totalRecords / this.numPerPage
    const roundedPageCount = Math.ceil(pageCount)
    return roundedPageCount > 0 ? roundedPageCount : 1
  }

  private getArrayOfPage(pageCount: number): number[] {
    this.startPages = []
    this.endPages = []
    const pageArray = []
    if (pageCount > 0) {
      for (let i = 1; i <= pageCount; i++) {
        pageArray.push(i)
        if (pageCount > 5 && i < 3) this.startPages.push(i)
        if (pageCount > 5 && i > pageCount - 2) this.endPages.push(i)
      }
    }
    return pageArray
  }

  onClickPage(pageNumber: number) {
    this.activePage = +pageNumber
    this.pageChange.emit({
      activePage: this.activePage,
      numPerPage: this.numPerPage,
    })
    if (this.pages.length > 5) {
      this.startPages = [this.activePage, this.activePage + 1]
      this.endPages = [this.pages.length - 1, this.pages.length]

      if (this.startPages[1] + 2 >= this.endPages[0]) {
        this.startPages = []
        const arr = []
        for (let i = 4; i >= 0; i--) {
          arr.push(this.pages.length - i)
        }
        this.endPages = arr
      }
    }
  }

  onChangePageSize(perPage: number) {
    this.numPerPage = +perPage
    const pageCount = this.getPageCount()
    this.pages = this.getArrayOfPage(pageCount)
    this.onClickPage(1)
  }
}
