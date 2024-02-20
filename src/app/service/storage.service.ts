import { Injectable } from '@angular/core';
import { AppConstants } from '../constant/app-constants';
import { User } from '../model/user';
import { UserInfo } from '../model/user-info';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  
  constructor() { }
  
  clean(): void {
    window.sessionStorage.clear();
  }

  public saveUser(user: User): void {
    window.sessionStorage.removeItem(AppConstants.USER_KEY);
    window.sessionStorage.setItem(AppConstants.USER_KEY, JSON.stringify(user));
  }

  public saveUserInfo(userInfo: UserInfo): void {
    window.sessionStorage.removeItem(AppConstants.USER_KEY);
    window.sessionStorage.setItem(AppConstants.USER_KEY, JSON.stringify(userInfo));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(AppConstants.USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }
  
  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(AppConstants.USER_KEY);
    if (user) {
      return true;
    }
    return false;
  }
  public saveToken(token: string): void {
    window.sessionStorage.removeItem(AppConstants.TOKEN_KEY);
    window.sessionStorage.setItem(AppConstants.TOKEN_KEY, token);
  }

  public getToken(): any {
    return sessionStorage.getItem(AppConstants.TOKEN_KEY);
  }
}
