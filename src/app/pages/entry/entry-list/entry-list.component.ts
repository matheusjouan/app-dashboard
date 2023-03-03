import { Component } from '@angular/core';

import { BaseItemListComponent } from 'src/app/shared/components/base-item-list/base-item-list.component';
import { EntryService } from '../shared/entry.service';
import { Entry } from '../shared/entry.model';
import { BreadcrumbItem } from 'src/app/shared/interfaces/breadcrumb-item';
import { ButtonProps } from 'src/app/shared/interfaces/button-props';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.scss']
})

export class EntryListComponent extends BaseItemListComponent<Entry> {

  breadcrumbList: BreadcrumbItem[] = [
    { text: 'Lançamentos' }
  ]

  pageHeaderButton: ButtonProps = {
    text: '+ Novo Lançamento',
    classType: 'btn-success',
    link: 'new'
  }

  constructor(private entryService: EntryService) {
    super(entryService);
  }
}
