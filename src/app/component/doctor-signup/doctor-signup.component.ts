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
  constructor(private authService: AuthService) { }
  ngOnInit(): void {

  }
  toggleShow() {
    this.showPassword = !this.showPassword;
  }
  toggleDiv(id: string) {
    if (id == 'N') {
      if (this.user.displayName == "" || this.user.displayName == undefined) {
        alert('Please eneter Name');
      } else if (this.user.email == "" || this.user.email == undefined) {
        alert('Please eneter Email');
      } else if (this.user.phoneNumber == "" || this.user.phoneNumber == undefined) {
        alert('Please eneter Phone Number');
      } else if (this.user.password == "" || this.user.password == undefined) {
        alert('Please eneter Password');
      } else {
        this.showDiv = !this.showDiv;
      }
    } else {
      this.showDiv = !this.showDiv;
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
  onSubmit() {
    this.authService.registerDoctor(this.user).subscribe((data: ApiResponse) => {
      this.message = data.message;
      if (this.message == MessageConstants.RegisterDoctorMessage) {
        this.messageFlag = true;
        this.user = new User;
      }
    });
  }
}
