import { Component, OnInit } from '@angular/core';
import {Config,SysMgrService} from '../../services/sys-mgr.service';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class LabelComponent implements OnInit {

  error: any;
  headers: string[];
  config: Config;

  constructor(private sysMgr:SysMgrService) { }

  ngOnInit() {
   
  }

  showConfig() {
    this.sysMgr.getConfig()
      .subscribe(
        (data: Config) => this.config = { ...data }, // success path
        error => this.error = error // error path
      );
  }
  clear() {
    this.config = undefined;
    this.error = undefined;
  }

}
