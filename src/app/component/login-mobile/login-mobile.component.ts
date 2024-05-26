import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { AppValidations } from 'src/app/constant/app-validations';
import { User } from 'src/app/model/user';
import { UserInfo } from 'src/app/model/user-info';
import { AuthService } from 'src/app/service/auth.service';
import { StorageService } from 'src/app/service/storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login-mobile',
  templateUrl: './login-mobile.component.html',
  styleUrls: ['./login-mobile.component.css']
})
export class LoginMobileComponent implements OnInit {

  form: any = {};
  isLoggedIn: boolean = false;
  isLoginFailed: boolean = false;
  errorMessage = '';
  currentUserInfo: UserInfo = new UserInfo;
  currentUser: User = new User;
  showPassword: boolean = true;
  constructor(private authService: AuthService, private storageService: StorageService,
    private userService: UserService, private router: Router, private renderer: Renderer2) { }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = false;
      this.currentUserInfo = this.storageService.getUser();
    }
    if (this.storageService.isPatientLoggedIn()) {
      this.isLoggedIn = false;
      this.currentUserInfo = this.storageService.getPatientUser();
    }
    if (this.storageService.isDoctorLoggedIn()) {
      this.isLoggedIn = false;
      this.currentUserInfo = this.storageService.getDoctorUser();
    }
  }
  toggleShow() {
    this.showPassword = !this.showPassword;
  }
  validateLoginForm(): boolean {
    if (this.form.phoneNumber == "" || this.form.phoneNumber == undefined) {
      alert('Please Enter Phone Number');
      const element = this.renderer.selectRootElement('#phoneNumber');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (!AppValidations.validatePhoneNumber(this.form.phoneNumber)) {
      const element = this.renderer.selectRootElement('#phoneNumber');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.form.password == "" || this.form.password == undefined) {
      alert('Please Enter password');
      const element = this.renderer.selectRootElement('#password');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (!AppValidations.validatePassword(this.form.password)) {
      const element = this.renderer.selectRootElement('#password');
      setTimeout(() => element.focus(), 0);
      return false;
    } else {
      return true;
    }
  }
  onSubmit(): void {
    if (this.validateLoginForm()) {
      this.authService.loginMobile(this.form).subscribe(
        data => {
          if (data.user != null) {
            this.storageService.saveUserInfo(data.user);
            this.storageService.saveToken(data.accessToken);
            this.getUserData();
            if (data.accessToken && this.currentUser.userType == 'patient') {
              this.storageService.savePatientUserInfo(data.user);
              this.storageService.savePatientToken(data.accessToken);
              this.getPatientUserData();
              this.router.navigate(['/patientDashboard']);
            } else if (data.accessToken && this.currentUser.userType == 'doctor') {
              this.storageService.saveDoctorUserInfo(data.user);
              this.storageService.saveDoctorToken(data.accessToken);
              this.getDoctorUserData();
              this.router.navigate(['/doctorDashboard']);
            } else if (data.accessToken && this.currentUser.userType == 'admin') {
              this.storageService.saveDoctorUserInfo(data.user);
              this.storageService.saveDoctorToken(data.accessToken);
              this.getDoctorUserData();
              this.router.navigate(['/adminDashboard']);
            }
          }
        },
        err => {
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
        }
      );
    }
  }
  getUserData() {
    this.currentUserInfo = this.storageService.getUser();
    if (this.currentUserInfo != null) {
      this.currentUserInfo.token = this.storageService.getToken();
      this.userService.getUser(this.currentUserInfo).subscribe((data: User) => {
        this.currentUser = data;
      });
    }
  }
  getPatientUserData() {
    this.currentUserInfo = this.storageService.getPatientUser();
    if (this.currentUserInfo != null) {
      this.currentUserInfo.token = this.storageService.getPatientToken();
      this.userService.getUser(this.currentUserInfo).subscribe((data: User) => {
        this.currentUser = data;
      });
    }
  }

  getDoctorUserData() {
    this.currentUserInfo = this.storageService.getDoctorUser();
    if (this.currentUserInfo != null) {
      this.currentUserInfo.token = this.storageService.getDoctorToken();
      this.userService.getUser(this.currentUserInfo).subscribe((data: User) => {
        this.currentUser = data;
      });
    }
  }
}
