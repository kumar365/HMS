import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserInfo } from 'src/app/model/user-info';
import { StorageService } from 'src/app/service/storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-my-patients',
  templateUrl: './my-patients.component.html',
  styleUrls: ['./my-patients.component.css']
})
export class MyPatientsComponent implements OnInit {
  message: any;
  statusFlag: boolean = false;
  currentUserInfo: UserInfo = new UserInfo;
  currentUser: User = new User;
  patientList!: User[];
  retrievedImage: any;
  constructor(private router: Router, private storageService: StorageService, private userService: UserService) { }

  ngOnInit(): void {
    this.currentUserInfo = this.storageService.getUser();
    if (this.currentUserInfo != null) {
      this.currentUserInfo.token = this.storageService.getToken();
      this.getUserData();
    } else {
      this.router.navigate(['/loginEmail']);
    }
    this.getPatientList();
  }
  getUserData() {
    this.userService.getUser(this.currentUserInfo).subscribe((data: User) => {
      this.currentUser = data;
      if (this.currentUser.imageData != null && this.currentUser.imageData != undefined) {
        this.retrievedImage = 'data:image/jpeg;base64,' + this.currentUser.imageData;
      }
    });
  }
  getPatientList() {
    this.userService.getPatientListById(this.currentUserInfo.id, this.currentUserInfo.token).subscribe((data: User[]) => {
      this.patientList = data;
      for (let index = 0; index < this.patientList.length; index++) {
        if (this.patientList[index].imageData != null && this.patientList[index].imageData != undefined) {
          this.patientList[index].retrievedImage = 'data:image/jpeg;base64,' + this.patientList[index].imageData;
        }
      }
    });
  }
}
