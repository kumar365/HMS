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
  public savePatientUser(user: User): void {
    window.sessionStorage.removeItem(AppConstants.USER_KEY_PATIENT);
    window.sessionStorage.setItem(AppConstants.USER_KEY_PATIENT, JSON.stringify(user));
  }
  public saveDoctorUser(user: User): void {
    window.sessionStorage.removeItem(AppConstants.USER_KEY_DOCTOR);
    window.sessionStorage.setItem(AppConstants.USER_KEY_DOCTOR, JSON.stringify(user));
  }
  public saveUserInfo(userInfo: UserInfo): void {
    window.sessionStorage.removeItem(AppConstants.USER_KEY);
    window.sessionStorage.setItem(AppConstants.USER_KEY, JSON.stringify(userInfo));
  }
  public savePatientUserInfo(userInfo: UserInfo): void {
    window.sessionStorage.removeItem(AppConstants.USER_KEY_PATIENT);
    window.sessionStorage.setItem(AppConstants.USER_KEY_PATIENT, JSON.stringify(userInfo));
  }
  public saveDoctorUserInfo(userInfo: UserInfo): void {
    window.sessionStorage.removeItem(AppConstants.USER_KEY_DOCTOR);
    window.sessionStorage.setItem(AppConstants.USER_KEY_DOCTOR, JSON.stringify(userInfo));
  }
  public getUser(): any {
    const user = window.sessionStorage.getItem(AppConstants.USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }

  public getPatientUser(): any {
    const user = window.sessionStorage.getItem(AppConstants.USER_KEY_PATIENT);
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }
  public getDoctorUser(): any {
    const user = window.sessionStorage.getItem(AppConstants.USER_KEY_DOCTOR);
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
  public isPatientLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(AppConstants.USER_KEY_PATIENT);
    if (user) {
      return true;
    }
    return false;
  }
  public isDoctorLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(AppConstants.USER_KEY_DOCTOR);
    if (user) {
      return true;
    }
    return false;
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(AppConstants.TOKEN_KEY);
    window.sessionStorage.setItem(AppConstants.TOKEN_KEY, token);
  }
  public savePatientToken(token: string): void {
    window.sessionStorage.removeItem(AppConstants.TOKEN_KEY_PATIENT);
    window.sessionStorage.setItem(AppConstants.TOKEN_KEY_PATIENT, token);
  }

  public saveDoctorToken(token: string): void {
    window.sessionStorage.removeItem(AppConstants.TOKEN_KEY_DOCTOR);
    window.sessionStorage.setItem(AppConstants.TOKEN_KEY_DOCTOR, token);
  }
  public getToken(): any {
    return sessionStorage.getItem(AppConstants.TOKEN_KEY);
  }
  public getPatientToken(): any {
    return sessionStorage.getItem(AppConstants.TOKEN_KEY_PATIENT);
  }
  public getDoctorToken(): any {
    return sessionStorage.getItem(AppConstants.TOKEN_KEY_DOCTOR);
  }
}
