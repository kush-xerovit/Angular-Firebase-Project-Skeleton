import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Public layout component
import { PublicLayoutComponent } from './layouts/public-layout/public-layout.component';
// Admin layout component
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    canActivate: [],
    loadChildren: () =>
      import('./pages/public-pages/public-pages.module').then(
        (m) => m.PublicPagesModule
      ),
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [],
    loadChildren: () =>
      import('./pages/admin-pages/admin-pages.module').then(
        (m) => m.AdminPagesModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
