import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPagesRoutingModule } from './admin-pages-routing.module';
import { AdminLayoutModule } from 'src/app/layouts/admin-layout/admin-layout.module';
import { SharedModule } from 'src/app/shared/shared.module';


import { DashboardComponent } from './dashboard/dashboard.component';
import { UserFormComponent } from './user/user-form/user-form.component';
import { UserListComponent } from './user/user-list/user-list.component';



@NgModule({
  declarations: [DashboardComponent, UserFormComponent, UserListComponent],
  imports: [
    CommonModule,
    AdminPagesRoutingModule,
    AdminLayoutModule,
    SharedModule
  ]
})
export class AdminPagesModule { }
