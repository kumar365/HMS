import { Component, OnInit } from '@angular/core';
import { DoctorSlot } from 'src/app/model/doctor-slot';
import { User } from 'src/app/model/user';
import { UserInfo } from 'src/app/model/user-info';
import { StorageService } from 'src/app/service/storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-schedule-timings',
  templateUrl: './schedule-timings.component.html',
  styleUrls: ['./schedule-timings.component.css']
})
export class ScheduleTimingsComponent implements OnInit {
  message: any;
  statusFlag: boolean = false;
  currentUserInfo: UserInfo = new UserInfo;
  currentUser: User = new User;
  doctorSlot: DoctorSlot = new DoctorSlot;
  startTimeList: string[] = [];
  endTimeList: string[] = [];
  constructor(private storageService: StorageService, private userService: UserService) { }

  ngOnInit(): void {
    this.currentUserInfo = this.storageService.getUser();
    this.currentUserInfo.token = this.storageService.getToken();
    this.getUserData();
    this.doctorSlot.slotDuration = 0;
  }
  getUserData() {
    this.userService.getUser(this.currentUserInfo).subscribe((data: User) => {
      this.currentUser = data;
    });
  }
  getTimeIntervals() {
    this.startTimeList = [];
    this.endTimeList = [];
    this.makeTimeIntervals('9:00', '17:00', this.doctorSlot.slotDuration);
  }
  makeTimeIntervals(startTime: any, endTime: any, increment: any) {
    startTime = startTime.toString().split(':');
    endTime = endTime.toString().split(':');
    increment = parseInt(increment, 10);
    var startHr = parseInt(startTime[0], 10);
    var startMin = parseInt(startTime[1], 10);
    var endHr = parseInt(endTime[0], 10);
    var endMin = parseInt(endTime[1], 10);
    var currentHr = startHr;
    var currentMin = startMin;
    var previous = currentHr + ':' + this.pad(currentMin);
    var current = '';

    do {
      currentMin += parseInt(increment);
      if ((currentMin % 60) === 0 || currentMin > 60) {
        currentMin = (currentMin === 60) ? 0 : currentMin - 60;
        currentHr += 1;
      }
      current = currentHr + ':' + this.pad(currentMin);
      this.startTimeList.push(previous);
      this.endTimeList.push(current);

      previous = current;
    } while (currentHr !== endHr);

  }
  pad(n: any) {
    return (n < 10) ? '0' + n.toString() : n;
  }
  addSlot() {
    this.doctorSlot.startTime = "";
    this.doctorSlot.endTime = "";
  }
  updateEndTime() {
    this.doctorSlot.endTime = this.getEndTime(this.doctorSlot.startTime, this.doctorSlot.slotDuration);
  }

  getEndTime(startTime: any, increment: any): any {
    startTime = startTime.toString().split(':');
    var startHr = parseInt(startTime[0], 10);
    var startMin = parseInt(startTime[1], 10);
    var endTime = '';
    startMin = startMin + parseInt(increment);
    if ((startMin % 60) === 0 || startMin > 60) {
      startMin = (startMin === 60) ? 0 : startMin - 60;
      startHr += 1;
    }
    endTime = startHr + ':' + this.pad(startMin);
    return endTime;
  }

  onSubmit() {

  }

  validateTimings() {

  }

}
