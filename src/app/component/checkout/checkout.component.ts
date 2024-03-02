import { Component, OnInit, Renderer2, untracked } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageConstants } from 'src/app/constant/message-constants';
import { ApiResponse } from 'src/app/model/api-response';
import { Appointment } from 'src/app/model/appointment';
import { User } from 'src/app/model/user';
import { UserInfo } from 'src/app/model/user-info';
import { StorageService } from 'src/app/service/storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  message: any;
  statusFlag: boolean = false;
  currentUserInfo: UserInfo = new UserInfo;
  currentUser: User = new User;
  appointment: Appointment = new Appointment;
  termsAndConditionsFlag: Boolean = false;
  constructor(private route: ActivatedRoute, private router: Router, private storageService: StorageService,
    private userService: UserService, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.currentUserInfo = this.storageService.getUser();
    this.currentUserInfo.token = this.storageService.getToken();
    this.getUserData();
  }
  getUserData() {
    this.userService.getUser(this.currentUserInfo).subscribe((data: User) => {
      this.currentUser = data;
    });
    if (this.currentUser.firstName == "" || this.currentUser.firstName == undefined) {
      this.appointment.user = new User;
    } else {
      this.appointment.user = this.currentUser;
    }
  }
  validateAppointmentDetails(): boolean {
    if (this.appointment.user.firstName == "" || this.appointment.user.firstName == undefined) {
      alert('Please Enter First Name');
      const element = this.renderer.selectRootElement('#firstName');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (!this.validateName(this.appointment.user.firstName)) {
      return false;
    } else if (this.appointment.user.lastName == "" || this.appointment.user.lastName == undefined) {
      alert('Please Enter Last Name');
      const element = this.renderer.selectRootElement('#lastName');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (!this.validateName(this.appointment.user.lastName)) {
      return false;
    } else if (this.appointment.user.email == "" || this.appointment.user.email == undefined) {
      alert('Please Enter Email');
      const element = this.renderer.selectRootElement('#email');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (!this.validateMail(this.appointment.user.email)) {
      return false;
    } else if (this.appointment.user.phoneNumber == "" || this.appointment.user.phoneNumber == undefined) {
      alert('Please Enter Phone Number');
      const element = this.renderer.selectRootElement('#phoneNumber');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (!this.validatePhoneNumber(this.appointment.user.phoneNumber)) {
      return false;
    } else if (this.appointment.paymentMethod == "" || this.appointment.paymentMethod == undefined) {
      alert('Please Check the paymentMethod');
      const element = this.renderer.selectRootElement('#cardName');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.appointment.termsAndConditions == "" || this.appointment.termsAndConditions == "N" || this.appointment.termsAndConditions == undefined) {
      alert('Please Accept Terms & Conditions');
      const element = this.renderer.selectRootElement('#termsAndConditions');
      setTimeout(() => element.focus(), 0);
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
  changeTermsAndConditions() {
    this.termsAndConditionsFlag = !this.termsAndConditionsFlag;
    if (this.termsAndConditionsFlag) {
      this.appointment.termsAndConditions = 'Y';
    } else {
      this.appointment.termsAndConditions = 'N';
    }
  }

  onSubmit() {
    if (this.validateAppointmentDetails()) {
      this.userService.saveAppointment(this.appointment, this.currentUserInfo.token).subscribe((data: ApiResponse) => {
        this.message = data.message;
        if (this.message == MessageConstants.AppointmentMessage) {
          this.statusFlag = true;
          this.appointment = new Appointment;
          this.router.navigate(['/bookingSuccess']);
        }
      });
    }
  }

}
