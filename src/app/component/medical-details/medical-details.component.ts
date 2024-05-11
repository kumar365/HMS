import { Component, OnInit, Renderer2 } from '@angular/core';
import { AppValidations } from 'src/app/constant/app-validations';
import { MessageConstants } from 'src/app/constant/message-constants';
import { ApiResponse } from 'src/app/model/api-response';
import { MedicalDetails } from 'src/app/model/medical-details';
import { User } from 'src/app/model/user';
import { UserInfo } from 'src/app/model/user-info';
import { StorageService } from 'src/app/service/storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-medical-details',
  templateUrl: './medical-details.component.html',
  styleUrls: ['./medical-details.component.css']
})
export class MedicalDetailsComponent implements OnInit {
  message: any;
  currentUserInfo: UserInfo = new UserInfo;
  currentUser: User = new User;
  medicalDetails: MedicalDetails = new MedicalDetails;
  medicalDetailsList: MedicalDetails[] = [];
  medicalDetailsFlag: boolean = false;
  retrievedImage: any;
  constructor(private storageService: StorageService, private userService: UserService, private renderer: Renderer2) { }
  ngOnInit(): void {
    this.currentUserInfo = this.storageService.getUser();
    if (this.currentUserInfo != null) {
      this.currentUserInfo.token = this.storageService.getToken();
      this.getUserData();
    }
    this.getMedicalDetailsList();
  }
  getUserData() {
    this.userService.getUser(this.currentUserInfo).subscribe((data: User) => {
      this.currentUser = data;
      if (this.currentUser.imageData != null && this.currentUser.imageData != undefined) {
        this.retrievedImage = 'data:image/jpeg;base64,' + this.currentUser.imageData;
      }
    });
  }
  addDetails() {
    this.medicalDetailsFlag = false;
    this.medicalDetails = new MedicalDetails;
  }
  onSubmitEdit() {
    this.onSubmit();
  }
  onSubmit() {
    if (this.validateMedicalDetails()) {
      this.medicalDetails.user = this.currentUser;
      this.medicalDetails.name = this.currentUser.username;
      this.userService.saveMedicalDetails(this.medicalDetails, this.currentUserInfo.token).subscribe((data: ApiResponse) => {
        this.message = data.message;
        if (this.message == MessageConstants.MedicalDetailsMessage) {
          this.medicalDetailsFlag = true;
          this.getMedicalDetailsList();
          this.medicalDetails = new MedicalDetails;
        }
      });
    }
  }
  validateMedicalDetails(): boolean {
    if (this.medicalDetails.bmi == "" || this.medicalDetails.bmi == undefined) {
      alert('Please Enter BMI');
      const element = this.renderer.selectRootElement('#bmi');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (!AppValidations.validateBMI(this.medicalDetails.bmi)) {
      const element = this.renderer.selectRootElement('#bmi');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.medicalDetails.heartRate == "" || this.medicalDetails.heartRate == undefined) {
      alert('Please Enter Heart Rate');
      const element = this.renderer.selectRootElement('#heartRate');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (!AppValidations.validateHeartRate(this.medicalDetails.heartRate)) {
      const element = this.renderer.selectRootElement('#heartRate');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.medicalDetails.weight == "" || this.medicalDetails.weight == undefined) {
      alert('Please Enter Weight');
      const element = this.renderer.selectRootElement('#weight');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (!AppValidations.validateWeight(this.medicalDetails.weight)) {
      const element = this.renderer.selectRootElement('#weight');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.medicalDetails.fbcStatus == "" || this.medicalDetails.fbcStatus == undefined) {
      alert('Please Enter FBC');
      const element = this.renderer.selectRootElement('#fbcStatus');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (!AppValidations.validateFBC(this.medicalDetails.weight)) {
      const element = this.renderer.selectRootElement('#weight');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.medicalDetails.orderDateString == "" || this.medicalDetails.orderDateString == undefined) {
      alert('Please Enter Created Date');
      const element = this.renderer.selectRootElement('#orderDateString');
      setTimeout(() => element.focus(), 0);
      return false;
    } else {
      return true;
    }
  }
  getMedicalDetailsList() {
    this.userService.getMedicalDetailsList(this.currentUserInfo.id, this.currentUserInfo.token).subscribe((data: MedicalDetails[]) => {
      this.medicalDetailsList = data;
    });
  }
  edit(medicalDetails: MedicalDetails) {
    this.medicalDetailsFlag = false;
    this.medicalDetails = medicalDetails;
    medicalDetails.orderDateString = this.convertDateToDateString(medicalDetails.orderDate);
    this.medicalDetails.orderDateString = medicalDetails.orderDateString;
  }
  convertDateToDateString(orderDate: any) {
    var d = new Date(orderDate)
    return [d.getFullYear(), this.pad(d.getMonth() + 1), this.pad(d.getDate())].join('-');
  }
  pad(s: any) { return (s < 10) ? '0' + s : s; }
  delete(medicalDetails: MedicalDetails) {
    this.medicalDetailsFlag = false;
    this.userService.deleteMedicalDetails(medicalDetails.id, this.currentUserInfo.token).subscribe((data: ApiResponse) => {
      this.message = data.message;
      console.log('this.message::' + this.message);
      if (this.message === MessageConstants.MedicalDetailsDeleteMessage) {
        this.getMedicalDetailsList();
        this.reloadPage();
      }
    });
  }
  reloadPage(): void {
    window.location.reload();
  }
}
