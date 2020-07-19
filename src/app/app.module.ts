import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PersonsListComponent } from './components/persons-list/persons-list.component';

import { TableModule } from 'primeng/table';
import { PersonComponent } from './components/person/person.component';
import { AppRoutingModule } from './app-routing.module';
import { MainComponent } from './components/main/main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RutValidator } from './validators/rut-validator';
import { RutUtils } from './utils/rut.utils';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiModule } from './api/api.module';
import { BASE_PATH } from './api';
import { environment } from 'src/environments/environment';
import { MessageModule } from 'primeng/message';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SpinnerInterceptor } from './interceptors/spinner.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    PersonsListComponent,
    PersonComponent,
    MainComponent,
  ],
  imports: [
    BrowserModule,
    TableModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    ApiModule,
    MessageModule,
    BrowserAnimationsModule,
    ConfirmDialogModule,
    ToastModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }}),
  ],
  providers: [
    RutUtils,
    RutValidator,
    ConfirmationService,
    { provide: BASE_PATH, useValue: environment.apiUrl },
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
