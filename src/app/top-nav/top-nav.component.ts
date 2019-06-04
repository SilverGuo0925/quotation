import { Component, OnInit } from '@angular/core';
import {SysMgrService} from '../services/sys-mgr.service';
@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {

  constructor(private sysMgrService: SysMgrService) { }

  ngOnInit() {
  }

}
