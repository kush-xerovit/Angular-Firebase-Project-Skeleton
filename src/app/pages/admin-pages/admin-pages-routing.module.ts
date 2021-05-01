import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// components
import { DashboardComponent } from './dashboard/dashboard.component'
import { UserFormComponent } from './user/user-form/user-form.component';
import { UserListComponent } from './user/user-list/user-list.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'user-list',
    component: UserListComponent,
    pathMatch: 'full',
  },
  {
    path: 'user-form',
    component: UserFormComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPagesRoutingModule { }
