import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageConstants } from 'src/app/constant/message-constants';
import { ApiResponse } from 'src/app/model/api-response';
import { Bill } from 'src/app/model/bill';
import { User } from 'src/app/model/user';
import { UserInfo } from 'src/app/model/user-info';
import { PaymentService } from 'src/app/service/payment.service';
import { StorageService } from 'src/app/service/storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-add-billing',
  templateUrl: './add-billing.component.html',
  styleUrls: ['./add-billing.component.css']
})
export class AddBillingComponent implements OnInit {
  message: string | undefined;
  currentUserInfo: UserInfo = new UserInfo;
  currentUser: User = new User;
  bill: Bill = new Bill;
  billsList: Bill[] = [];
  billStatusFlag: boolean = false;
  formData!: FormGroup;
  constructor(private storageService: StorageService, private userService: UserService, private paymentService: PaymentService, private router: Router) { }

  ngOnInit(): void {
    this.currentUserInfo = this.storageService.getUser();
    this.currentUserInfo.token = this.storageService.getToken();
    this.getUserData();
    console.log('this.token ::' + this.currentUserInfo.token);
    this.bill.createdDate = new Date();
  }
  getUserData() {
    this.userService.getUser(this.currentUserInfo).subscribe((data: User) => {
      this.currentUser = data;
      this.currentUser.token = this.storageService.getToken();
    });
  }
  saveBills() {
    if (this.validateBill()) {
      this.bill.user = this.currentUser;
      this.bill.name = this.currentUser.username;
      this.paymentService.saveBill(this.bill, this.currentUserInfo.token).subscribe((data: ApiResponse) => {
        this.message = data.message;
        if (this.message == MessageConstants.BillDetailsMessage) {
          this.billStatusFlag = true;
          this.getBillList();
          this.bill = new Bill;
          if (this.billStatusFlag) {
            this.router.navigate(['/patientProfile']);
          }
        }
      });
    }
  }
  validateBill(): boolean {
    var validateFlag = false;
    if (this.bill.title == "" || this.bill.title == undefined) {
      alert('Please eneter Title');
    } else if (this.bill.amount <= 0 || this.bill.amount == undefined) {
      alert('Please eneter Amount');
    } else {
      validateFlag = true;
    }
    return validateFlag;
  }
  getBillList() {
    this.paymentService.getBillList(this.currentUserInfo.id, this.currentUserInfo.token).subscribe((data: Bill[]) => {
      this.billsList = data;
    });
  }

  clearBills() {
    this.bill = new Bill;
  }
  reloadPage(): void {
    window.location.reload();
  }
}
