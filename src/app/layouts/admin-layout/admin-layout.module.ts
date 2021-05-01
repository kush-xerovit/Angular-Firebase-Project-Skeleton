import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from './components/components.module'
import { RouterModule } from '@angular/router'


import { AdminLayoutComponent } from './admin-layout.component';



@NgModule({
  declarations: [AdminLayoutComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    RouterModule
  ]
})
export class AdminLayoutModule { }
