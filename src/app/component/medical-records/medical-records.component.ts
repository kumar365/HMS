import { Component, OnInit, Renderer2 } from '@angular/core';
import { AppValidations } from 'src/app/constant/app-validations';
import { MessageConstants } from 'src/app/constant/message-constants';
import { ApiResponse } from 'src/app/model/api-response';
import { MedicalRecords } from 'src/app/model/medical-records';
import { User } from 'src/app/model/user';
import { UserInfo } from 'src/app/model/user-info';
import { CommonService } from 'src/app/service/common.service';
import { StorageService } from 'src/app/service/storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-medical-records',
  templateUrl: './medical-records.component.html',
  styleUrls: ['./medical-records.component.css']
})
export class MedicalRecordsComponent implements OnInit {
  id: any;
  message: any;
  currentUserInfo: UserInfo = new UserInfo;
  currentUser: User = new User;
  doctor: User = new User;
  medicalRecords: MedicalRecords = new MedicalRecords;
  medicalRecordsList: MedicalRecords[] = [];
  medicalRecordsFlag: boolean = false;
  retrievedImage: any;
  constructor(private storageService: StorageService, private userService: UserService,
    private commonService: CommonService, private renderer: Renderer2) { }
  ngOnInit(): void {
    this.currentUserInfo = this.storageService.getUser();
    if (this.currentUserInfo != null) {
      this.currentUserInfo.token = this.storageService.getToken();
      this.getUserData();
      this.getMedicalRecordsList();
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
  addDetails() {
    this.medicalRecordsFlag = false;
    this.medicalRecords = new MedicalRecords;
  }
  validateMedicalRecordData(): boolean {
    if (this.medicalRecords.description == "" || this.medicalRecords.description == undefined) {
      alert('Please Enter Title Name');
      const element = this.renderer.selectRootElement('#description');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (!AppValidations.validateName(this.medicalRecords.description)) {
      const element = this.renderer.selectRootElement('#description');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.medicalRecords.patientType == "" || this.medicalRecords.patientType == undefined) {
      alert('Please Select Patient Type');
      const element = this.renderer.selectRootElement('#patientType');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.medicalRecords.hospitalName == "" || this.medicalRecords.hospitalName == undefined) {
      alert('Please Enter Hospital Name');
      const element = this.renderer.selectRootElement('#hospitalName');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (!AppValidations.validateName(this.medicalRecords.hospitalName)) {
      const element = this.renderer.selectRootElement('#hospitalName');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.medicalRecords.symptoms == "" || this.medicalRecords.symptoms == undefined) {
      alert('Please Enter Symptoms');
      const element = this.renderer.selectRootElement('#symptoms');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (!AppValidations.validateName(this.medicalRecords.symptoms)) {
      const element = this.renderer.selectRootElement('#symptoms');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.medicalRecords.recordDateString == "" || this.medicalRecords.recordDateString == undefined) {
      alert('Please Enter Date');
      const element = this.renderer.selectRootElement('#recordDateString');
      setTimeout(() => element.focus(), 0);
      return false;
    } else {
      return true;
    }
  }
  onSubmit() {
    if (this.validateMedicalRecordData()) {
      this.medicalRecords.user = this.currentUser;
      this.medicalRecords.name = this.currentUser.username;
      this.userService.saveMedicalRecords(this.medicalRecords, this.currentUserInfo.token).subscribe((data: ApiResponse) => {
        this.message = data.message;
        if (this.message == MessageConstants.MedicalRecordsMessage) {
          this.medicalRecordsFlag = true;
          this.getMedicalRecordsList();
          this.medicalRecords = new MedicalRecords;
        }
      });
    }
  }
  getMedicalRecordsList() {
    this.userService.getMedicalRecordsList(this.currentUserInfo.id, this.currentUserInfo.token).subscribe((data: MedicalRecords[]) => {
      this.medicalRecordsList = data;
    });
  }
  delete(medicalRecords: MedicalRecords): void {
    this.userService.deleteMedicalRecords(medicalRecords.id, this.currentUserInfo.token).subscribe((data: ApiResponse) => {
      this.message = data.message;
      console.log('this.message::' + this.message);
      if (this.message === MessageConstants.MedicalRecordsDeleteMessage) {
        this.getMedicalRecordsList();
        this.reloadPage();
      }
    });
  }
  reloadPage(): void {
    window.location.reload();
  }
}
