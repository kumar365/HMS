import { Component, OnInit } from '@angular/core';
import { Appointment } from 'src/app/model/appointment';
import { User } from 'src/app/model/user';
import { UserInfo } from 'src/app/model/user-info';
import { StorageService } from 'src/app/service/storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.css']
})
export class DoctorDashboardComponent implements OnInit {
  title = 'Doctor Dashboard';
  message: any;
  changePasswordFlag: boolean = false;
  currentUserInfo: UserInfo = new UserInfo;
  currentUser: User = new User;
  patientList: User[] = [];
  appointmentList: Appointment[] = [];
  currentDate: any;
  constructor(private storageService: StorageService, private userService: UserService) { }

  ngOnInit(): void {
    this.currentUserInfo = this.storageService.getUser();
    this.currentDate = new Date;
    if (this.currentUserInfo != null) {
      this.currentUserInfo.token = this.storageService.getToken();
      this.getUserData();
      this.getPatientList();
      this.getAppointmentList();
    }
  }
  getUserData() {
    this.userService.getUser(this.currentUserInfo).subscribe((data: User) => {
      this.currentUser = data;
    });
  }
  getPatientList() {
    this.userService.getPatientListById(this.currentUserInfo.id, this.currentUserInfo.token).subscribe((data: User[]) => {
      this.patientList = data;
    });
  }
  getAppointmentList() {
    this.userService.getDoctorAppointmentList(this.currentUserInfo.id, this.currentUserInfo.token).subscribe((data: Appointment[]) => {
      this.appointmentList = data;
    });
  }
}
