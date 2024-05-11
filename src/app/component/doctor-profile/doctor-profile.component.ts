import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppValidations } from 'src/app/constant/app-validations';
import { ApiResponse } from 'src/app/model/api-response';
import { Appointment } from 'src/app/model/appointment';
import { User } from 'src/app/model/user';
import { UserInfo } from 'src/app/model/user-info';
import { CommonService } from 'src/app/service/common.service';
import { StorageService } from 'src/app/service/storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.css']
})
export class DoctorProfileComponent implements OnInit {
  id: any;
  form: any = {};
  message: any;
  statusFlag: Boolean = false;
  currentUserInfo: UserInfo = new UserInfo;
  currentUser: User = new User;
  doctor: User = new User;
  appointment: Appointment = new Appointment;
  termsAndConditionsFlag: Boolean = false;
  retrievedImage: any;
  constructor(private storageService: StorageService, private userService: UserService,
    private commonService: CommonService, private activatedRoute: ActivatedRoute, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      console.log(params);
      this.id = params['id'];
      if (this.id != undefined) {
        this.getDoctorData();
      }
    });
    this.currentUserInfo = this.storageService.getUser();
    if (this.currentUserInfo != null) {
      this.currentUserInfo.token = this.storageService.getToken();
      this.getUserData();
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
  getDoctorData() {
    this.commonService.getDoctorById(this.id).subscribe((data: User) => {
      this.doctor = data;
    });
  }
  changeTermsAndConditions() {
    this.termsAndConditionsFlag = !this.termsAndConditionsFlag;
    if (this.termsAndConditionsFlag) {
      this.appointment.termsAndConditions = 'Y';
    } else {
      this.appointment.termsAndConditions = 'N';
    }
  }
  validateAskYourQuestionForm(): boolean {
    if (this.form.name == "" || this.form.name == undefined) {
      alert('Please Enter Name');
      const element = this.renderer.selectRootElement('#name');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (!AppValidations.validateName(this.form.name)) {
      const element = this.renderer.selectRootElement('#name');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.form.email == "" || this.form.email == undefined) {
      alert('Please Enter email');
      const element = this.renderer.selectRootElement('#email');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (!AppValidations.validateMail(this.form.email)) {
      const element = this.renderer.selectRootElement('#email');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.form.yourQuestion == "" || this.form.yourQuestion == undefined) {
      alert('Please Enter Your Question');
      const element = this.renderer.selectRootElement('#yourQuestion');
      setTimeout(() => element.focus(), 0);
      return false;
    } else {
      return true;
    }
  }
  onSubmit() {
    if (this.validateAskYourQuestionForm()) {
      this.commonService.sendUserQuestion(this.form).subscribe((data: ApiResponse) => {
        this.message = data.message;
        if (data.success) {
          this.statusFlag = data.success;
          this.resetForm();
        }
        // need to remove below 2 lines
        alert(this.message);
        this.statusFlag = true;
        this.resetForm();
      });
    }
  }
  resetForm() {
    this.statusFlag = false;
    this.form.name == '';
    this.form.email == '';
    this.form.yourQuestion == '';
    window.location.reload();
  }

}
