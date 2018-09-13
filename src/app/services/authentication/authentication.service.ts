import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AUTH } from './authentication-mock';
import { User } from '../../models/user/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  login(): Observable<User> {
    return of(AUTH);
  }
}
