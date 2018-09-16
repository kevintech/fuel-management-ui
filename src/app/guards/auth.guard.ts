import { Injectable } from '@angular/core'
import { CanActivate, ActivatedRouteSnapshot, Router } from "@angular/router"
import { AngularFireAuth } from 'angularfire2/auth'
import { UserService } from '../services/user/user.service'


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    public afAuth: AngularFireAuth,
    public userService: UserService,
    private router: Router
  ) { }

  canActivate(): Promise<boolean> {
    return new Promise((resolve) => {
      this.userService.getCurrentUser()
        .then(user => {
          console.log(user)
          this.router.navigate(['/home'])
          return resolve(false)
        })
        .catch(error => {
          return resolve(true)
        })
    })
  }
}
