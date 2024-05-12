import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiResponse } from 'src/app/model/api-response';
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
  patientListToday: User[] = [];
  appointment: Appointment = new Appointment;
  appointmentList: Appointment[] = [];
  appointmentListToday: Appointment[] = [];
  currentDate: any;
  retrievedImage: any;
  constructor(private router: Router, private storageService: StorageService, private userService: UserService) { }

  ngOnInit(): void {
    this.currentUserInfo = this.storageService.getUser();
    this.currentDate = new Date;
    if (this.currentUserInfo != null) {
      this.currentUserInfo.token = this.storageService.getToken();
      this.getUserData();
      this.getPatientList();
      this.getTodayPatientList();
      this.getAppointmentList();
      this.getTodayAppointmentList();
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
  getPatientList() {
    this.userService.getPatientListById(this.currentUserInfo.id, this.currentUserInfo.token).subscribe((data: User[]) => {
      this.patientList = data;
    });
  }
  getTodayPatientList() {
    this.userService.getTodayPatientList(this.currentUserInfo.token).subscribe((data: User[]) => {
      this.patientListToday = data;
    });
  }
  getAppointmentList() {
    this.userService.getDoctorAppointmentList(this.currentUserInfo.id, this.currentUserInfo.token).subscribe((data: Appointment[]) => {
      this.appointmentList = data;
    });
  }
  getTodayAppointmentList() {
    this.userService.getDoctorAppointmentListToday(this.currentUserInfo.id, this.currentUserInfo.token).subscribe((data: Appointment[]) => {
      this.appointmentListToday = data;
    });
  }
  onView(appointmentId: any) {
    for (let index = 0; index < this.appointmentList.length; index++) {
      if (this.appointmentList[index].id == appointmentId) {
        this.appointment = this.appointmentList[index];
      }
    }
  }
  onAccept(appointmentId: any) {
    for (let index = 0; index < this.appointmentList.length; index++) {
      if (this.appointmentList[index].id == appointmentId) {
        this.appointment = this.appointmentList[index];
        this.appointment.status = 'Accepted';
        this.userService.cancelAppointment(this.appointment, this.currentUserInfo.token).subscribe((data: ApiResponse) => {
          this.message = data.message;
          alert(data.message);
        });
      }
    }
  }
  onCancel(appointmentId: any) {
    for (let index = 0; index < this.appointmentList.length; index++) {
      if (this.appointmentList[index].id == appointmentId) {
        this.appointment = this.appointmentList[index];
        this.appointment.status = 'Cancelled';
        this.userService.cancelAppointment(this.appointment, this.currentUserInfo.token).subscribe((data: ApiResponse) => {
          this.message = data.message;
          alert(data.message);
        });
      }
    }
  }
}
