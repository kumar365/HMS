import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppValidations } from 'src/app/constant/app-validations';
import { ApiResponse } from 'src/app/model/api-response';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  message: any;
  statusFlag: boolean = false;
  user: User = new User;
  token: any;
  redirectUrl: any;
  constructor(private authService: AuthService, private activatedRoute: ActivatedRoute,
    private renderer: Renderer2) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      console.log(params);
      this.token = params['token'];
      if (this.token != undefined) {
        this.getUserData();
      }
    });
  }

  getUserData() {
    this.authService.getUserData(this.token).subscribe((data: User) => {
      this.user = data;
    });
  }

  validateResetPasswordData(): boolean {
    if (this.user.email == "" || this.user.email == undefined) {
      alert('Please eneter Email');
      const element = this.renderer.selectRootElement('#email');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (!AppValidations.validateMail(this.user.email)) {
      const element = this.renderer.selectRootElement('#email');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.user.newPassword == "" || this.user.newPassword == undefined) {
      alert('Please eneter New Password');
      const element = this.renderer.selectRootElement('#newPassword');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (!AppValidations.validatePassword(this.user.newPassword)) {
      const element = this.renderer.selectRootElement('#newPassword');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.user.confirmPassword == "" || this.user.confirmPassword == undefined) {
      alert('Please eneter Confirm Password');
      const element = this.renderer.selectRootElement('#confirmPassword');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.user.newPassword != this.user.confirmPassword) {
      alert('New Password and Confirm Password should be same');
      const element = this.renderer.selectRootElement('#confirmPassword');
      setTimeout(() => element.focus(), 0);
      return false;
    } else {
      return true;
    }
  }
  onSubmit() {
    if (this.validateResetPasswordData()) {
      this.authService.resetPassword(this.user.token, this.user.newPassword).subscribe((data: ApiResponse) => {
        this.message = data.message;
        if (data.success) {
          this.statusFlag = true;
          // window.location.href = this.redirectUrl;
          this.user = new User;
        }
      });
    }
  }
}
