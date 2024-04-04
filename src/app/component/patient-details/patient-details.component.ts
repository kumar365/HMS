import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppValidations } from 'src/app/constant/app-validations';
import { MessageConstants } from 'src/app/constant/message-constants';
import { ApiResponse } from 'src/app/model/api-response';
import { Appointment } from 'src/app/model/appointment';
import { Dependent } from 'src/app/model/dependent';
import { User } from 'src/app/model/user';
import { UserInfo } from 'src/app/model/user-info';
import { StorageService } from 'src/app/service/storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css']
})
export class PatientDetailsComponent implements OnInit {
  message: any;
  statusFlag: boolean = false;
  currentUserInfo: UserInfo = new UserInfo;
  currentUser: User = new User;
  appointment: Appointment = new Appointment;
  termsAndConditionsFlag: Boolean = false;
  dependent: Dependent = new Dependent;
  dependentList: Dependent[] = [];
  dependentFlag: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private storageService: StorageService,
    private userService: UserService, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.currentUserInfo = this.storageService.getUser();
    if (this.currentUserInfo != null) {
      this.currentUserInfo.token = this.storageService.getToken();
      this.getUserData();
      this.getDependentList();
    }
  }
  getUserData() {
    this.userService.getUser(this.currentUserInfo).subscribe((data: User) => {
      this.currentUser = data;
      if (this.currentUser == undefined) {
        this.appointment.user = new User;
        this.appointment.user.firstName = "user";
        this.appointment.user.lastName = "kumar";
        this.appointment.user.email = "user@gmail.com";
        this.appointment.user.phoneNumber = "9090909090";
      } else {
        this.appointment.user = this.currentUser;
      }
      this.appointment.paymentMethod = "On line";
      this.appointment.termsAndConditions = "Y";
    });
  }
  getDependentList() {
    this.userService.getDependentList(this.currentUserInfo.id, this.currentUserInfo.token).subscribe((data: Dependent[]) => {
      this.dependentList = data;

    });
  }
  addDetails() {
    this.dependentFlag = false;
    this.dependent = new Dependent;
  }
  validateAppointmentDetails(): boolean {
    if (this.appointment.appointmentFor == "" || this.appointment.appointmentFor == undefined) {
      alert('Please Select Appointment For');
      const element = this.renderer.selectRootElement('#appointmentFor');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.appointment.insurance == "" || this.appointment.insurance == undefined) {
      alert('Please Select Insurance');
      const element = this.renderer.selectRootElement('#insurance');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.appointment.reason == "" || this.appointment.reason == undefined) {
      alert('Please Enter Reason');
      const element = this.renderer.selectRootElement('#reason');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (!AppValidations.validateName(this.appointment.reason)) {
      const element = this.renderer.selectRootElement('#reason');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.appointment.symtoms == "" || this.appointment.symtoms == undefined) {
      alert('Please Enter Symtoms');
      const element = this.renderer.selectRootElement('#symtoms');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (!AppValidations.validateSymptoms(this.appointment.symtoms)) {
      const element = this.renderer.selectRootElement('#symtoms');
      setTimeout(() => element.focus(), 0);
      return false;
    } else {
      return true;
    }
  }
  changeTermsAndConditions() {
    this.termsAndConditionsFlag = !this.termsAndConditionsFlag;
    if (this.termsAndConditionsFlag) {
      this.appointment.termsAndConditions = 'Y';
    } else {
      this.appointment.termsAndConditions = 'N';
    }
  }

  onSubmit() {
    if (this.validateAppointmentDetails()) {
      this.userService.saveAppointment(this.appointment, this.currentUserInfo.token).subscribe((data: ApiResponse) => {
        this.message = data.message;
        if (this.message == MessageConstants.AppointmentMessage) {
          this.statusFlag = true;
          this.appointment = new Appointment;
          this.router.navigate(['/consultation']);
        }
      });
    }
  }
}
