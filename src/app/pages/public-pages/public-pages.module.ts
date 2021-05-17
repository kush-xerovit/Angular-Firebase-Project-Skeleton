import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'

import { PublicPagesRoutingModule } from './public-pages-routing.module';
import { PublicLayoutModule } from 'src/app/layouts/public-layout/public-layout.module';
import { SharedModule } from 'src/app/shared/shared.module';


import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';



@NgModule({
  declarations: [HomeComponent, AboutComponent, LoginComponent],
  imports: [
    CommonModule,
    PublicPagesRoutingModule,
    PublicLayoutModule,
    SharedModule,
    ReactiveFormsModule
  ],
})
export class PublicPagesModule { }
