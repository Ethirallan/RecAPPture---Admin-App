import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    if (sessionStorage.getItem('token') === null) {
      this.router.navigate(['/login']);
    } else {
      return true;
    }
  }
  
}
