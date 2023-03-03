import { NgModule } from '@angular/core';
import { SharedModule } from './../../shared/shared.module';

import { ReportRoutingModule } from './report-routing.module';
import { ReportComponent } from './report/report.component';

import { ChartModule } from 'primeng/chart';


@NgModule({
  declarations: [
    ReportComponent
  ],
  imports: [
    SharedModule,
    ReportRoutingModule,
    ChartModule
  ]
})
export class ReportModule { }
