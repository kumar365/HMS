import { Component, OnInit, Renderer2, untracked } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppValidations } from 'src/app/constant/app-validations';
import { MessageConstants } from 'src/app/constant/message-constants';
import { ApiResponse } from 'src/app/model/api-response';
import { Appointment } from 'src/app/model/appointment';
import { CardDetails } from 'src/app/model/card-details';
import { User } from 'src/app/model/user';
import { UserInfo } from 'src/app/model/user-info';
import { CommonService } from 'src/app/service/common.service';
import { StorageService } from 'src/app/service/storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  id: any;
  message: any;
  statusFlag: boolean = false;
  currentUserInfo: UserInfo = new UserInfo;
  currentUser: User = new User;
  doctor: User = new User;
  appointment: Appointment = new Appointment;
  termsAndConditionsFlag: Boolean = false;
  constructor(private router: Router, private storageService: StorageService, private commonService: CommonService,
    private userService: UserService, private renderer: Renderer2, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      console.log(params);
      this.id = params['id'];
      if (this.id != undefined) {
        this.getDoctorData();
      }
    });
    this.currentUserInfo = this.storageService.getUser();
    if (this.currentUserInfo != null) {
      this.currentUserInfo.token = this.storageService.getToken();
      this.getUserData();
    }
    this.appointment.cardDetails = new CardDetails;
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
  getDoctorData() {
    this.commonService.getDoctorById(this.id).subscribe((data: User) => {
      this.doctor = data;
    });
  }
  validateAppointmentDetails(): boolean {
    if (this.appointment.user.firstName == "" || this.appointment.user.firstName == undefined) {
      alert('Please Enter First Name');
      const element = this.renderer.selectRootElement('#firstName');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (!AppValidations.validateName(this.appointment.user.firstName)) {
      const element = this.renderer.selectRootElement('#firstName');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.appointment.user.lastName == "" || this.appointment.user.lastName == undefined) {
      alert('Please Enter Last Name');
      const element = this.renderer.selectRootElement('#lastName');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (!AppValidations.validateName(this.appointment.user.lastName)) {
      const element = this.renderer.selectRootElement('#lastName');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.appointment.user.email == "" || this.appointment.user.email == undefined) {
      alert('Please Enter Email');
      const element = this.renderer.selectRootElement('#email');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (!AppValidations.validateMail(this.appointment.user.email)) {
      const element = this.renderer.selectRootElement('#email');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.appointment.user.phoneNumber == "" || this.appointment.user.phoneNumber == undefined) {
      alert('Please Enter Phone Number');
      const element = this.renderer.selectRootElement('#phoneNumber');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (!AppValidations.validatePhoneNumber(this.appointment.user.phoneNumber)) {
      const element = this.renderer.selectRootElement('#phoneNumber');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.appointment.paymentMethod == "" || this.appointment.paymentMethod == undefined) {
      alert('Please Check the paymentMethod');
      const element = this.renderer.selectRootElement('#nameOnCard');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.appointment.paymentMethod == "Credit card" && !this.validateCardDetails()) {
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
  validateCardDetails(): boolean {
    if (this.appointment.paymentMethod == "Credit card") {
      if (this.appointment.cardDetails.nameOnCard == "" || this.appointment.cardDetails.nameOnCard == undefined) {
        alert('Please Enter Name on Card');
        const element = this.renderer.selectRootElement('#nameOnCard');
        setTimeout(() => element.focus(), 0);
        return false;
      } else if (!AppValidations.validateName(this.appointment.cardDetails.nameOnCard)) {
        const element = this.renderer.selectRootElement('#nameOnCard');
        setTimeout(() => element.focus(), 0);
        return false;
      } else if (this.appointment.cardDetails.cardNumber == "" || this.appointment.cardDetails.cardNumber == undefined) {
        alert('Please Enter Card Number');
        const element = this.renderer.selectRootElement('#cardNumber');
        setTimeout(() => element.focus(), 0);
        return false;
      } else if (this.appointment.cardDetails.expiryMonth == "" || this.appointment.cardDetails.expiryMonth == undefined) {
        alert('Please Enter Expiry Month');
        const element = this.renderer.selectRootElement('#expiryMonth');
        setTimeout(() => element.focus(), 0);
        return false;
      } else if (!AppValidations.validateExpiryMonth(this.appointment.cardDetails.expiryMonth)) {
        const element = this.renderer.selectRootElement('#expiryMonth');
        setTimeout(() => element.focus(), 0);
        return false;
      } else if (this.appointment.cardDetails.expiryYear == "" || this.appointment.cardDetails.expiryYear == undefined) {
        alert('Please Enter Expiry Year');
        const element = this.renderer.selectRootElement('#expiryYear');
        setTimeout(() => element.focus(), 0);
        return false;
      } else if (!AppValidations.validateExpiryYear(this.appointment.cardDetails.expiryYear)) {
        const element = this.renderer.selectRootElement('#expiryYear');
        setTimeout(() => element.focus(), 0);
        return false;
      } else if (!AppValidations.validateExpiryDate(this.appointment.cardDetails.expiryMonth, this.appointment.cardDetails.expiryYear)) {
        const element = this.renderer.selectRootElement('#expiryMonth');
        setTimeout(() => element.focus(), 0);
        return false;
      } else if (this.appointment.cardDetails.cvv == "" || this.appointment.cardDetails.cvv == undefined) {
        alert('Please Enter CVV');
        const element = this.renderer.selectRootElement('#cvv');
        setTimeout(() => element.focus(), 0);
        return false;
      } else if (!AppValidations.validateCVV(this.appointment.cardDetails.cvv)) {
        const element = this.renderer.selectRootElement('#cvv');
        setTimeout(() => element.focus(), 0);
        return false;
      } else {
        return true;
      }
    } else {
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
