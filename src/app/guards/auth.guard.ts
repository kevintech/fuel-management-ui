import { Injectable } from '@angular/core'
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { AngularFireAuth } from 'angularfire2/auth'
import { UserService } from '../services/user/user.service'


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private afAuth: AngularFireAuth,
    private userService: UserService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise((resolve) => {
      this.userService.getCurrentUser()
        .then(user => {
          return resolve(true)
        })
        .catch(error => {
          this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } })
          return resolve(false)
        })
    })
  }
}
