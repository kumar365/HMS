import { Component, OnInit } from '@angular/core';
import { TestDetails } from 'src/app/model/test-details';
import { User } from 'src/app/model/user';
import { UserInfo } from 'src/app/model/user-info';
import { CommonService } from 'src/app/service/common.service';
import { StorageService } from 'src/app/service/storage.service';
import { UserService } from 'src/app/service/user.service';
@Component({
  selector: 'app-search-tests',
  templateUrl: './search-tests.component.html',
  styleUrls: ['./search-tests.component.css']
})
export class SearchTestsComponent implements OnInit {
  id: any;
  message: any;
  statusFlag: boolean = false;
  currentUserInfo: UserInfo = new UserInfo;
  currentUser: User = new User;
  doctor: User = new User;
  testDetailsList: TestDetails[] = [];
  maleGenderFlag: boolean = false;
  femaleGenderFlag: boolean = false;
  availabilityTodayFlag: boolean = false;
  availabilityTomorrowFlag: boolean = false;
  availabilityNext7DaysFlag: boolean = false;
  availabilityNext14DaysFlag: boolean = false;
  retrievedImage: any;
  constructor(private storageService: StorageService, private userService: UserService,
     private commonService: CommonService) { }

  ngOnInit(): void {
    this.currentUserInfo = this.storageService.getUser();
    if (this.currentUserInfo != null) {
      this.currentUserInfo.token = this.storageService.getToken();
      this.getUserData();
    }
    this.getTestDetailsList();
  }
  getUserData() {
    this.userService.getUser(this.currentUserInfo).subscribe((data: User) => {
      this.currentUser = data;
      if (this.currentUser.imageData != null && this.currentUser.imageData != undefined) {
        this.retrievedImage = 'data:image/jpeg;base64,' + this.currentUser.imageData;
      }
    });
  }
  getDoctorData() {
    this.commonService.getDoctorById(this.id).subscribe((data: User) => {
      this.doctor = data;
    });
  }
  getTestDetailsList() {
    this.commonService.getTestDetailsList().subscribe((data: TestDetails[]) => {
      this.testDetailsList = data;
    });
  }
}
