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

  ngOnInit() {
    this.checkIfLoggedIn();
  }

  checkIfLoggedIn() {
    if (this.auth.isAdminHere()) {
      this.router.navigate(['/orders']);
      return true;
    } else {
      return false;
    }
  }

}
