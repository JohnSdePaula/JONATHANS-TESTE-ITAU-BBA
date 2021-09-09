import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompaniesComponent } from './containers/companies/companies.component';
import { CompanyDetailComponent } from './containers/company-detail/company-detail.component';

const routes: Routes = [
  {
    path: '', component: CompaniesComponent
  },
  {
    path: 'company/details/:id', component: CompanyDetailComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
