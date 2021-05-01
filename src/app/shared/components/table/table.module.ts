import { NgModule } from '@angular/core'

// modules
import { DynamicFieldModule } from '../dynamic-field'

// components
import { DataTableComponent } from './data-table/data-table.component'
import { SearchFilterComponent } from './search-filter/search-filter.component'
import { PaginationComponent } from './pagination/pagination.component'

// Pipe
import { ShortDateTimePipe } from '../../pipes/date.pipe'

const components = [
  DataTableComponent,
  SearchFilterComponent,
  PaginationComponent,
  ShortDateTimePipe,
]

const modules = [DynamicFieldModule]

@NgModule({
  declarations: [...components],
  imports: [...modules],
  exports: [...components, ...modules],
})
export class TableModule {}
