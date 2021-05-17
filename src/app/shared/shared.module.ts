import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core'

// plug-in
import { ModalModule } from 'ngx-bootstrap/modal'
import { TooltipModule } from 'ngx-bootstrap/tooltip'
import { ImageCropperModule } from 'ngx-image-cropper';


// modules
import { TableModule } from './table/table.module'

// services
import * as Services from './services'

// Pipe
import { ShortDateTimePipe } from './pipes/date.pipe'

// components
import * as Components from './components'

const modules = []

const components = [Components.components]

@NgModule({
  declarations: [...components],
  imports: [ModalModule.forRoot(), TooltipModule.forRoot(), ...modules],
  providers: [Services.services,ShortDateTimePipe],
  exports: [...modules, ...components],

})
export class SharedModule {}
