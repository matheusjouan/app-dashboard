import { Component, OnInit, Input } from '@angular/core';
import { BreadcrumbItem } from '../../interfaces/breadcrumb-item';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {

  @Input() items: BreadcrumbItem[] = [];

  constructor() { }

  ngOnInit() {
  }

  public isTheLastItem(item: BreadcrumbItem): boolean {
    const index = this.items.indexOf(item);
    return (index + 1) === this.items.length;
  }
}
