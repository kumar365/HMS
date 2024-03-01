import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageConstants } from 'src/app/constant/message-constants';
import { ApiResponse } from 'src/app/model/api-response';
import { Appointment } from 'src/app/model/appointment';
import { User } from 'src/app/model/user';
import { UserInfo } from 'src/app/model/user-info';
import { StorageService } from 'src/app/service/storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  message: any;
  statusFlag: boolean = false;
  currentUserInfo: UserInfo = new UserInfo;
  currentUser: User = new User;
  appointment: Appointment = new Appointment;
  currentdate: Date = new Date();
  first = this.currentdate.getDate() - this.currentdate.getDay() + 1; // First day is the day of the month - the day of the week
  last = this.first + 6; // last day is the first day + 6
  firstday = new Date(this.currentdate.setDate(this.first)).toUTCString();
  lastday = new Date(this.currentdate.setDate(this.last)).toUTCString();
  constructor(private storageService: StorageService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.currentUserInfo = this.storageService.getUser();
    this.currentUserInfo.token = this.storageService.getToken();
    this.getUserData();

  }
  getUserData() {
    this.userService.getUser(this.currentUserInfo).subscribe((data: User) => {
      this.currentUser = data;
    });
  }
  checkConsultationType(): boolean {
    if (this.appointment.consultationType == "" || this.appointment.consultationType == undefined) {
      alert('Please select Consultation Type');
      return false;
    } else {
      this.router.navigate(['/checkout']);
      return true;
    }
  }
  onSubmit() {
    this.userService.saveAppointment(this.appointment, this.currentUserInfo.token).subscribe((data: ApiResponse) => {
      this.message = data.message;
      if (this.message == MessageConstants.MedicalRecordsMessage) {
        this.statusFlag = true;
        this.appointment = new Appointment;
      }
    });
  }
}
