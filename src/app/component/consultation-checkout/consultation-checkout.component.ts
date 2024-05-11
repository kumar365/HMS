import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppValidations } from 'src/app/constant/app-validations';
import { Appointment } from 'src/app/model/appointment';
import { CardDetails } from 'src/app/model/card-details';
import { Consultation } from 'src/app/model/consultation';
import { User } from 'src/app/model/user';
import { UserInfo } from 'src/app/model/user-info';
import { StorageService } from 'src/app/service/storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-consultation-checkout',
  templateUrl: './consultation-checkout.component.html',
  styleUrls: ['./consultation-checkout.component.css']
})
export class ConsultationCheckoutComponent implements OnInit {
  message: any;
  statusFlag: boolean = false;
  currentUserInfo: UserInfo = new UserInfo;
  currentUser: User = new User;
  consultation: Consultation = new Consultation;
  termsAndConditionsFlag: Boolean = false;
  retrievedImage: any;
  constructor(private route: ActivatedRoute, private router: Router, private storageService: StorageService,
    private userService: UserService, private renderer: Renderer2) { }


  ngOnInit(): void {
    this.currentUserInfo = this.storageService.getUser();
    if (this.currentUserInfo != null) {
      this.currentUserInfo.token = this.storageService.getToken();
      this.getUserData();
    }
    this.consultation.cardDetails = new CardDetails;
  }
  getUserData() {
    this.userService.getUser(this.currentUserInfo).subscribe((data: User) => {
      this.currentUser = data;
      if (this.currentUser.imageData != null && this.currentUser.imageData != undefined) {
        this.retrievedImage = 'data:image/jpeg;base64,' + this.currentUser.imageData;
      }
    });
  }
  validateConsultationCheckoutDetails(): boolean {
    if (this.consultation.paymentMethod == "" || this.consultation.paymentMethod == undefined) {
      alert('Please Check the paymentMethod');
      const element = this.renderer.selectRootElement('#nameOnCard');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.consultation.paymentMethod == "Credit card" && !this.validateCardDetails()) {
      return false;
    } else if (this.consultation.termsAndConditions == "" || this.consultation.termsAndConditions == "N" || this.consultation.termsAndConditions == undefined) {
      alert('Please Accept Terms & Conditions');
      const element = this.renderer.selectRootElement('#termsAndConditions');
      setTimeout(() => element.focus(), 0);
      return false;
    } else {
      return true;
    }
  }
  validateCardDetails(): boolean {
    if (this.consultation.paymentMethod == "Credit card") {
      if (this.consultation.cardDetails.nameOnCard == "" || this.consultation.cardDetails.nameOnCard == undefined) {
        alert('Please Enter Name on Card');
        const element = this.renderer.selectRootElement('#nameOnCard');
        setTimeout(() => element.focus(), 0);
        return false;
      } else if (!AppValidations.validateName(this.consultation.cardDetails.nameOnCard)) {
        const element = this.renderer.selectRootElement('#nameOnCard');
        setTimeout(() => element.focus(), 0);
        return false;
      } else if (this.consultation.cardDetails.cardNumber == "" || this.consultation.cardDetails.cardNumber == undefined) {
        alert('Please Enter Card Number');
        const element = this.renderer.selectRootElement('#cardNumber');
        setTimeout(() => element.focus(), 0);
        return false;
      } else if (this.consultation.cardDetails.expiryMonth == "" || this.consultation.cardDetails.expiryMonth == undefined) {
        alert('Please Enter Expiry Month');
        const element = this.renderer.selectRootElement('#expiryMonth');
        setTimeout(() => element.focus(), 0);
        return false;
      } else if (!AppValidations.validateExpiryMonth(this.consultation.cardDetails.expiryMonth)) {
        const element = this.renderer.selectRootElement('#expiryMonth');
        setTimeout(() => element.focus(), 0);
        return false;
      } else if (this.consultation.cardDetails.expiryYear == "" || this.consultation.cardDetails.expiryYear == undefined) {
        alert('Please Enter Expiry Year');
        const element = this.renderer.selectRootElement('#expiryYear');
        setTimeout(() => element.focus(), 0);
        return false;
      } else if (!AppValidations.validateExpiryYear(this.consultation.cardDetails.expiryYear)) {
        const element = this.renderer.selectRootElement('#expiryYear');
        setTimeout(() => element.focus(), 0);
        return false;
      } else if (!AppValidations.validateExpiryDate(this.consultation.cardDetails.expiryMonth, this.consultation.cardDetails.expiryYear)) {
        const element = this.renderer.selectRootElement('#expiryMonth');
        setTimeout(() => element.focus(), 0);
        return false;
      } else if (this.consultation.cardDetails.cvv == "" || this.consultation.cardDetails.cvv == undefined) {
        alert('Please Enter CVV');
        const element = this.renderer.selectRootElement('#cvv');
        setTimeout(() => element.focus(), 0);
        return false;
      } else if (!AppValidations.validateCVV(this.consultation.cardDetails.cvv)) {
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
      this.consultation.termsAndConditions = 'Y';
    } else {
      this.consultation.termsAndConditions = 'N';
    }
  }

  onSubmit() {
    if (this.validateConsultationCheckoutDetails()) {
      this.router.navigate(['/bookingConsultation']);
    }
  }
}

