import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ambulance } from 'src/app/model/ambulance';
import { User } from 'src/app/model/user';
import { UserInfo } from 'src/app/model/user-info';
import { StorageService } from 'src/app/service/storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-booking-consultation',
  templateUrl: './booking-consultation.component.html',
  styleUrls: ['./booking-consultation.component.css']
})
export class BookingConsultationComponent implements OnInit {
  message: any;
  statusFlag: boolean = false;
  currentUserInfo: UserInfo = new UserInfo;
  currentUser: User = new User;
  ambulance: Ambulance = new Ambulance;
  constructor(private storageService: StorageService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.currentUserInfo = this.storageService.getUser();
    if (this.currentUserInfo != null) {
      this.currentUserInfo.token = this.storageService.getToken();
      this.getUserData();
    }
  }
  getUserData() {
    this.userService.getUser(this.currentUserInfo).subscribe((data: User) => {
      this.currentUser = data;
    });
  }
  onSubmit() {
    if (this.validateBookingConsultation()) {
      this.router.navigate(['/invoiceView']);
    }
  }
  validateBookingConsultation(): boolean {
    return true;
  }
}