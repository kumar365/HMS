import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppValidations } from 'src/app/constant/app-validations';
import { CardDetails } from 'src/app/model/card-details';
import { TestBooking } from 'src/app/model/test-booking';
import { TestDetails } from 'src/app/model/test-details';
import { User } from 'src/app/model/user';
import { UserInfo } from 'src/app/model/user-info';
import { CommonService } from 'src/app/service/common.service';
import { StorageService } from 'src/app/service/storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-lab-checkout',
  templateUrl: './lab-checkout.component.html',
  styleUrls: ['./lab-checkout.component.css']
})
export class LabCheckoutComponent implements OnInit {
  id!: number;
  message: any;
  statusFlag: boolean = false;
  currentUserInfo: UserInfo = new UserInfo;
  currentUser: User = new User;
  testBooking: TestBooking = new TestBooking;
  termsAndConditionsFlag: Boolean = false;
  testDetails: TestDetails = new TestDetails;
  retrievedImage: any;
  currentDate: any;
  constructor(private router: Router, private storageService: StorageService, private userService: UserService,
    private commonService: CommonService, private renderer: Renderer2, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.currentUserInfo = this.storageService.getUser();
    this.currentDate = new Date;
    this.activatedRoute.queryParams.subscribe(params => {
      console.log(params);
      this.id = params['id'];
      if (this.id == undefined) {
        this.id = 0;
      }
      this.getTestDetails();
    });
    if (this.currentUserInfo != null) {
      this.currentUserInfo.token = this.storageService.getToken();
      this.getUserData();
    } else {
      this.testBooking.user = new User;
    }
    this.testBooking.cardDetails = new CardDetails;
  }
  getUserData() {
    this.userService.getUser(this.currentUserInfo).subscribe((data: User) => {
      this.currentUser = data;
      if (this.currentUser.imageData != null && this.currentUser.imageData != undefined) {
        this.retrievedImage = 'data:image/jpeg;base64,' + this.currentUser.imageData;
      }
    });
    if (this.currentUser.firstName == "" || this.currentUser.firstName == undefined) {
      this.testBooking.user = new User;
    } else {
      this.testBooking.user = this.currentUser;
    }
  }
  getTestDetails() {
    this.commonService.getTestDetails(this.id).subscribe((data: TestDetails) => {
      this.testDetails = data;
    });
  }
  validateLabCheckoutDetails(): boolean {
    if (this.testBooking.user.firstName == "" || this.testBooking.user.firstName == undefined) {
      alert('Please Enter First Name');
      const element = this.renderer.selectRootElement('#firstName');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (!AppValidations.validateName(this.testBooking.user.firstName)) {
      const element = this.renderer.selectRootElement('#firstName');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.testBooking.user.lastName == "" || this.testBooking.user.lastName == undefined) {
      alert('Please Enter Last Name');
      const element = this.renderer.selectRootElement('#lastName');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (!AppValidations.validateName(this.testBooking.user.lastName)) {
      const element = this.renderer.selectRootElement('#lastName');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.testBooking.user.email == "" || this.testBooking.user.email == undefined) {
      alert('Please Enter Email');
      const element = this.renderer.selectRootElement('#email');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (!AppValidations.validateMail(this.testBooking.user.email)) {
      const element = this.renderer.selectRootElement('#email');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.testBooking.user.phoneNumber == "" || this.testBooking.user.phoneNumber == undefined) {
      alert('Please Enter Phone Number');
      const element = this.renderer.selectRootElement('#phoneNumber');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (!AppValidations.validatePhoneNumber(this.testBooking.user.phoneNumber)) {
      const element = this.renderer.selectRootElement('#phoneNumber');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.testBooking.paymentMethod == "" || this.testBooking.paymentMethod == undefined) {
      alert('Please Check the paymentMethod');
      const element = this.renderer.selectRootElement('#nameOnCard');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.testBooking.paymentMethod == "Credit card" && !this.validateCardDetails()) {
      return false;
    } else if (this.testBooking.termsAndConditions == "" || this.testBooking.termsAndConditions == "N" || this.testBooking.termsAndConditions == undefined) {
      alert('Please Accept Terms & Conditions');
      const element = this.renderer.selectRootElement('#termsAndConditions');
      setTimeout(() => element.focus(), 0);
      return false;
    } else {
      return true;
    }
  }
  validateCardDetails(): boolean {
    if (this.testBooking.paymentMethod == "Credit card") {
      if (this.testBooking.cardDetails.nameOnCard == "" || this.testBooking.cardDetails.nameOnCard == undefined) {
        alert('Please Enter Name on Card');
        const element = this.renderer.selectRootElement('#nameOnCard');
        setTimeout(() => element.focus(), 0);
        return false;
      } else if (!AppValidations.validateName(this.testBooking.cardDetails.nameOnCard)) {
        const element = this.renderer.selectRootElement('#nameOnCard');
        setTimeout(() => element.focus(), 0);
        return false;
      } else if (this.testBooking.cardDetails.cardNumber == "" || this.testBooking.cardDetails.cardNumber == undefined) {
        alert('Please Enter Card Number');
        const element = this.renderer.selectRootElement('#cardNumber');
        setTimeout(() => element.focus(), 0);
        return false;
      } else if (this.testBooking.cardDetails.expiryMonth == "" || this.testBooking.cardDetails.expiryMonth == undefined) {
        alert('Please Enter Expiry Month');
        const element = this.renderer.selectRootElement('#expiryMonth');
        setTimeout(() => element.focus(), 0);
        return false;
      } else if (!AppValidations.validateExpiryMonth(this.testBooking.cardDetails.expiryMonth)) {
        const element = this.renderer.selectRootElement('#expiryMonth');
        setTimeout(() => element.focus(), 0);
        return false;
      } else if (this.testBooking.cardDetails.expiryYear == "" || this.testBooking.cardDetails.expiryYear == undefined) {
        alert('Please Enter Expiry Year');
        const element = this.renderer.selectRootElement('#expiryYear');
        setTimeout(() => element.focus(), 0);
        return false;
      } else if (!AppValidations.validateExpiryYear(this.testBooking.cardDetails.expiryYear)) {
        const element = this.renderer.selectRootElement('#expiryYear');
        setTimeout(() => element.focus(), 0);
        return false;
      } else if (!AppValidations.validateExpiryDate(this.testBooking.cardDetails.expiryMonth, this.testBooking.cardDetails.expiryYear)) {
        const element = this.renderer.selectRootElement('#expiryMonth');
        setTimeout(() => element.focus(), 0);
        return false;
      } else if (this.testBooking.cardDetails.cvv == "" || this.testBooking.cardDetails.cvv == undefined) {
        alert('Please Enter CVV');
        const element = this.renderer.selectRootElement('#cvv');
        setTimeout(() => element.focus(), 0);
        return false;
      } else if (!AppValidations.validateCVV(this.testBooking.cardDetails.cvv)) {
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
      this.testBooking.termsAndConditions = 'Y';
    } else {
      this.testBooking.termsAndConditions = 'N';
    }
  }
  onSubmit() {
    if (this.validateLabCheckoutDetails()) {
      //alert('bookingSuccess');
      this.router.navigate(['/testBookingSuccess']);
    }
  }
}
