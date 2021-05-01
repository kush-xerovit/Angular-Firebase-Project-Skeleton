import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from './components/components.module'
import { RouterModule } from '@angular/router'


import { PublicLayoutComponent } from './public-layout.component';


@NgModule({
  declarations: [PublicLayoutComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    RouterModule
  ]
})
export class PublicLayoutModule { }
