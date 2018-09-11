import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AUTH } from './authentication-mock';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  login(): Observable<any> {
    return of(AUTH);
  }
}
