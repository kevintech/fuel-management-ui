import { Injectable } from "@angular/core"
import { AngularFireAuth } from 'angularfire2/auth'
import * as firebase from 'firebase/app'

@Injectable()
export class AuthenticationService {

  constructor(
    public afAuth: AngularFireAuth
  ) { }

  login(request) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(request.email, request.password)
        .then(res => {
          resolve(res)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  logout() {
    return new Promise((resolve, reject) => {
      if (firebase.auth().currentUser) {
        this.afAuth.auth.signOut()
        resolve()
      } else {
        reject()
      }
    })
  }
}
