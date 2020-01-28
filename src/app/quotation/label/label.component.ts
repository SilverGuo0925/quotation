import { Component, OnInit } from '@angular/core';
import {Config,SysMgrService} from '../../services/sys-mgr.service';
import {saveAs } from "file-saver";


@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss'],
  host: {'class': 'content-area'}
})
export class LabelComponent implements OnInit {

  error: any;
  headers: string[];
  config: Config;
  fileName: string;
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

  exportExcelFile() {
    this.fileName='sample.xlsx';
    this.sysMgr.downloadFile()
      .subscribe(
        (blob) => saveAs(blob,this.fileName), // success path
        error => this.error = error // error path
      );
  }
 
}
