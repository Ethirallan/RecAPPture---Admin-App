import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }
  
  // Checks if admin is logged in
  ngOnInit() {
    this.checkIfLoggedIn();
  }

  // Checks if admin is logged in and then navigating to /novo - new orders; else return false
  checkIfLoggedIn() {
    if (this.auth.isAdminHere()) {
      this.router.navigate(['/nova']);
      return true;
    } else {
      return false;
    }
  }

}
