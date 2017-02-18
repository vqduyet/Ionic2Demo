import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Generated class for entity User
 */
export class User {
  name: string;
  email: string;

  constructor(name: string, email: string){
    this.name = name;
    this.email = email;
  }
}

/*
  Generated class for the AuthService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthService {
  currentUser: User;

  public login(credentials){
    if(credentials.email === null || credentials.password === null){
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        // hardcode for example; in reality, connect to backend to check authentication
        let access = (credentials.email === "email" && credentials.password === "pass");
        this.currentUser = new User('Quang Duyet','quangduyet@devdactic.com');
        observer.next(access);
        observer.complete();
      });
    }
  }

  public register(credentials){
    if(credentials.email === null || credentials.password === null){
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        // hardcode for example; in reality, make a POST request to backend to store new user     
        observer.next(true);
        observer.complete();
      });
    }
  }

  public getUserInfo(): User {
    return this.currentUser;
  }

  public logout(){
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }

}
