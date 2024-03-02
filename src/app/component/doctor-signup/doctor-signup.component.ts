import { Component, OnInit, Renderer2 } from '@angular/core';
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
    } else if (!this.validateName(this.user.displayName)) {
      return false;
    } else if (this.user.email == "" || this.user.email == undefined) {
      alert('Please eneter Email');
      const element = this.renderer.selectRootElement('#email');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (!this.validateMail(this.user.email)) {
      return false;
    } else if (this.user.phoneNumber == "" || this.user.phoneNumber == undefined) {
      alert('Please eneter Phone Number');
      const element = this.renderer.selectRootElement('#phoneNumber');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (!this.validatePhoneNumber(this.user.phoneNumber)) {
      return false;
    } else if (this.user.password == "" || this.user.password == undefined) {
      alert('Please eneter Password');
      const element = this.renderer.selectRootElement('#password');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (!this.checkPasswordValidity(this.user.password)) {
      //alert('Please eneter valid Password');
      return false;
    } else {
      return true;
    }
  }

  validateName(name: string): boolean {
    var nameRegex = /^[A-Za-z ]{3,16}$/;
    if (nameRegex.test(name)) {
      return true;
    } else {
      alert("Your name is not valid. Only characters A-Z and a-z are acceptable of length 3 to 16.");
      return false;
    }
  }
  validateMail(email: string): boolean {
    var mailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if (mailRegex.test(email)) {
      return true;
    } else {
      alert("Your mail is not valid.");
      return false;
    }
  }
  validatePhoneNumber(phoneNumber: string): boolean {
    var phoneNumberRegex = /^[6-9]{1}[0-9]{9}$/;
    if (phoneNumberRegex.test(phoneNumber)) {
      return true;
    } else {
      alert("Your Phone Numaber is not valid.");
      return false;
    }
  }
  checkPasswordValidity(password: string): boolean {
    const isNonWhiteSpace = /^\S*$/;
    if (!isNonWhiteSpace.test(password)) {
      alert("Password must not contain Whitespaces.");
      return false;
    }
    const isContainsUppercase = /^(?=.*[A-Z]).*$/;
    if (!isContainsUppercase.test(password)) {
      alert("Password must have at least one Uppercase Character.");
      return false;
    }
    const isContainsLowercase = /^(?=.*[a-z]).*$/;
    if (!isContainsLowercase.test(password)) {
      alert("Password must have at least one Lowercase Character.");
      return false;
    }
    const isContainsNumber = /^(?=.*[0-9]).*$/;
    if (!isContainsNumber.test(password)) {
      alert("Password must contain at least one Digit.");
      return false;
    }
    const isContainsSymbol =
      /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/;
    if (!isContainsSymbol.test(password)) {
      alert("Password must contain at least one Special Symbol.");
      return false;
    }
    const isValidLength = /^.{10,16}$/;
    if (!isValidLength.test(password)) {
      alert("Password must be 10-16 Characters Long.");
      return false;
    }
    return true;
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


