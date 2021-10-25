import { Component, OnInit } from '@angular/core';
import Handsontable from 'handsontable';
@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  dataset: any[] = [
    { id: 1, name: 'Ted Right', address: 'Wall Street' },
    { id: 2, name: 'Frank Honest', address: 'Pennsylvania Avenue' },
    { id: 3, name: 'Joan Well', address: 'Broadway' },
    { id: 4, name: 'Gail Polite', address: 'Bourbon Street' },
    { id: 5, name: 'Michael Fair', address: 'Lombard Street' },
    { id: 6, name: 'Mia Fair', address: 'Rodeo Drive' },
    { id: 7, name: 'Cora Fair', address: 'Sunset Boulevard' },
    { id: 8, name: 'Jack Right', address: 'Michigan Avenue' }
  ];
  hotSettings: Handsontable.GridSettings = {
    data: this.dataset,
    colHeaders: true,
    stretchH: 'all',
    autoWrapRow: true,
    columnSorting: true,
    fillHandle: false,
    licenseKey: 'non-commercial-and-evaluation'
  };

  constructor() {
    // do nothing
  }

  ngOnInit(): void {
    // do nothing
  }
}
