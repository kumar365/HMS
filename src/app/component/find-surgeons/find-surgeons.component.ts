import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { AppValidations } from 'src/app/constant/app-validations';
import { MessageConstants } from 'src/app/constant/message-constants';
import { ApiResponse } from 'src/app/model/api-response';
import { Appointment } from 'src/app/model/appointment';
import { User } from 'src/app/model/user';
import { UserInfo } from 'src/app/model/user-info';
import { CommonService } from 'src/app/service/common.service';
import { StorageService } from 'src/app/service/storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-find-surgeons',
  templateUrl: './find-surgeons.component.html',
  styleUrls: ['./find-surgeons.component.css']
})
export class FindSurgeonsComponent implements OnInit {
  message: any;
  statusFlag: boolean = false;
  currentUserInfo: UserInfo = new UserInfo;
  currentUser: User = new User;
  appointment: Appointment = new Appointment;
  constructor(private router: Router, private storageService: StorageService, private userService: UserService, 
    private commonService: CommonService, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.currentUserInfo = this.storageService.getUser();
    if (this.currentUserInfo != null) {
      this.currentUserInfo.token = this.storageService.getToken();
      this.getUserData();
    }
    this.appointment.user = new User;
  }
  getUserData() {
    this.userService.getUser(this.currentUserInfo).subscribe((data: User) => {
      this.currentUser = data;
    });
  }
  validateAppointmentDetails(): boolean {
    if (this.appointment.user.firstName == "" || this.appointment.user.firstName == undefined) {
      alert('Please Enter Name');
      const element = this.renderer.selectRootElement('#firstName');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (!AppValidations.validateName(this.appointment.user.firstName)) {
      const element = this.renderer.selectRootElement('#firstName');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.appointment.user.email == "" || this.appointment.user.email == undefined) {
      alert('Please Enter Email');
      const element = this.renderer.selectRootElement('#email');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (!AppValidations.validateMail(this.appointment.user.email)) {
      const element = this.renderer.selectRootElement('#email');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.appointment.user.phoneNumber == "" || this.appointment.user.phoneNumber == undefined) {
      alert('Please Enter Phone Number');
      const element = this.renderer.selectRootElement('#phoneNumber');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (!AppValidations.validatePhoneNumber(this.appointment.user.phoneNumber)) {
      const element = this.renderer.selectRootElement('#phoneNumber');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.appointment.symtoms == "" || this.appointment.symtoms == undefined) {
      alert('Please Enter your Health Concern');
      const element = this.renderer.selectRootElement('#symtoms');
      setTimeout(() => element.focus(), 0);
      return false;
    } else {
      return true;
    }
  }
  onSubmit() {
    this.appointment.termsAndConditions = 'Y';
    this.appointment.paymentMethod = 'offline';
    this.appointment.consultationType = 'Clinic Visit';
    this.appointment.user.password = this.appointment.user.email;
    if (this.validateAppointmentDetails()) {
      alert('onSubmit');
      this.commonService.saveAppointment(this.appointment).subscribe((data: ApiResponse) => {
        this.message = data.message;
        if (this.message == MessageConstants.AppointmentMessage) {
          this.statusFlag = true;
          this.appointment = new Appointment;
          this.router.navigate(['/bookingSuccess']);
        }
      });
    }
  }
}
