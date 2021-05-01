import { NgModule } from '@angular/core'

// plug-in
import { ModalModule } from 'ngx-bootstrap/modal'
import { TooltipModule } from 'ngx-bootstrap/tooltip'

// modules
import { TableModule } from './components/table/table.module'

// services
import * as Services from './services'

// Pipe
import { ShortDateTimePipe } from './pipes/date.pipe'

// components
import * as Components from './components'

const pipes = [ShortDateTimePipe]

const modules = [TableModule]

const components = [Components.components]

@NgModule({
  declarations: [...components],
  imports: [ModalModule.forRoot(), TooltipModule.forRoot(), ...modules],
  providers: [Services.services, ...pipes],
  exports: [...modules, ...components],
})
export class SharedModule {}
