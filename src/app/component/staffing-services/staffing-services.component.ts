import { Component, OnInit, Renderer2 } from '@angular/core';
import { AppValidations } from 'src/app/constant/app-validations';
import { MessageConstants } from 'src/app/constant/message-constants';
import { ApiResponse } from 'src/app/model/api-response';
import { Appointment } from 'src/app/model/appointment';
import { Staffing } from 'src/app/model/staffing';
import { User } from 'src/app/model/user';
import { UserInfo } from 'src/app/model/user-info';
import { CommonService } from 'src/app/service/common.service';
import { StorageService } from 'src/app/service/storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-staffing-services',
  templateUrl: './staffing-services.component.html',
  styleUrls: ['./staffing-services.component.css']
})
export class StaffingServicesComponent implements OnInit {
  message: any;
  statusFlag: boolean = false;
  currentUserInfo: UserInfo = new UserInfo;
  currentUser: User = new User;
  staffing: Staffing = new Staffing;
  constructor(private storageService: StorageService, private userService: UserService,
    private commonService: CommonService, private renderer: Renderer2) { }

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
  validateStaffingData(): boolean {
    if (this.staffing.name == "" || this.staffing.name == undefined) {
      alert('Please Enter Name');
      const element = this.renderer.selectRootElement('#name');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (!AppValidations.validateName(this.staffing.name)) {
      const element = this.renderer.selectRootElement('#name');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.staffing.email == "" || this.staffing.email == undefined) {
      alert('Please Enter email');
      const element = this.renderer.selectRootElement('#email');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (!AppValidations.validateMail(this.staffing.email)) {
      const element = this.renderer.selectRootElement('#email');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.staffing.phoneNumber == "" || this.staffing.phoneNumber == undefined) {
      alert('Please Enter Phone Number');
      const element = this.renderer.selectRootElement('#phoneNumber');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (!AppValidations.validatePhoneNumber(this.staffing.phoneNumber)) {
      const element = this.renderer.selectRootElement('#phoneNumber');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.staffing.hospitalName == "" || this.staffing.hospitalName == undefined) {
      alert('Please Enter Hospital Name');
      const element = this.renderer.selectRootElement('#hospitalName');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (!AppValidations.validateName(this.staffing.hospitalName)) {
      const element = this.renderer.selectRootElement('#hospitalName');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.staffing.staffingNeeds == "" || this.staffing.staffingNeeds == undefined) {
      alert('Please Enter Staffing Needs');
      const element = this.renderer.selectRootElement('#staffingNeeds');
      setTimeout(() => element.focus(), 0);
      return false;
    } else {
      return true;
    }
  }
  onSubmit() {
    if (this.validateStaffingData()) {
      this.commonService.sendStaffingData(this.staffing).subscribe((data: ApiResponse) => {
        this.message = data.message;
        if (this.message == MessageConstants.StaffingMessage) {
          this.statusFlag = true;
          this.staffing = new Staffing;
          //this.router.navigate(['/bookingSuccess']);
        }
      });
    }
  }

}
