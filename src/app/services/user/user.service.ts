import { Injectable } from "@angular/core"
import { AngularFirestore } from 'angularfire2/firestore'
import { AngularFireAuth } from 'angularfire2/auth'
import * as firebase from 'firebase/app'
import { User } from "../../models/user/user.model";

@Injectable()
export class UserService {

  constructor(
    public db: AngularFirestore,
    public afAuth: AngularFireAuth
  ) { }

  getCurrentUser(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          resolve(true)
        } else {
          reject(false)
        }
      })
    })
  }
}
