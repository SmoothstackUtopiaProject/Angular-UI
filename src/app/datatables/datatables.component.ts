import {Component, HostListener, ViewChild} from '@angular/core';
import { MdbTableDirective, MdbTablePaginationComponent, MdbTableService } from 'ng-uikit-pro-standard';

@Component({
  selector: 'app-datatables',
  templateUrl: './datatables.component.html',
  styleUrls: ['./datatables.component.css']
})
export class DatatablesComponent {

  @ViewChild(MdbTableDirective, {static: true}) mdbTable!: MdbTableDirective;


  elements: any = [];
  headElements = ['id', 'first', 'last', 'handle'];

  constructor() { }

  ngOnInit() {
    for (let i = 1; i <= 15; i++) {
      this.elements.push({ id: i, first: 'User ' + i, last: 'Name ' + i, handle: 'Handle ' + i });
    }
  }
}
