import { Component, OnInit } from '@angular/core';
import {SysMgrService} from '../services/sys-mgr.service';
import { AlertService, AuthenticationService } from '../services';
import {first} from 'rxjs/operators';
import {User} from '../models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User;
  error: string;
  constructor(private authenticationService:AuthenticationService) { }

  ngOnInit() {
    this.authenticationService.getProfile()
  .subscribe(
      (data:User) => {
          this.user=data;
      },
      error => {
          this.error = error // error path
      });
  }

 
  
}
