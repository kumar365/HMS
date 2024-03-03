import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Appointment } from 'src/app/model/appointment';
import { User } from 'src/app/model/user';
import { UserInfo } from 'src/app/model/user-info';
import { StorageService } from 'src/app/service/storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  message: any;
  statusFlag: boolean = false;
  currentUserInfo: UserInfo = new UserInfo;
  currentUser: User = new User;
  appointment: Appointment = new Appointment;
  constructor(private storageService: StorageService, private userService: UserService,
    private router: Router, private renderer: Renderer2) { }
  ngOnInit(): void {
    this.currentUserInfo = this.storageService.getUser();
    this.currentUserInfo.token = this.storageService.getToken();
    //alert(this.currentUserInfo.token);
    this.getUserData();

  }
  getUserData() {
    this.userService.getUser(this.currentUserInfo).subscribe((data: User) => {
      this.currentUser = data;
    });
  }
  validatePaymentData(): boolean {
    if (this.appointment.paymentMethod == "" || this.appointment.paymentMethod == undefined) {
      alert('Please Select the paymentMethod');
      const element = this.renderer.selectRootElement('#cardName');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.appointment.paymentMethod == "Debit or Credit Card" && !this.validateCardDetails()) {
      return false;
    } else {
      return true;
    }
  }
  validateCardDetails(): boolean {
    if (this.appointment.paymentMethod == "Debit or Credit Card") {
      if (this.appointment.cardDetails.nameOnCard == "" || this.appointment.cardDetails.nameOnCard == undefined) {
        alert('Please Enter Name on Card');
        const element = this.renderer.selectRootElement('#nameOnCard');
        setTimeout(() => element.focus(), 0);
        return false;
      } else if (!this.validateName(this.appointment.cardDetails.nameOnCard)) {
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
      } else if (this.appointment.cardDetails.expiryYear == "" || this.appointment.cardDetails.expiryYear == undefined) {
        alert('Please Enter Expiry Year');
        const element = this.renderer.selectRootElement('#expiryYear');
        setTimeout(() => element.focus(), 0);
        return false;
      } else if (this.appointment.cardDetails.cvv == "" || this.appointment.cardDetails.cvv == undefined) {
        alert('Please Enter CVV');
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
  validateName(name: string): boolean {
    var nameRegex = /^[A-Za-z ]{3,16}$/;
    if (nameRegex.test(name)) {
      return true;
    } else {
      alert("Your name is not valid. Only characters A-Z and a-z are acceptable of length 3 to 16.");
      return false;
    }
  }
  onSubmit() {
    if (this.validatePaymentData()) {
      this.router.navigate(['/bookingSuccess']);
    }
  }
}



