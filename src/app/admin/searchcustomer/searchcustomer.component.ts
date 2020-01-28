import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-searchcustomer',
  templateUrl: './searchcustomer.component.html',
  styleUrls: ['./searchcustomer.component.scss']
})
export class SearchcustomerComponent implements OnInit {

  dateForm = new FormGroup({date: new FormControl()});

  constructor() { }

  ngOnInit() {
  }

}
