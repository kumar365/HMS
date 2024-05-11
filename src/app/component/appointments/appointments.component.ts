import { Component, OnInit } from '@angular/core';
import { ApiResponse } from 'src/app/model/api-response';
import { Appointment } from 'src/app/model/appointment';
import { User } from 'src/app/model/user';
import { UserInfo } from 'src/app/model/user-info';
import { StorageService } from 'src/app/service/storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {
  message: any;
  currentUserInfo: UserInfo = new UserInfo;
  currentUser: User = new User;
  appointment: Appointment = new Appointment;
  appointmentList: Appointment[] = [];
  currentDate: any;
  constructor(private storageService: StorageService, private userService: UserService) { }

  ngOnInit(): void {
    this.currentUserInfo = this.storageService.getUser();
    this.currentDate = new Date;
    if (this.currentUserInfo != null) {
      this.currentUserInfo.token = this.storageService.getToken();
      this.getUserData();
    }
    this.getAppointmentList();
  }
  getUserData() {
    this.userService.getUser(this.currentUserInfo).subscribe((data: User) => {
      this.currentUser = data;
    });
  }
  getAppointmentList() {
    this.userService.getDoctorAppointmentList(this.currentUserInfo.id, this.currentUserInfo.token).subscribe((data: Appointment[]) => {
      this.appointmentList = data;
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
