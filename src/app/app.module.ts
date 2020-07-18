import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PersonsListComponent } from './components/persons-list/persons-list.component';

import {TableModule} from 'primeng/table';
import { PersonComponent } from './components/person/person.component';
import { AppRoutingModule } from './app-routing.module';
import { MainComponent } from './components/main/main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RutValidator } from './validators/rut-validator';
import { RutUtils } from './utils/rut.utils';
import {TranslateModule} from '@ngx-translate/core';

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
    TranslateModule.forRoot()
  ],
  providers: [RutValidator, RutUtils
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
