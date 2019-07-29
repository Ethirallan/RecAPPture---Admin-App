import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = 'http://88.200.63.178:3001';
  error: boolean = false;

  constructor(
      private afAuth: AngularFireAuth,
      private router: Router,
      private http: HttpClient, 
      private toastr: ToastrService
  ) {}

  /**
   * It logins user with Google Auth popup in browser and save theirs accessToken.
   * Then it sends the token to the backend where it is checked.
   * If user is an admin, then it gets back another token, which is saved to sessionStorage and navigates to /nova ~ new orders.
   * If it returns and error, then we set the msg accordingly and set this.error to true -> it displays this.msg on the web page.
   */
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
        this.toastr.error('Uporabljeni Gmail račun nima administatorskih pravic!', 'Napaka');
      } else {
        this.toastr.error('Težave pri povezovanju s serverjem. Prosimo poskusite ponovno kasneje.', 'Opala ...');
      }
      this.error = true;
    });
  }

  // Checks if there is a token (admin logged in) in sessionStorage and returns boolean
  isAdminHere(): boolean {
    if (sessionStorage.getItem('token') === null) {
      return false;
    }
    return true;
  }
  
  // It signs out the user, remove his token from sessionStorage and navigates back to login page
  async signOut() {
    await this.afAuth.auth.signOut();
    sessionStorage.removeItem('token');
    this.router.navigate(['/prijava']);
  }
}
