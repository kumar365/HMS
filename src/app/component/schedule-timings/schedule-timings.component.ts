import { Component, OnInit, Renderer2 } from '@angular/core';
import { faSleigh } from '@fortawesome/free-solid-svg-icons';
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
  showDiv: boolean = false;
  retrievedImage: any;
  constructor(private storageService: StorageService, private userService: UserService, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.currentUserInfo = this.storageService.getUser();
    if (this.currentUserInfo != null) {
      this.currentUserInfo.token = this.storageService.getToken();
      this.getUserData();
    }
    this.doctorSlot.slotDuration = 0;
  }
  getUserData() {
    this.userService.getUser(this.currentUserInfo).subscribe((data: User) => {
      this.currentUser = data;
      if (this.currentUser.imageData != null && this.currentUser.imageData != undefined) {
        this.retrievedImage = 'data:image/jpeg;base64,' + this.currentUser.imageData;
      }
    });
  }
  checkSlotDuration() {
    if (this.doctorSlot.slotDuration == 0 || this.doctorSlot.slotDuration == undefined) {
      this.showDiv = false;
      alert('Please Select Slot Duration');
      this.doctorSlot.slotDuration = 0;
    } else {
      this.showDiv = true;
    }
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
  updateStartTime() {
    this.doctorSlot.startTime = this.getStartTime(this.doctorSlot.endTime, this.doctorSlot.slotDuration);
  }
  getStartTime(endTime: any, increment: any): any {
    endTime = endTime.toString().split(':');
    var endHr = parseInt(endTime[0], 10);
    var endMin = parseInt(endTime[1], 10);
    increment = parseInt(increment, 10);
    var startTime = '';
    if (endMin >= increment) {
      endMin = endMin - increment;
    } else {
      endMin = endMin - increment;
    }
    if (endMin < 0) {
      endMin = (endMin === 0) ? 0 : endMin + 60;
      endHr -= 1;
    }
    startTime = endHr + ':' + this.pad(endMin);
    return startTime;
  }
  updateEndTime() {
    this.doctorSlot.endTime = this.getEndTime(this.doctorSlot.startTime, this.doctorSlot.slotDuration);
  }

  getEndTime(startTime: any, increment: any): any {
    startTime = startTime.toString().split(':');
    var startHr = parseInt(startTime[0], 10);
    var startMin = parseInt(startTime[1], 10);
    increment = parseInt(increment, 10);
    var endTime = '';
    startMin = startMin + increment;
    if ((startMin % 60) === 0 || startMin > 60) {
      startMin = (startMin === 60) ? 0 : startMin - 60;
      startHr += 1;
    }
    endTime = startHr + ':' + this.pad(startMin);
    return endTime;
  }

  onSubmit() {
    if (this.validateTimings()) {
      this.showDiv = false;
    }
  }

  validateTimings(): boolean {
    if (this.doctorSlot.startTime == "" || this.doctorSlot.startTime == undefined) {
      alert('Please Select Start Time');
      // const element = this.renderer.selectRootElement('#startTime');
      // setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.doctorSlot.endTime == "" || this.doctorSlot.endTime == undefined) {
      alert('Please Select End Time');
      // const element = this.renderer.selectRootElement('#endTime');
      // setTimeout(() => element.focus(), 0);
      return false;
    } else {
      return true;
    }

  }

}
