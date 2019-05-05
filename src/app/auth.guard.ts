import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  /**
   * Simple authentication guard, which is checking if there is a token in sessionStorage ~ if admin is logged in.
   * If not user cannot access and is redirected to login page
   */
  canActivate(): boolean {
    if (sessionStorage.getItem('token') === null) {
      this.router.navigate(['/prijava']);
    } else {
      return true;
    }
  }
  
}
