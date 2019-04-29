import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<any>;
  apiUrl = 'http://88.200.63.178:3000';
  error: boolean = false;

  constructor(
      private afAuth: AngularFireAuth,
      private router: Router,
      private http: HttpClient
  ) { 
    this.user$ = this.afAuth.authState;
  }

  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    console.log(credential);
    
    var body = {
      'access_token': credential.credential['accessToken']
    }
    this.http.post(this.apiUrl + '/auth/google', body).subscribe(res => {
      this.error = false;
      sessionStorage.setItem('token', JSON.stringify(res['message'][0]['value']));
      console.log(res['message'][0]['value']);
      this.router.navigate(['/orders']);
    }, error => this.error = true);
  }

  isAdminHere(): boolean {
    if (sessionStorage.getItem('token') === null) {
      console.log('is null');
      return false;
    }
    console.log('is not null');
    return true;
  }
  
  async signOut() {
    await this.afAuth.auth.signOut();
    sessionStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
