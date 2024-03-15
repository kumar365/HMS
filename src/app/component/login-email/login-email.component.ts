import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstants } from 'src/app/constant/app-constants';
import { AppValidations } from 'src/app/constant/app-validations';
import { User } from 'src/app/model/user';
import { UserInfo } from 'src/app/model/user-info';
import { AuthService } from 'src/app/service/auth.service';
import { StorageService } from 'src/app/service/storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login-email',
  templateUrl: './login-email.component.html',
  styleUrls: ['./login-email.component.css']
})
export class LoginEmailComponent implements OnInit {

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  currentUserInfo: UserInfo = new UserInfo;
  currentUser: User = new User;
  googleURL = AppConstants.GOOGLE_AUTH_URL;
  facebookURL = AppConstants.FACEBOOK_AUTH_URL;
  githubURL = AppConstants.GITHUB_AUTH_URL;
  linkedinURL = AppConstants.LINKEDIN_AUTH_URL;

  constructor(private authService: AuthService, private storageService: StorageService,
    private userService: UserService, private router: Router, private renderer: Renderer2) { }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = false;
      this.currentUserInfo = this.storageService.getUser();
    }
  }
  validateLoginForm(): boolean {
    alert('validateLoginForm');
    if (this.form.username == "" || this.form.username == undefined) {
      alert('Please Enter Email');
      const element = this.renderer.selectRootElement('#username');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (!AppValidations.validateMail(this.form.username)) {
      const element = this.renderer.selectRootElement('#username');
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
      this.authService.loginSocial(this.form).subscribe(
        data => {
          console.log('data.accessToken::', data.accessToken);
          console.log('data.user::', data.user);
          this.storageService.saveUserInfo(data.user);
          this.storageService.saveToken(data.accessToken);
          this.getUserData();
          if (data.accessToken && this.currentUser.userType == 'patient') {
            this.router.navigate(['/patientDashboard']);
          } else if (data.accessToken && this.currentUser.userType == 'doctor') {
            this.router.navigate(['/doctorDashboard']);
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
    this.currentUserInfo.token = this.storageService.getToken();
    this.userService.getUser(this.currentUserInfo).subscribe((data: User) => {
      this.currentUser = data;
    });
  }

  login(user: User): void {
    this.storageService.saveUser(user);
    this.isLoginFailed = false;
    this.isLoggedIn = true;
    this.currentUser = this.storageService.getUser();
    window.location.reload();
  }

}