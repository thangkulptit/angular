import { Component, OnInit, Input } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})

export class NavMenuComponent implements OnInit {
  userDetail: UserDetails;
  constructor(public auth: AuthenticationService) { }

  ngOnInit() {
    this.getUserDetail();
  }
  
  private getUserDetail(): void {
    this.userDetail = this.auth.getUserDetailDecodedToken();
  }

  onClickLogout() {
    this.auth.logout();
  }
  

 

}
