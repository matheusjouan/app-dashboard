import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

// Importa o módulo do HttpClient do AngularInMemory
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
// Importa a classe criada do DB do AngularInMemory
import { InMemoryDatabase } from './in-memory-database';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    // A partir desse momento as requisições irão bater AngularInMemory
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDatabase),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
