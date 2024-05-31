import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Appointment } from 'src/app/model/appointment';
import { User } from 'src/app/model/user';
import { UserInfo } from 'src/app/model/user-info';
import { StorageService } from 'src/app/service/storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  title = 'Admin Dashboard';
  message: any;
  changePasswordFlag: boolean = false;
  currentUserInfo: UserInfo = new UserInfo;
  currentUser: User = new User;
  patientList: User[] = [];
  patientListToday: User[] = [];
  appointment: Appointment = new Appointment;
  appointmentList: Appointment[] = [];
  appointmentListToday: Appointment[] = [];
  currentDate: any;
  retrievedImage: any;
  constructor(private router: Router, private storageService: StorageService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.currentUserInfo = this.storageService.getDoctorUser();
    this.currentDate = new Date;
    if (this.currentUserInfo != null) {
      this.currentUserInfo.token = this.storageService.getDoctorToken();
      this.getUserData();
    } else {
      this.router.navigate(['/loginEmail']);
    }
  }
  getUserData() {
    this.userService.getUser(this.currentUserInfo).subscribe((data: User) => {
      this.currentUser = data;
      if (this.currentUser.userType == 'admin') {
        if (this.currentUser.imageData != null && this.currentUser.imageData != undefined) {
          this.retrievedImage = 'data:image/jpeg;base64,' + this.currentUser.imageData;
        }
      } else {
        if (this.currentUser.imageData != null && this.currentUser.imageData != undefined) {
          this.retrievedImage = 'data:image/jpeg;base64,' + this.currentUser.imageData;
        }
        //this.router.navigate(['/loginEmail']);
      }
    });
  }
}
