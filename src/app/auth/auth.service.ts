import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';

export class User {
  uid: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
  ) {
    this.user = afAuth.authState;
  }

  emailPasswordLogin(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password).then((credential) => {
      return credential.user;
    }, error => console.log(error));
  }

  emailPasswordSignUp(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password).then((credential) => {
      return credential.user;
    }, error => {
      console.log(error)
    })
  }

  signOut() {
    return this.afAuth.auth.signOut();
  }

}
