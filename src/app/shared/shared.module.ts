import { RouterModule } from '@angular/router';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { FormFieldErrorComponent } from './components/form-field-error/form-field-error.component';
import { ServerErrorMessageComponent } from './components/server-error-message/server-error-message.component'


@NgModule({
  declarations: [
    BreadcrumbComponent,
    PageHeaderComponent,
    FormFieldErrorComponent,
    ServerErrorMessageComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    BreadcrumbComponent,
    PageHeaderComponent,
    FormFieldErrorComponent,
    ServerErrorMessageComponent
  ]
})
export class SharedModule { }
