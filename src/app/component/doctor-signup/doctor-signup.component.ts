import { Component, OnInit, Renderer2 } from '@angular/core';
import { AppValidations } from 'src/app/constant/app-validations';
import { MessageConstants } from 'src/app/constant/message-constants';
import { ApiResponse } from 'src/app/model/api-response';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/service/auth.service';



@Component({
  selector: 'app-doctor-signup',
  templateUrl: './doctor-signup.component.html',
  styleUrls: ['./doctor-signup.component.css']
})
export class DoctorSignupComponent implements OnInit {
  message: any;
  messageFlag: boolean = false;
  user: User = new User;
  showPassword = true;
  showDiv = true;
  termsAndConditionsFlag: Boolean = false;
  constructor(private authService: AuthService, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.user = new User;
  }
  toggleShow() {
    this.showPassword = !this.showPassword;
  }
  toggleDiv(id: string) {
    if (id == 'N') {
      if (this.validateUser()) {
        this.showDiv = !this.showDiv;
      }
    } else {
      this.showDiv = !this.showDiv;
    }
  }
  validateUser(): boolean {
    if (this.user.displayName == "" || this.user.displayName == undefined) {
      alert('Please eneter Name');
      const element = this.renderer.selectRootElement('#displayName');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (!AppValidations.validateName(this.user.displayName)) {
      const element = this.renderer.selectRootElement('#displayName');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.user.email == "" || this.user.email == undefined) {
      alert('Please eneter Email');
      const element = this.renderer.selectRootElement('#email');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (!AppValidations.validateMail(this.user.email)) {
      const element = this.renderer.selectRootElement('#email');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.user.phoneNumber == "" || this.user.phoneNumber == undefined) {
      alert('Please eneter Phone Number');
      const element = this.renderer.selectRootElement('#phoneNumber');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (!AppValidations.validatePhoneNumber(this.user.phoneNumber)) {
      const element = this.renderer.selectRootElement('#phoneNumber');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.user.password == "" || this.user.password == undefined) {
      alert('Please eneter Password');
      const element = this.renderer.selectRootElement('#password');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (!AppValidations.checkPasswordValidity(this.user.password)) {
      const element = this.renderer.selectRootElement('#password');
      setTimeout(() => element.focus(), 0);
      return false;
    } else {
      return true;
    }
  }





  getPhoneNumberVerificationCode() {
    this.authService.sendPhoneNumberVerificationCode(this.user.phoneNumber).subscribe((data: ApiResponse) => {
      this.message = data.message;
      if (this.message == MessageConstants.SendPhoneNumberVerificationCodeMessage) {
      }
    });
  }
  getEmailVerificationCode() {
    alert('getEmailVerificationCode');
    this.authService.sendEmailVerificationCode(this.user.email).subscribe((data: ApiResponse) => {
      this.message = data.message;
      if (this.message == MessageConstants.SendEmailVerificationCodeMessage) {
      }
    });
  }
  changeTermsAndConditions() {
    this.termsAndConditionsFlag = !this.termsAndConditionsFlag;
    if (this.termsAndConditionsFlag) {
      this.user.termsAndConditions = 'Y';
    } else {
      this.user.termsAndConditions = 'N';
    }
  }
  onSubmit() {
    if (this.validateUser()) {
      this.authService.registerDoctor(this.user).subscribe((data: ApiResponse) => {
        this.message = data.message;
        if (this.message == MessageConstants.RegisterDoctorMessage) {
          this.messageFlag = true;
          this.user = new User;
        }
      });
    }
  }

}


