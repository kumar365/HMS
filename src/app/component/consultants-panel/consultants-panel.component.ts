import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { UserInfo } from 'src/app/model/user-info';
import { CommonService } from 'src/app/service/common.service';
import { StorageService } from 'src/app/service/storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-consultants-panel',
  templateUrl: './consultants-panel.component.html',
  styleUrls: ['./consultants-panel.component.css']
})
export class ConsultantsPanelComponent implements OnInit {
  message: any;
  changePasswordFlag: boolean = false;
  currentUserInfo: UserInfo = new UserInfo;
  currentUser: User = new User;
  doctorsList: User[] = [];
  retrievedImage: any;
  constructor(private storageService: StorageService, private userService: UserService,
    private commonService: CommonService) { }

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
      if (this.currentUser.imageData != null && this.currentUser.imageData != undefined) {
        this.retrievedImage = 'data:image/jpeg;base64,' + this.currentUser.imageData;
      }
    });
  }
  getDoctorsList() {
    this.commonService.getDoctorsList().subscribe((data: User[]) => {
      this.doctorsList = data;
      for (let index = 0; index < this.doctorsList.length; index++) {
        if (this.doctorsList[index].imageData != null && this.doctorsList[index].imageData != undefined) {
          this.doctorsList[index].retrievedImage = 'data:image/jpeg;base64,' + this.doctorsList[index].imageData;
        }
      }
    });
  }
  getDoctorsListConditional() {
    this.commonService.getDoctorsListConditional(true).subscribe((data: User[]) => {
      this.doctorsList = data;
    });
  }
}
