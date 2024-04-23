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
  staffing1: Staffing = new Staffing;
  message1: any;
  statusFlag1: boolean = false;
  staffing2: Staffing = new Staffing;
  message2: any;
  statusFlag2: boolean = false;
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  preview = '';

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
  selectFile(event: any): void {
    this.preview = '';
    this.progress = 0;
    this.selectedFiles = event.target.files;
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      if (file) {
        this.preview = '';
        this.currentFile = file;
        const reader = new FileReader();
        reader.onload = (e: any) => {
          console.log(e.target.result);
          this.preview = e.target.result;
        };
        reader.readAsDataURL(this.currentFile);
      }
    }
  }

  validateStaffing1(): boolean {
    if (this.staffing1.name == "" || this.staffing1.name == undefined) {
      alert('Please Enter Name');
      const element = this.renderer.selectRootElement('#name1');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (!AppValidations.validateName(this.staffing1.name)) {
      const element = this.renderer.selectRootElement('#name1');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.staffing1.email == "" || this.staffing1.email == undefined) {
      alert('Please Enter email');
      const element = this.renderer.selectRootElement('#email1');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (!AppValidations.validateMail(this.staffing1.email)) {
      const element = this.renderer.selectRootElement('#email1');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.staffing1.phoneNumber == "" || this.staffing1.phoneNumber == undefined) {
      alert('Please Enter Phone Number');
      const element = this.renderer.selectRootElement('#phoneNumber1');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (!AppValidations.validatePhoneNumber(this.staffing1.phoneNumber)) {
      const element = this.renderer.selectRootElement('#phoneNumber1');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.staffing1.hospitalName == "" || this.staffing1.hospitalName == undefined) {
      alert('Please Enter Clinic Name');
      const element = this.renderer.selectRootElement('#hospitalName1');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (!AppValidations.validateName(this.staffing1.hospitalName)) {
      const element = this.renderer.selectRootElement('#hospitalName1');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.staffing1.address == "" || this.staffing1.address == undefined) {
      alert('Please Enter Address');
      const element = this.renderer.selectRootElement('#address');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (!AppValidations.validateAddress(this.staffing1.address)) {
      const element = this.renderer.selectRootElement('#address');
      setTimeout(() => element.focus(), 0);
      return false;
    } else {
      return true;
    }
  }

  validateStaffing2(): boolean {
    if (this.staffing2.name == "" || this.staffing2.name == undefined) {
      alert('Please Enter Name');
      const element = this.renderer.selectRootElement('#name2');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (!AppValidations.validateName(this.staffing2.name)) {
      const element = this.renderer.selectRootElement('#name2');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.staffing2.email == "" || this.staffing2.email == undefined) {
      alert('Please Enter email');
      const element = this.renderer.selectRootElement('#email2');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (!AppValidations.validateMail(this.staffing2.email)) {
      const element = this.renderer.selectRootElement('#email2');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.staffing2.phoneNumber == "" || this.staffing2.phoneNumber == undefined) {
      alert('Please Enter Phone Number');
      const element = this.renderer.selectRootElement('#phoneNumber2');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (!AppValidations.validatePhoneNumber(this.staffing2.phoneNumber)) {
      const element = this.renderer.selectRootElement('#phoneNumber2');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.staffing2.degree == "" || this.staffing2.degree == undefined) {
      alert('Please Enter Degree');
      const element = this.renderer.selectRootElement('#degree2');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (!AppValidations.validateName(this.staffing2.degree)) {
      const element = this.renderer.selectRootElement('#degree2');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.staffing2.address == "" || this.staffing2.address == undefined) {
      alert('Please Enter Address');
      const element = this.renderer.selectRootElement('#address2');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (!AppValidations.validateAddress(this.staffing2.address)) {
      const element = this.renderer.selectRootElement('#address2');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.staffing2.file == null || this.staffing2.file == undefined) {
      alert('Please Select File');
      const element = this.renderer.selectRootElement('#file2');
      setTimeout(() => element.focus(), 0);
      return false;
    } else {
      return true;
    }
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

  staffingData() {
    if (this.validateStaffing1()) {
      this.commonService.sendStaffingData(this.staffing1).subscribe((data: ApiResponse) => {
        this.message1 = data.message;
        if (this.message1 == MessageConstants.StaffingMessage) {
          this.statusFlag1 = true;
          this.staffing1 = new Staffing;
        }
      });
    }
  }
  staffingJob() {
    if (this.validateStaffing2()) {
      this.commonService.sendStaffingDataWithFile(this.staffing2).subscribe((data: ApiResponse) => {
        this.message2 = data.message;
        if (this.message2 == MessageConstants.StaffingMessage) {
          this.statusFlag2 = true;
          this.staffing2 = new Staffing;
        }
      });
    }
  }
  sendStaffingData() {
    if (this.validateStaffingData()) {
      this.commonService.sendStaffingData(this.staffing).subscribe((data: ApiResponse) => {
        this.message = data.message;
        if (this.message == MessageConstants.StaffingMessage) {
          this.statusFlag = true;
          this.staffing = new Staffing;
        }
      });
    }
  }

}
