import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
/* imports
*Material*/
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
/* Imports
*Diretivas (erro) */ 
import { HttpErrorInterceptorService } from './shared/interceptors/httperror-interceptor.service';
import { CurrencyDirective } from './shared/directives/curr.directive';
/* Imports
*Containers */
import { CompanyDetailComponent } from './containers/company-detail/company-detail.component';
import { CompaniesComponent } from './containers/companies/companies.component';
/* Imports
*Modulos */
import { CepComponent } from './shared/components/cep/cep.component';
import { ToastrModule } from 'ngx-toastr';
import localePt from '@angular/common/locales/pt';
import { CurrencyPipe, registerLocaleData } from '@angular/common';
import { NgxMaskModule, IConfig } from 'ngx-mask';
/*Imports
 *Componentes*/
import { HeaderComponent } from './shared/components/header/header.component';
import { CompanyFormComponent } from './components/company-form/company-form.component';
import { CompaniesListComponent } from './components/companies-list/companies-list.component';


registerLocaleData(localePt);

const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [
    AppComponent,
    CurrencyDirective,
    CepComponent,
    CompaniesComponent,
    CompanyDetailComponent,
    CompanyFormComponent,
    HeaderComponent,
    CompaniesListComponent,
    
   
    
  ],
  /*Recebendo adicionais do projeto*/ 
  imports: [

    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(maskConfig),
    AppRoutingModule,
    MatCardModule,
    MatToolbarModule,
    MatDividerModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatSortModule,
    ToastrModule.forRoot({
      timeOut: 1500,
      progressBar: true
    }),
  ],
  providers: [
    CurrencyPipe,
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR',
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptorService,
      multi: true
    }
  ],
  exports: [CurrencyDirective],
  bootstrap: [AppComponent]
})
export class AppModule { }
