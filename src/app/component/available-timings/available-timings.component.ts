import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DoctorSlot } from 'src/app/model/doctor-slot';
import { User } from 'src/app/model/user';
import { UserInfo } from 'src/app/model/user-info';
import { StorageService } from 'src/app/service/storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-available-timings',
  templateUrl: './available-timings.component.html',
  styleUrls: ['./available-timings.component.css']
})
export class AvailableTimingsComponent implements OnInit {
  message: any;
  statusFlag: boolean = false;
  currentUserInfo: UserInfo = new UserInfo;
  currentUser: User = new User;
  doctorSlot: DoctorSlot = new DoctorSlot;
  retrievedImage: any;
  currentDate: any;
  constructor(private router: Router, private storageService: StorageService, private userService: UserService) { }

  ngOnInit(): void {
    this.currentDate = new Date;
    this.currentUserInfo = this.storageService.getUser();
    if (this.currentUserInfo != null) {
      this.currentUserInfo.token = this.storageService.getToken();
      this.getUserData();
    } else {
      this.router.navigate(['/loginEmail']);
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

}
