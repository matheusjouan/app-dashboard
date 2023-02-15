import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntryRoutingModule } from './entry-routing.module';
import { EntryListComponent } from './entry-list/entry-list.component';
import { EntryFormComponent } from './entry-form/entry-form.component';

import { CalendarModule } from 'primeng/calendar';
import { IMaskModule } from 'angular-imask'


@NgModule({
  declarations: [
    EntryListComponent,
    EntryFormComponent
  ],
  imports: [
    CommonModule,
    EntryRoutingModule,
    ReactiveFormsModule,
    CalendarModule,
    IMaskModule
  ]
})
export class EntryModule { }
