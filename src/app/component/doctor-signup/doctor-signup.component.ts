import { Component, OnInit } from '@angular/core';
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
  history!: History;
  constructor(private authService: AuthService) { }

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
      return false;
    } else if (!this.validateName()) {
      return false;
    } else if (this.user.email == "" || this.user.email == undefined) {
      alert('Please eneter Email');
      return false;
    } else if (!this.validateMail()) {
      return false;
    } else if (this.user.phoneNumber == "" || this.user.phoneNumber == undefined) {
      alert('Please eneter Phone Number');
      return false;
    } else if (!this.validatePhoneNumber()) {
      return false;
    } else if (this.user.password == "" || this.user.password == undefined) {
      alert('Please eneter Password');
      return false;
    } else if (!this.checkPasswordValidity()) {
      //alert('Please eneter valid Password');
      return false;
    } else {
      return true;
    }

  }

  validateName(): boolean {
    var nameRegex = /^[A-Za-z ]{3,16}$/;
    if (nameRegex.test(this.user.displayName)) {
      return true;
    } else {
      alert("Your name is not valid. Only characters A-Z and a-z are acceptable of length 3 to 16.");
      return false;
    }
  }
  validateMail(): boolean {
    var mailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if (mailRegex.test(this.user.email)) {
      return true;
    } else {
      alert("Your mail is not valid.");
      return false;
    }
  }
  validatePhoneNumber(): boolean {
    var phoneNumber = /^[6-9]{1}[0-9]{9}$/;
    if (phoneNumber.test(this.user.phoneNumber)) {
      return true;
    } else {
      alert("Your Phone Numaber is not valid.");
      return false;
    }
  }
  checkPasswordValidity(): boolean {
    var validateFlag = false;
    var value = this.user.password;
    const isNonWhiteSpace = /^\S*$/;
    if (!isNonWhiteSpace.test(value)) {
      alert("Password must not contain Whitespaces.");
      return validateFlag;
    }
    const isContainsUppercase = /^(?=.*[A-Z]).*$/;
    if (!isContainsUppercase.test(value)) {
      alert("Password must have at least one Uppercase Character.");
      return validateFlag;
    }
    const isContainsLowercase = /^(?=.*[a-z]).*$/;
    if (!isContainsLowercase.test(value)) {
      alert("Password must have at least one Lowercase Character.");
      return validateFlag;
    }
    const isContainsNumber = /^(?=.*[0-9]).*$/;
    if (!isContainsNumber.test(value)) {
      alert("Password must contain at least one Digit.");
      return validateFlag;
    }
    const isContainsSymbol =
      /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/;
    if (!isContainsSymbol.test(value)) {
      alert("Password must contain at least one Special Symbol.");
      return validateFlag;
    }
    const isValidLength = /^.{10,16}$/;
    if (!isValidLength.test(value)) {
      alert("Password must be 10-16 Characters Long.");
      return validateFlag;
    }
    validateFlag = true;
    return validateFlag;
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


