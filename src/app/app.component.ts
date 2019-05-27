import { Component, Optional } from '@angular/core';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import {animate, state, style, transition, trigger} from '@angular/animations';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({transform: 'rotate(0deg)'})),
      state('expanded', style({transform: 'rotate(180deg)'})),
      transition('expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ])
  ]
})
export class AppComponent {
  isDarkTheme = false;
  lastDialogResult: string;
  mode: string;
  value: number;
  expanded=false;
  
}

