import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.css']
})
export class ProfileUserComponent implements OnInit {

  userDetail: UserDetails;

  constructor(private auth: AuthenticationService) { }

  ngOnInit() {
    this.getCurrentUser();
  }

  private getCurrentUser(): void {
    this.userDetail = this.auth.getUserDetailDecodedToken();
  }

}
