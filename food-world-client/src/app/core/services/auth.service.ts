import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { LoginUser } from '../models/login-user';
import { RegisterUser } from '../models/register-user';

const BASE_URL = 'http://localhost:5000/auth/';
const LOGIN_END_URL = 'login';
const REGISTER_END_URL = 'register';

@Injectable( {
  providedIn: 'root'
} )
export class AuthService {

  constructor (
    private http: HttpClient
  ) { }


  get token() {
    return localStorage.getItem( 'token' );
  }

  get username() {
    return localStorage.getItem( 'username' );
  }

  get userId() {
    return localStorage.getItem( 'userId' );
  }

  register( body: RegisterUser ) {
    return this.http.post( BASE_URL + REGISTER_END_URL, body );
  }

  login( body: LoginUser ) {
    return this.http.post( BASE_URL + LOGIN_END_URL, body );
  }

  isAuthenticated() {
    return this.token !== null;
  }
  isAdmin() {
    return localStorage.getItem( 'isAdmin' ) === "true";
  }

  isAuthor( creatorId ) {
    return this.userId === creatorId;
  }

  saveUserInfo( res: Object ) {
    localStorage.setItem( 'username', res[ 'user' ][ 'username' ] );
    localStorage.setItem( 'token', res[ 'token' ] );
    localStorage.setItem( 'userId', res[ 'user' ][ 'userId' ] );
    localStorage.setItem( 'isAdmin', res[ 'user' ][ 'isAdmin' ] );
  }

  logout() {
    localStorage.clear();
  }
}
