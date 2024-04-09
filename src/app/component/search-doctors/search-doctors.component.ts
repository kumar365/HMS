import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { UserInfo } from 'src/app/model/user-info';
import { StorageService } from 'src/app/service/storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-search-doctors',
  templateUrl: './search-doctors.component.html',
  styleUrls: ['./search-doctors.component.css']
})
export class SearchDoctorsComponent implements OnInit {
  message: any;
  statusFlag: boolean = false;
  currentUserInfo: UserInfo = new UserInfo;
  currentUser: User = new User;
  doctorsList: User[] = [];
  maleGenderFlag: boolean = false;
  femaleGenderFlag: boolean = false;
  availabilityTodayFlag: boolean = false;
  availabilityTomorrowFlag: boolean = false;
  availabilityNext7DaysFlag: boolean = false;
  availabilityNext14DaysFlag: boolean = false;
  constructor(private storageService: StorageService, private userService: UserService) { }

  ngOnInit(): void {
    this.currentUserInfo = this.storageService.getUser();
    if (this.currentUserInfo != null) {
      this.currentUserInfo.token = this.storageService.getToken();
      this.getUserData();
    }
    this.getDoctorsList();
  }
  getUserData() {
    this.userService.getUser(this.currentUserInfo).subscribe((data: User) => {
      this.currentUser = data;
    });
  }
  getDoctorsList() {
    this.userService.getDoctorsList().subscribe((data: User[]) => {
      this.doctorsList = data;
    });
  }
  genderChecked(type: string) {
    if (type == '1') {
      this.maleGenderFlag = !this.maleGenderFlag;
    } else {
      this.femaleGenderFlag = !this.femaleGenderFlag;
    }
    this.userService.getDoctorsListConditional(this.maleGenderFlag).subscribe((data: User[]) => {
      this.doctorsList = data;
      console.log('data length::' + data.length);
    });
  }
  availabilityChecked(type: string) {
    if (type == '1') {
      this.availabilityTodayFlag = !this.availabilityTodayFlag;
    }
    if (type == '2') {
      this.availabilityTomorrowFlag = !this.availabilityTomorrowFlag;
    }
    if (type == '3') {
      this.availabilityNext7DaysFlag = !this.availabilityNext7DaysFlag;
    }
    if (type == '4') {
      this.availabilityNext14DaysFlag = !this.availabilityNext14DaysFlag;
    }
    this.userService.getDoctorsListConditional(this.availabilityTodayFlag).subscribe((data: User[]) => {
      this.doctorsList = data;
      console.log('data length::' + data.length);
    });
  }
}
