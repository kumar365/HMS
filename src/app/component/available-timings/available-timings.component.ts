import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { DoctorSlot } from 'src/app/model/doctor-slot';
import { Slot } from 'src/app/model/slot';
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
  retrievedImage: any;
  currentDate: any;
  doctorSlot: DoctorSlot = new DoctorSlot;
  doctorSlots: DoctorSlot[] = [];
  startTimeFlag: boolean = false;
  scheduleDate!: Date;
  constructor(private router: Router, private storageService: StorageService,
    private userService: UserService, private renderer: Renderer2) { }

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
      if (this.currentUser.doctorDetails != null && this.currentUser.doctorDetails != undefined) {
        if (this.currentUser.doctorDetails.doctorSlots != null && this.currentUser.doctorDetails.doctorSlots != undefined) {
          this.doctorSlots = this.currentUser.doctorDetails.doctorSlots;
        }
      }
    });
  }

  searchSlots() {
    if (this.doctorSlot.scheduleDate == null || this.doctorSlot.scheduleDate == undefined) {
      alert('Please Select Date');
      const element = this.renderer.selectRootElement('#scheduleDate');
      setTimeout(() => element.focus(), 0);
    } else {
      this.scheduleDate = this.doctorSlot.scheduleDate;
      for (let index = 0; index < this.doctorSlots.length; index++) {
        if (this.doctorSlot.scheduleDate == this.doctorSlots[index].slotDate) {
          this.doctorSlot = this.doctorSlots[index];
          this.doctorSlot.scheduleDate = this.scheduleDate;
          this.startTimeFlag = true;
        }
      }
    }
  }

}
