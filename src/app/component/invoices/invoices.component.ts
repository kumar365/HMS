import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Invoice } from 'src/app/model/invoice';
import { User } from 'src/app/model/user';
import { UserInfo } from 'src/app/model/user-info';
import { PaymentService } from 'src/app/service/payment.service';
import { StorageService } from 'src/app/service/storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit {
  message: any;
  statusFlag: boolean = false;
  currentUserInfo: UserInfo = new UserInfo;
  currentUser: User = new User;
  invoiceList: Invoice[] = [];
  retrievedImage: any;
  constructor(private router: Router, private storageService: StorageService,
    private userService: UserService, private paymentService: PaymentService) { }

  ngOnInit(): void {
    this.currentUserInfo = this.storageService.getUser();
    if (this.currentUserInfo != null) {
      this.currentUserInfo.token = this.storageService.getToken();
      this.getUserData();
    } else {
      this.router.navigate(['/loginEmail']);
    }
    this.getInvoiceList();
  }
  getUserData() {
    this.userService.getUser(this.currentUserInfo).subscribe((data: User) => {
      this.currentUser = data;
      if (this.currentUser.imageData != null && this.currentUser.imageData != undefined) {
        this.retrievedImage = 'data:image/jpeg;base64,' + this.currentUser.imageData;
      }
    });
  }
  getInvoiceList() {
    this.paymentService.getInvoiceList(this.currentUserInfo.id, this.currentUserInfo.token).subscribe((data: Invoice[]) => {
      this.invoiceList = data;
    });
  }
}
