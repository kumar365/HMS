import { Component, OnInit } from '@angular/core';
import { Orders } from 'src/app/model/orders';
import { User } from 'src/app/model/user';
import { UserInfo } from 'src/app/model/user-info';
import { StorageService } from 'src/app/service/storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit {
  currentUserInfo: UserInfo = new UserInfo;
  currentUser: User = new User;
  ordersList!: Orders[];
  retrievedImage: any;
  constructor(private storageService: StorageService, private userService: UserService) { }
  ngOnInit(): void {
    this.currentUserInfo = this.storageService.getUser();
    if (this.currentUserInfo != null) {
      this.currentUserInfo.token = this.storageService.getToken();
      this.getUserData();
      this.getOrdersList();
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
  getOrdersList() {
    this.userService.getOrdersList(this.currentUserInfo).subscribe((data: Orders[]) => {
      this.ordersList = data;
    });
  }
}
