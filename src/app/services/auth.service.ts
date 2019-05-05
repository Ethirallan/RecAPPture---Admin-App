import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = 'http://88.200.63.178:3001';
  error: boolean = false;
  msg: string;

  constructor(
      private afAuth: AngularFireAuth,
      private router: Router,
      private http: HttpClient
  ) { 
  }

  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    
    var body = {
      'access_token': credential.credential['accessToken']
    }
    this.http.post(this.apiUrl + '/auth/google', body).subscribe(res => {
      this.error = false;
      sessionStorage.setItem('token', JSON.stringify(res['message']));
      this.router.navigate(['/nova']);
    }, error => {
      if (error.statusText == 'Unauthorized') {
        this.msg = 'Uporabljeni Gmail račun nima administatorskih pravic!';
      } else {
        this.msg = 'Težave pri povezovanju s serverjem. Prosimo poskusite ponovno kasneje.';
      }
      this.error = true;
    });
  }

  isAdminHere(): boolean {
    if (sessionStorage.getItem('token') === null) {
      return false;
    }
    return true;
  }
  
  async signOut() {
    await this.afAuth.auth.signOut();
    sessionStorage.removeItem('token');
    this.router.navigate(['/prijava']);
  }
}
