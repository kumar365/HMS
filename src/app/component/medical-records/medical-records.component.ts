import { Component, OnInit } from '@angular/core';
import { MessageConstants } from 'src/app/constant/message-constants';
import { ApiResponse } from 'src/app/model/api-response';
import { MedicalRecords } from 'src/app/model/medical-records';
import { User } from 'src/app/model/user';
import { UserInfo } from 'src/app/model/user-info';
import { StorageService } from 'src/app/service/storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-medical-records',
  templateUrl: './medical-records.component.html',
  styleUrls: ['./medical-records.component.css']
})
export class MedicalRecordsComponent implements OnInit {
  message: any;
  currentUserInfo: UserInfo = new UserInfo;
  currentUser: User = new User;
  medicalRecords: MedicalRecords = new MedicalRecords;
  medicalRecordsList: MedicalRecords[] = [];
  medicalRecordsFlag: boolean = false;
  constructor(private storageService: StorageService, private userService: UserService) { }
  ngOnInit(): void {
    this.currentUserInfo = this.storageService.getUser();
    this.currentUserInfo.token = this.storageService.getToken();
    this.getUserData();
    this.getMedicalRecordsList();
  }
  getUserData() {
    this.userService.getUser(this.currentUserInfo).subscribe((data: User) => {
      this.currentUser = data;
    });
  }
  addDetails(){
    this.medicalRecordsFlag = false;
    this.medicalRecords = new MedicalRecords;
  }
  onSubmit() {
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
