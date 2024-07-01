import { DatePipe } from '@angular/common';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { MessageConstants } from 'src/app/constant/message-constants';
import { DoctorSlot } from 'src/app/model/doctor-slot';
import { MessageResponse } from 'src/app/model/message-response';
import { Slot } from 'src/app/model/slot';
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
  doctorSlots: DoctorSlot[] = [];
  slotList: Slot[] = [];
  startTimeList: string[] = [];
  endTimeList: string[] = [];
  slotListMonday: Slot[] = [];
  slotListTuesday: Slot[] = [];
  slotListWednesday: Slot[] = [];
  slotListThursday: Slot[] = [];
  slotListFriday: Slot[] = [];
  slotListSaturday: Slot[] = [];
  slotListSunday: Slot[] = [];
  isMonday: boolean = false;
  isTuesday: boolean = false;
  isWednesday: boolean = false;
  isThursday: boolean = false;
  isFriday: boolean = false;
  isSaturday: boolean = false;
  isSunday: boolean = false;
  isMondayData: boolean = false;
  isTuesdayData: boolean = false;
  isWednesdayData: boolean = false;
  isThursdayData: boolean = false;
  isFridayData: boolean = false;
  isSaturdayData: boolean = false;
  isSundayData: boolean = false;
  showAddDiv: boolean = false;
  showEditDiv: boolean = false;
  slotDurationMonday: number = 0;
  slotDurationTuesday: number = 0;
  slotDurationWednesday: number = 0;
  slotDurationThursday: number = 0;
  slotDurationFriday: number = 0;
  slotDurationSaturday: number = 0;
  slotDurationSunday: number = 0;
  retrievedImage: any;

  daysList = [
    { label: 'MONDAY', id: '#slot_monday', selected: true },
    { label: 'TUESDAY', id: '#slot_tuesday', selected: false },
    { label: 'WEDNESDAY', id: '#slot_wednesday', selected: false },
    { label: 'THURSDAY', id: '#slot_thursday', selected: false },
    { label: 'FRIDAY', id: '#slot_friday', selected: false },
    { label: 'SATURDAY', id: '#slot_saturday', selected: false },
    { label: 'SUNDAY', id: '#slot_sunday', selected: false }
  ];

  constructor(private router: Router, private storageService: StorageService,
    private userService: UserService, private renderer: Renderer2, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.currentUserInfo = this.storageService.getDoctorUser();
    if (this.currentUserInfo != null) {
      this.currentUserInfo.token = this.storageService.getDoctorToken();
      this.getUserData();
    } else {
      this.router.navigate(['/loginEmail']);
    }
    this.doctorSlot.slotDuration = 0;
    if (this.slotList.length == 0) {
      let slot = new Slot;
      slot.index = 1;
      this.slotList.push(slot);
    }
  }
  getUserData() {
    this.userService.getUser(this.currentUserInfo).subscribe((data: User) => {
      this.currentUser = data;
      if (this.currentUser.imageData != null && this.currentUser.imageData != undefined) {
        this.retrievedImage = 'data:image/jpeg;base64,' + this.currentUser.imageData;
      }
      if (this.currentUser.doctorDetails != null && this.currentUser.doctorDetails != undefined) {
        if (this.currentUser.doctorDetails.doctorSlots != null && this.currentUser.doctorDetails.doctorSlots != undefined) {
          this.doctorSlot.slotDuration = this.currentUser.doctorDetails.doctorSlots[0].slotDuration;
          for (let index = 0; index < this.currentUser.doctorDetails.doctorSlots.length; index++) {
            const doctorSlot = this.currentUser.doctorDetails.doctorSlots[index];
            if (doctorSlot.dayName == 'Monday') {
              this.slotListMonday = doctorSlot.slots;
              this.isMondayData = true;
              this.slotDurationMonday = doctorSlot.slotDuration;
            }
            if (doctorSlot.dayName == 'Tuesday') {
              this.slotListTuesday = doctorSlot.slots;
              this.isTuesdayData = true;
              this.slotDurationTuesday = doctorSlot.slotDuration;
            }
            if (doctorSlot.dayName == 'Wednesday') {
              this.slotListWednesday = doctorSlot.slots;
              this.isWednesdayData = true;
              this.slotDurationWednesday = doctorSlot.slotDuration;
            }
            if (doctorSlot.dayName == 'Thursday') {
              this.slotListThursday = doctorSlot.slots;
              this.isThursdayData = true;
              this.slotDurationThursday = doctorSlot.slotDuration;
            }
            if (doctorSlot.dayName == 'Friday') {
              this.slotListFriday = doctorSlot.slots;
              this.isFridayData = true;
              this.slotDurationFriday = doctorSlot.slotDuration;
            }
            if (doctorSlot.dayName == 'Saturday') {
              this.slotListSaturday = doctorSlot.slots;
              this.isSaturdayData = true;
              this.slotDurationSaturday = doctorSlot.slotDuration;
            }
            if (doctorSlot.dayName == 'Sunday') {
              this.slotListSunday = doctorSlot.slots;
              this.isSundayData = true;
              this.slotDurationSunday = doctorSlot.slotDuration;
            }
          }
        }
      }
    });
  }
  checkSlotDuration(day: string) {
    if (day == 'Monday') {
      this.isMonday = true;
      this.isTuesday = false;
      this.isWednesday = false;
      this.isThursday = false;
      this.isFriday = false;
      this.isSaturday = false;
      this.isSunday = false;
    } else if (day == 'Tuesday') {
      this.isMonday = false;
      this.isTuesday = true;
      this.isWednesday = false;
      this.isThursday = false;
      this.isFriday = false;
      this.isSaturday = false;
      this.isSunday = false;
    } else if (day == 'Wednesday') {
      this.isMonday = false;
      this.isTuesday = false;
      this.isWednesday = true;
      this.isThursday = false;
      this.isFriday = false;
      this.isSaturday = false;
      this.isSunday = false;
    } else if (day == 'Thursday') {
      this.isMonday = false;
      this.isTuesday = false;
      this.isWednesday = false;
      this.isThursday = true;
      this.isFriday = false;
      this.isSaturday = false;
      this.isSunday = false;
    } else if (day == 'Friday') {
      this.isMonday = false;
      this.isTuesday = false;
      this.isWednesday = false;
      this.isThursday = false;
      this.isFriday = true;
      this.isSaturday = false;
      this.isSunday = false;
    } else if (day == 'Saturday') {
      this.isMonday = false;
      this.isTuesday = false;
      this.isWednesday = false;
      this.isThursday = false;
      this.isFriday = false;
      this.isSaturday = true;
      this.isSunday = false;
    } else if (day == 'Sunday') {
      this.isMonday = false;
      this.isTuesday = false;
      this.isWednesday = false;
      this.isThursday = false;
      this.isFriday = false;
      this.isSaturday = false;
      this.isSunday = true;
    }
    if (this.doctorSlot.slotDuration == 0 || this.doctorSlot.slotDuration == undefined) {
      this.showAddDiv = false;
      alert('Please Select Slot Duration');
      this.doctorSlot.slotDuration = 0;
    } else {
      this.showAddDiv = true;
    }
  }
  onEdit(day: string) {
    if (day == 'Monday') {
      this.doctorSlot.slotDuration = this.slotDurationMonday;
      this.slotList = this.slotListMonday.slice();
    } else if (day == 'Tuesday') {
      this.doctorSlot.slotDuration = this.slotDurationTuesday;
      this.slotList = this.slotListTuesday.slice();
    } else if (day == 'Wednesday') {
      this.doctorSlot.slotDuration = this.slotDurationWednesday;
      this.slotList = this.slotListWednesday.slice();
    } else if (day == 'Thursday') {
      this.doctorSlot.slotDuration = this.slotDurationThursday;
      this.slotList = this.slotListThursday.slice();
    } else if (day == 'Friday') {
      this.doctorSlot.slotDuration = this.slotDurationFriday;
      this.slotList = this.slotListFriday.slice();
    } else if (day == 'Saturday') {
      this.doctorSlot.slotDuration = this.slotDurationSaturday;
      this.slotList = this.slotListSaturday.slice();
    } else if (day == 'Sunday') {
      this.doctorSlot.slotDuration = this.slotDurationSunday;
      this.slotList = this.slotListSunday.slice();
    }
    for (let i = 0; i < this.slotList.length; i++) {
      this.slotList[i].index = i + 1;
     // alert(this.slotList[i].);
    }
    this.makeTimeIntervals('9:00', '19:00', this.doctorSlot.slotDuration);
    this.showEditDiv = true;
  }
  getTimeIntervals() {
    this.startTimeList = [];
    this.endTimeList = [];
    this.slotList = [];
    this.makeTimeIntervals('9:00', '19:00', this.doctorSlot.slotDuration);
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
      this.startTimeList.push(this.convertTime24To12Hours(previous));
      this.endTimeList.push(this.convertTime24To12Hours(current));

      previous = current;
    } while (currentHr !== endHr);

  }
  pad(n: any) {
    return (n < 10) ? '0' + n.toString() : n;
  }

  addMoreSlot() {
    let slot = new Slot;
    slot.index = this.slotList.length + 1;
    this.slotList.push(slot);
  }
  deleteSlot(index: any, day: string) {
    if (day == 'Monday') {
      this.slotListMonday = this.slotListMonday.filter(obj => obj.index != index);
    } else if (day == 'Tuesday') {
      this.slotListTuesday = this.slotListTuesday.filter(obj => obj.index != index);
    } else if (day == 'Wednesday') {
      this.slotListWednesday = this.slotListWednesday.filter(obj => obj.index != index);
    } else if (day == 'Thursday') {
      this.slotListThursday = this.slotListThursday.filter(obj => obj.index != index);
    } else if (day == 'Friday') {
      this.slotListFriday = this.slotListFriday.filter(obj => obj.index != index);
    } else if (day == 'Saturday') {
      this.slotListSaturday = this.slotListSaturday.filter(obj => obj.index != index);
    } else if (day == 'Sunday') {
      this.slotListSunday = this.slotListSunday.filter(obj => obj.index != index);
    } else {
      this.slotList = this.slotList.filter(obj => obj.index != index);
    }
  }
  updateSlotStartTime(slotIndex: number, counter: number) {
    for (let i = 0; i < this.slotList.length; i++) {
      if (this.slotList[i].index === slotIndex && this.slotList[i].index === counter + 1) {
        this.slotList[slotIndex].startTime = this.getStartTime(this.slotList[slotIndex].endTime, this.doctorSlot.slotDuration);
      }
    }
  }
  updateSlotEndTime(slotIndex: number, counter: number) {
    for (let i = 0; i < this.slotList.length; i++) {
      if (this.slotList[i].index === slotIndex && this.slotList[i].index === counter + 1) {
        this.slotList[slotIndex].endTime = this.getEndTime(this.slotList[slotIndex].startTime, this.doctorSlot.slotDuration);
      }
    }
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
    if (this.validateSlotTimings()) {
      if (this.isMonday) {
        this.slotListMonday = this.slotList.slice();
        this.slotList = [];
        if (this.slotListMonday.length > 0) {
          if (this.currentUser.doctorDetails != null && this.currentUser.doctorDetails != undefined) {
            let doctorSlot = new DoctorSlot;
            let date = this.getDateOfNextMonday();
            let dayWeek = Number(this.datePipe.transform(date, 'W'));
            //Week of year w Numeric: minimum digits 1... 53
            //Week of month W Numeric: 1 digit 1... 5
            doctorSlot.dayWeek = dayWeek;
            doctorSlot.slotDate = date;
            doctorSlot.dayName = 'Monday';
            doctorSlot.slots = this.slotListMonday;
            for (let index = 0; index < doctorSlot.slots.length; index++) {
              doctorSlot.slots[index].dayWeek = dayWeek;
              doctorSlot.slots[index].slotDate = date;
              doctorSlot.slots[index].dayName = 'Monday';
              doctorSlot.slots[index].status = 'Slot Created';
              doctorSlot.slots[index].isBooked = false;
            }
            doctorSlot.status = 'Slot Created';
            doctorSlot.isBooked = false;
            if (this.currentUser.doctorDetails.doctorSlots != null && this.currentUser.doctorDetails.doctorSlots != undefined) {
              this.currentUser.doctorDetails.doctorSlots.push(doctorSlot);
            } else {
              this.currentUser.doctorDetails.doctorSlots = [];
              this.currentUser.doctorDetails.doctorSlots.push(doctorSlot);
            }
          }
          this.isMondayData = true;
        }
      } else if (this.isTuesday) {
        this.slotListTuesday = this.slotList.slice();
        this.slotList = [];
        if (this.slotListTuesday.length > 0) {
          if (this.currentUser.doctorDetails != null && this.currentUser.doctorDetails != undefined) {
            let doctorSlot = new DoctorSlot;
            let date = this.getNextDate(this.getDateOfNextMonday(), 1);
            let dayWeek = Number(this.datePipe.transform(date, 'W'));
            doctorSlot.dayWeek = dayWeek;
            doctorSlot.slotDate = date;
            doctorSlot.dayName = 'Tuesday';
            doctorSlot.slots = this.slotListTuesday;
            for (let index = 0; index < doctorSlot.slots.length; index++) {
              doctorSlot.slots[index].dayWeek = dayWeek;
              doctorSlot.slots[index].slotDate = date;
              doctorSlot.slots[index].dayName = 'Tuesday';
              doctorSlot.slots[index].status = 'Slot Created';
              doctorSlot.slots[index].isBooked = false;
            }
            doctorSlot.status = 'Slot Created';
            doctorSlot.isBooked = false;
            if (this.currentUser.doctorDetails.doctorSlots != null && this.currentUser.doctorDetails.doctorSlots != undefined) {
              this.currentUser.doctorDetails.doctorSlots.push(doctorSlot);
            } else {
              this.currentUser.doctorDetails.doctorSlots = [];
              this.currentUser.doctorDetails.doctorSlots.push(doctorSlot);
            }
          }
          this.isTuesdayData = true;
        }
      } else if (this.isWednesday) {
        this.slotListWednesday = this.slotList.slice();
        this.slotList = [];
        if (this.slotListWednesday.length > 0) {
          if (this.currentUser.doctorDetails != null && this.currentUser.doctorDetails != undefined) {
            let doctorSlot = new DoctorSlot;
            let date = this.getNextDate(this.getDateOfNextMonday(), 2);
            let dayWeek = Number(this.datePipe.transform(date, 'W'));
            doctorSlot.dayWeek = dayWeek;
            doctorSlot.slotDate = date;
            doctorSlot.dayName = 'Wednesday';
            doctorSlot.slots = this.slotListWednesday;
            for (let index = 0; index < doctorSlot.slots.length; index++) {
              doctorSlot.slots[index].dayWeek = dayWeek;
              doctorSlot.slots[index].slotDate = date;
              doctorSlot.slots[index].dayName = 'Wednesday';
              doctorSlot.slots[index].status = 'Slot Created';
              doctorSlot.slots[index].isBooked = false;
            }
            doctorSlot.status = 'Slot Created';
            doctorSlot.isBooked = false;
            if (this.currentUser.doctorDetails.doctorSlots != null && this.currentUser.doctorDetails.doctorSlots != undefined) {
              this.currentUser.doctorDetails.doctorSlots.push(doctorSlot);
            } else {
              this.currentUser.doctorDetails.doctorSlots = [];
              this.currentUser.doctorDetails.doctorSlots.push(doctorSlot);
            }
          }
          this.isWednesdayData = true;
        }
      } else if (this.isThursday) {
        this.slotListThursday = this.slotList.slice();
        this.slotList = [];
        if (this.slotListThursday.length > 0) {
          if (this.currentUser.doctorDetails != null && this.currentUser.doctorDetails != undefined) {
            let doctorSlot = new DoctorSlot;
            let date = this.getNextDate(this.getDateOfNextMonday(), 3);
            let dayWeek = Number(this.datePipe.transform(date, 'W'));
            doctorSlot.dayWeek = dayWeek;
            doctorSlot.slotDate = date;
            doctorSlot.dayName = 'Thursday';
            doctorSlot.slots = this.slotListThursday;
            for (let index = 0; index < doctorSlot.slots.length; index++) {
              doctorSlot.slots[index].dayWeek = dayWeek;
              doctorSlot.slots[index].slotDate = date;
              doctorSlot.slots[index].dayName = 'Thursday';
              doctorSlot.slots[index].status = 'Slot Created';
              doctorSlot.slots[index].isBooked = false;
            }
            doctorSlot.status = 'Slot Created';
            doctorSlot.isBooked = false;
            if (this.currentUser.doctorDetails.doctorSlots != null && this.currentUser.doctorDetails.doctorSlots != undefined) {
              this.currentUser.doctorDetails.doctorSlots.push(doctorSlot);
            } else {
              this.currentUser.doctorDetails.doctorSlots = [];
              this.currentUser.doctorDetails.doctorSlots.push(doctorSlot);
            }
          }
          this.isThursdayData = true;
        }
      } else if (this.isFriday) {
        this.slotListFriday = this.slotList.slice();
        this.slotList = [];
        if (this.slotListFriday.length > 0) {
          if (this.currentUser.doctorDetails != null && this.currentUser.doctorDetails != undefined) {
            let doctorSlot = new DoctorSlot;
            let date = this.getNextDate(this.getDateOfNextMonday(), 4);
            let dayWeek = Number(this.datePipe.transform(date, 'W'));
            doctorSlot.dayWeek = dayWeek;
            doctorSlot.slotDate = date;
            doctorSlot.dayName = 'Friday';
            doctorSlot.slots = this.slotListFriday;
            for (let index = 0; index < doctorSlot.slots.length; index++) {
              doctorSlot.slots[index].dayWeek = dayWeek;
              doctorSlot.slots[index].slotDate = date;
              doctorSlot.slots[index].dayName = 'Friday';
              doctorSlot.slots[index].status = 'Slot Created';
              doctorSlot.slots[index].isBooked = false;
            }
            doctorSlot.status = 'Slot Created';
            doctorSlot.isBooked = false;
            if (this.currentUser.doctorDetails.doctorSlots != null && this.currentUser.doctorDetails.doctorSlots != undefined) {
              this.currentUser.doctorDetails.doctorSlots.push(doctorSlot);
            } else {
              this.currentUser.doctorDetails.doctorSlots = [];
              this.currentUser.doctorDetails.doctorSlots.push(doctorSlot);
            }
          }
          this.isFridayData = true;
        }
      } else if (this.isSaturday) {
        this.slotListSaturday = this.slotList.slice();
        this.slotList = [];
        if (this.slotListSaturday.length > 0) {
          if (this.currentUser.doctorDetails != null && this.currentUser.doctorDetails != undefined) {
            let doctorSlot = new DoctorSlot;
            let date = this.getNextDate(this.getDateOfNextMonday(), 5);
            let dayWeek = Number(this.datePipe.transform(date, 'W'));
            doctorSlot.dayWeek = dayWeek;
            doctorSlot.slotDate = date;
            doctorSlot.dayName = 'Saturday';
            doctorSlot.slots = this.slotListSaturday;
            for (let index = 0; index < doctorSlot.slots.length; index++) {
              doctorSlot.slots[index].dayWeek = dayWeek;
              doctorSlot.slots[index].slotDate = date;
              doctorSlot.slots[index].dayName = 'Saturday';
              doctorSlot.slots[index].status = 'Slot Created';
              doctorSlot.slots[index].isBooked = false;
            }
            doctorSlot.status = 'Slot Created';
            doctorSlot.isBooked = false;
            if (this.currentUser.doctorDetails.doctorSlots != null && this.currentUser.doctorDetails.doctorSlots != undefined) {
              this.currentUser.doctorDetails.doctorSlots.push(doctorSlot);
            } else {
              this.currentUser.doctorDetails.doctorSlots = [];
              this.currentUser.doctorDetails.doctorSlots.push(doctorSlot);
            }
          }
          this.isSaturdayData = true;
        }
      } else if (this.isSunday) {
        this.slotListSunday = this.slotList.slice();
        this.slotList = [];
        if (this.slotListSunday.length > 0) {
          if (this.currentUser.doctorDetails != null && this.currentUser.doctorDetails != undefined) {
            let doctorSlot = new DoctorSlot;
            let date = this.getNextDate(this.getDateOfNextMonday(), 6);
            let dayWeek = Number(this.datePipe.transform(date, 'W'));
            doctorSlot.dayWeek = dayWeek;
            doctorSlot.slotDate = date;
            doctorSlot.dayName = 'Sunday';
            doctorSlot.slots = this.slotListSunday;
            for (let index = 0; index < doctorSlot.slots.length; index++) {
              doctorSlot.slots[index].dayWeek = dayWeek;
              doctorSlot.slots[index].slotDate = date;
              doctorSlot.slots[index].dayName = 'Sunday';
              doctorSlot.slots[index].status = 'Slot Created';
              doctorSlot.slots[index].isBooked = false;
            }
            doctorSlot.status = 'Slots Created';
            doctorSlot.isBooked = false;
            if (this.currentUser.doctorDetails.doctorSlots != null && this.currentUser.doctorDetails.doctorSlots != undefined) {
              this.currentUser.doctorDetails.doctorSlots.push(doctorSlot);
            } else {
              this.currentUser.doctorDetails.doctorSlots = [];
              this.currentUser.doctorDetails.doctorSlots.push(doctorSlot);
            }
          }
          this.isSundayData = true;
        }
      }
      if (this.slotList.length == 0) {
        let slot = new Slot;
        slot.index = 1;
        this.slotList.push(slot);
      }
      this.currentUser.token = this.storageService.getDoctorToken();
      this.userService.updateProfile(this.currentUser).subscribe((data: MessageResponse) => {
        this.message = data.message;
        if (this.message == MessageConstants.UpdateProfileMessage) {
          this.storageService.saveDoctorUser(this.currentUser);
        }
      });
    }
  }

  validateSlotTimings(): boolean {
    for (let index = 0; index < this.slotList.length; index++) {
      const element = this.slotList[index];
      if (this.slotList[index].startTime == "" || this.slotList[index].startTime == undefined) {
        alert('Please Select Start Time');
        // const element = this.renderer.selectRootElement('#startTime');
        // setTimeout(() => element.focus(), 0);
        return false;
      } else if (this.slotList[index].endTime == "" || this.slotList[index].endTime == undefined) {
        alert('Please Select End Time');
        // const element = this.renderer.selectRootElement('#endTime');
        // setTimeout(() => element.focus(), 0);
        return false;
      } else if (!this.checkTimeDiff(this.slotList[index].startTime, this.slotList[index].endTime, this.doctorSlot.slotDuration)) {
        alert('Please Select Correct Start Time and End Time At Row-' + (index + 1));
        return false;
      }
    }
    return true;
  }
  checkTimeDiff(startTime: any, endTime: any, slotDuration: number): boolean {
    startTime = startTime.toString().split(':');
    endTime = endTime.toString().split(':');
    var startHr = parseInt(startTime[0], 10);
    var startMin = parseInt(startTime[1], 10);
    var endHr = parseInt(endTime[0], 10);
    var endMin = parseInt(endTime[1], 10);
    var hourDiff = endHr - startHr;
    var minDiff = endMin - startMin;
    // alert('hourDiff :: '+hourDiff);
    // alert('minDiff :: '+minDiff);
    var totalDiff;
    if (hourDiff > 0) {
      totalDiff = (hourDiff * 60) + minDiff;
    } else if (hourDiff < 0) {
      totalDiff = (hourDiff * 60) + minDiff;
    } else {
      totalDiff = minDiff;
    }
    // alert('totalDiff :: '+totalDiff);
    // alert('slotDuration :: '+slotDuration);
    if (totalDiff == slotDuration) {
      return true;
    } else {
      return false;
    }
  }
  convertTime24To12Hours(time24h: any) {
    time24h = time24h.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time24h];
    if (time24h.length > 1) {
      time24h = time24h.slice(1);
      time24h[5] = +time24h[0] < 12 ? ' AM' : ' PM';
      time24h[0] = +time24h[0] % 12 || 12;
    }
    return time24h.join('');
  }
  convertTime12To24Hours(time12h: any) {
    const [time, modifier] = time12h.split(' ');
    let [hours, minutes] = time.split(':');
    if (hours === '12') {
      hours = '00';
    }
    if (modifier === 'PM') {
      hours = parseInt(hours, 10) + 12;
    }
    return `${hours}:${minutes}`;
  }
  getDateOfNextMonday(): Date {
    var date = new Date();
    date.setDate(date.getDate() + (((1 + 7 - date.getDay()) % 7) || 7));
    return date;
  }
  getNextDate(date: Date, increment: any): Date {
    date.setDate(date.getDate() + increment);
    return date;
  }
  getDayName(date: Date): string {
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let dayName = weekday[date.getDay()];
    return dayName;
  }
}
