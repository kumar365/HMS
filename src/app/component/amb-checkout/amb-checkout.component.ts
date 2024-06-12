import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppValidations } from 'src/app/constant/app-validations';
import { AmbBooking } from 'src/app/model/amb-booking';
import { Ambulance } from 'src/app/model/ambulance';
import { CardDetails } from 'src/app/model/card-details';
import { User } from 'src/app/model/user';
import { UserInfo } from 'src/app/model/user-info';
import { CommonService } from 'src/app/service/common.service';
import { StorageService } from 'src/app/service/storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-amb-checkout',
  templateUrl: './amb-checkout.component.html',
  styleUrls: ['./amb-checkout.component.css']
})
export class AmbCheckoutComponent implements OnInit {
  id: any;
  message: any;
  statusFlag: boolean = false;
  currentUserInfo: UserInfo = new UserInfo;
  currentUser: User = new User;
  ambulance: Ambulance = new Ambulance;
  ambBooking: AmbBooking = new AmbBooking;
  termsAndConditionsFlag: Boolean = false;
  retrievedImage: any;
  currentDate: Date = new Date;
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private storageService: StorageService,
    private userService: UserService, private renderer: Renderer2, private commonService: CommonService) { }

  ngOnInit(): void {
    this.currentUserInfo = this.storageService.getUser();
    if (this.currentUserInfo != null) {
      this.currentUserInfo.token = this.storageService.getToken();
      this.getUserData();
    }
    this.ambBooking.cardDetails = new CardDetails;
    this.id = this.activatedRoute.snapshot.params['id'];
    if (this.id != null && this.id != undefined) {
      this.getAmbulanceData();
    }
  }
  getUserData() {
    this.userService.getUser(this.currentUserInfo).subscribe((data: User) => {
      this.currentUser = data;
      if (this.currentUser.imageData != null && this.currentUser.imageData != undefined) {
        this.retrievedImage = 'data:image/jpeg;base64,' + this.currentUser.imageData;
      }
    });
  }
  getAmbulanceData() {
    this.commonService.getAmbulanceDetails(this.id).subscribe((data: Ambulance) => {
      this.ambulance = data;
      this.ambBooking.ambulanceType = this.ambulance.type;
    });
  }
  onSubmit() {
    if (this.validateAmbulancePaymentData()) {
      this.router.navigate(['/ambBookingSuccess']);
    }
  }
  validateAmbulancePaymentData(): boolean {
    if (this.ambBooking.paymentMethod == "" || this.ambBooking.paymentMethod == undefined) {
      alert('Please Select the paymentMethod');
      const element = this.renderer.selectRootElement('#cardName');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.ambBooking.paymentMethod == "Credit card or Debit card" && !this.validateCardDetails()) {
      return false;
    } else {
      return true;
    }
  }
  validateCardDetails(): boolean {
    if (this.ambBooking.paymentMethod == "Credit card") {
      if (this.ambBooking.cardDetails.nameOnCard == "" || this.ambBooking.cardDetails.nameOnCard == undefined) {
        alert('Please Enter Name on Card');
        const element = this.renderer.selectRootElement('#nameOnCard');
        setTimeout(() => element.focus(), 0);
        return false;
      } else if (!AppValidations.validateName(this.ambBooking.cardDetails.nameOnCard)) {
        const element = this.renderer.selectRootElement('#nameOnCard');
        setTimeout(() => element.focus(), 0);
        return false;
      } else if (this.ambBooking.cardDetails.cardNumber == "" || this.ambBooking.cardDetails.cardNumber == undefined) {
        alert('Please Enter Card Number');
        const element = this.renderer.selectRootElement('#cardNumber');
        setTimeout(() => element.focus(), 0);
        return false;
      } else if (this.ambBooking.cardDetails.expiryMonth == "" || this.ambBooking.cardDetails.expiryMonth == undefined) {
        alert('Please Enter Expiry Month');
        const element = this.renderer.selectRootElement('#expiryMonth');
        setTimeout(() => element.focus(), 0);
        return false;
      } else if (this.ambBooking.cardDetails.expiryYear == "" || this.ambBooking.cardDetails.expiryYear == undefined) {
        alert('Please Enter Expiry Year');
        const element = this.renderer.selectRootElement('#expiryYear');
        setTimeout(() => element.focus(), 0);
        return false;
      } else if (!AppValidations.validateExpiryDate(this.ambBooking.cardDetails.expiryMonth, this.ambBooking.cardDetails.expiryYear)) {
        const element = this.renderer.selectRootElement('#expiryMonth');
        setTimeout(() => element.focus(), 0);
        return false;
      } else if (this.ambBooking.cardDetails.cvv == "" || this.ambBooking.cardDetails.cvv == undefined) {
        alert('Please Enter CVV');
        const element = this.renderer.selectRootElement('#cvv');
        setTimeout(() => element.focus(), 0);
        return false;
      } else if (!AppValidations.validateCVV(this.ambBooking.cardDetails.cvv)) {
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
      this.ambBooking.termsAndConditions = 'Y';
    } else {
      this.ambBooking.termsAndConditions = 'N';
    }
  }
}
