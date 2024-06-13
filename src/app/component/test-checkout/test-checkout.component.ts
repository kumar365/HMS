import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TestDetails } from 'src/app/model/test-details';
import { User } from 'src/app/model/user';
import { UserInfo } from 'src/app/model/user-info';
import { CommonService } from 'src/app/service/common.service';
import { StorageService } from 'src/app/service/storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-test-checkout',
  templateUrl: './test-checkout.component.html',
  styleUrls: ['./test-checkout.component.css']
})
export class TestCheckoutComponent implements OnInit {
  id!: number;
  message: any;
  statusFlag: boolean = false;
  currentUserInfo: UserInfo = new UserInfo;
  currentUser: User = new User;
  testDetails: TestDetails = new TestDetails;
  retrievedImage: any;
  currentDate: any;
  constructor(private storageService: StorageService, private userService: UserService,
    private commonService: CommonService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.currentDate = new Date;
    this.currentUserInfo = this.storageService.getUser();
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
  getTestDetails() {
    this.commonService.getTestDetails(this.id).subscribe((data: TestDetails) => {
      this.testDetails = data;
    });
  }
  onSubmit() {

  }
}
