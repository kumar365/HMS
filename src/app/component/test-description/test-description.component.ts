import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TestDetails } from 'src/app/model/test-details';
import { User } from 'src/app/model/user';
import { UserInfo } from 'src/app/model/user-info';
import { CommonService } from 'src/app/service/common.service';
import { StorageService } from 'src/app/service/storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-test-description',
  templateUrl: './test-description.component.html',
  styleUrls: ['./test-description.component.css']
})
export class TestDescriptionComponent implements OnInit {
  id!: number;
  currentUserInfo: UserInfo = new UserInfo;
  currentUser: User = new User;
  retrievedImage: any;
  testDetails: TestDetails = new TestDetails;
  constructor(private storageService: StorageService, private userService: UserService, private commonService: CommonService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.currentUserInfo = this.storageService.getUser();
    if (this.currentUserInfo != null) {
      this.currentUserInfo.token = this.storageService.getToken();
      this.getUserData();
    }
    this.activatedRoute.queryParams.subscribe(params => {
      console.log(params);
      this.id = params['id'];
      if (this.id == undefined) {
        this.id = 0;
      }
      this.getTestDetails();
    });
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
}
