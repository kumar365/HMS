import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstants } from '../constant/app-constants';
import { User } from '../model/user';
import { Observable } from 'rxjs';
import { OtpRequest } from '../model/otp-request';
import { Ambulance } from '../model/ambulance';
import { ApiResponse } from '../model/api-response';
import { ResetPasswordRequest } from '../model/reset-password-request';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private user: User = new User;
  private otpRequest: OtpRequest = new OtpRequest;
  private resetPasswordRequest: ResetPasswordRequest = new ResetPasswordRequest;
  constructor(private http: HttpClient) {
  }

  checkUser(userName: string, password: string): Observable<boolean> {
    console.log(userName);
    console.log(password);
    this.user.username = userName;
    this.user.password = password;
    //localStorage.setItem('isUserLoggedIn', AppConstants.isUserLoggedIn ? "true" : "false");
    return this.http.post<boolean>(AppConstants.API_BASE_URL + AppConstants.CheckUser, this.user);
  }

  logout(): void {
    AppConstants.IsUserLoggedIn = false;
    localStorage.removeItem('isUserLoggedIn');
    localStorage.setItem('isUserLoggedIn', AppConstants.IsUserLoggedIn ? "true" : "false");
  }

  loginSocial(credentials: any): Observable<any> {
    return this.http.post(AppConstants.SIGNIN, {
      email: credentials.username,
      password: credentials.password
    }, httpOptions);
  }

  login(username: string, password: string): Observable<User> {
    this.user.username = username;
    this.user.password = password;
    return this.http.post<User>(AppConstants.SIGNIN, this.user, httpOptions);
  }

  register(username: string, phoneNumber: string, email: string, password: string): Observable<any> {
    this.user.username = username;
    this.user.phoneNumber = phoneNumber;
    this.user.email = email;
    this.user.password = password;
    return this.http.post(AppConstants.SIGNUP, this.user, httpOptions);
  }
  registerPatient(user: User): Observable<any> {
    this.user.displayName = user.displayName;
    this.user.username = user.username;
    this.user.phoneNumber = user.phoneNumber;
    this.user.email = user.email;
    this.user.password = user.password;
    return this.http.post(AppConstants.SIGNUP_PATIENT, this.user, httpOptions);
  }

  registerDoctor(user: User): Observable<any> {
    this.user.displayName = user.displayName;
    this.user.username = user.username;
    this.user.phoneNumber = user.phoneNumber;
    this.user.email = user.email;
    this.user.password = user.password;
    return this.http.post(AppConstants.SIGNUP_DOCTOR, this.user, httpOptions);
  }

  public registerAmbulance(ambulance: Ambulance): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(AppConstants.SIGNUP_AMBULANCE, ambulance, httpOptions);
  }

  public loginAmbulance(ambulance: Ambulance): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(AppConstants.SIGNIN_AMBULANCE, ambulance, httpOptions);
  }

  signout(): Observable<any> {
    return this.http.post(AppConstants.SIGNOUT, {}, httpOptions);
  }

  registerSocial(user: any): Observable<any> {
    return this.http.post(AppConstants.SIGNUP, {
      displayName: user.displayName,
      email: user.email,
      password: user.password,
      matchingPassword: user.matchingPassword,
      socialProvider: 'LOCAL'
    }, httpOptions);
  }

  sendPhoneNumberVerificationCode(phoneNumber: string): Observable<any> {
    this.otpRequest.phoneNumber = phoneNumber;
    return this.http.post(AppConstants.SEND_PHONE_NUMBER_VERIFICATION_CODE, this.otpRequest, httpOptions);
  }

  sendEmailVerificationCode(email: string): Observable<any> {
    this.otpRequest.email = email;
    return this.http.post(AppConstants.SEND_EMAIL_VERIFICATION_CODE, this.otpRequest, httpOptions);
  }

  forgotPassword(email: string): Observable<ApiResponse> {
    this.otpRequest.email = email;
    return this.http.post<ApiResponse>(AppConstants.FORGOT_PASSWORD, this.otpRequest, httpOptions);
  }

  resetPassword(token: string, password: string): Observable<ApiResponse> {
    this.resetPasswordRequest.token = token;
    this.resetPasswordRequest.password = password;
    return this.http.post<ApiResponse>(AppConstants.RESET_PASSWORD, this.resetPasswordRequest, httpOptions);
  }

  getUserData(token: any) : Observable<User> {
    return this.http.get<User>(AppConstants.GET_USER_DATA_BY_TOKEN + token, httpOptions);
  }

}
