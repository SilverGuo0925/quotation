import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quotation',
  templateUrl: './quotation.component.html',
  styleUrls: ['./quotation.component.scss'],
  host: {'class': 'content-container'}
})
export class QuotationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
