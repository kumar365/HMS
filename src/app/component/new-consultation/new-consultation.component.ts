import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { AppValidations } from 'src/app/constant/app-validations';
import { Consultation } from 'src/app/model/consultation';
import { User } from 'src/app/model/user';
import { UserInfo } from 'src/app/model/user-info';
import { StorageService } from 'src/app/service/storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-new-consultation',
  templateUrl: './new-consultation.component.html',
  styleUrls: ['./new-consultation.component.css']
})
export class NewConsultationComponent implements OnInit {
  message: any;
  statusFlag: boolean = false;
  currentUserInfo: UserInfo = new UserInfo;
  currentUser: User = new User;
  consultation: Consultation = new Consultation;
  firstDivFlag: boolean = true;
  secondDivFlag: boolean = false;
  thirdDivFlag: boolean = false;
  retrievedImage: any;
  constructor(private router: Router, private storageService: StorageService,
    private userService: UserService, private renderer: Renderer2) { }

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
      if (this.currentUser.imageData != null && this.currentUser.imageData != undefined) {
        this.retrievedImage = 'data:image/jpeg;base64,' + this.currentUser.imageData;
      }
    });
  }

  validateFirstDivData(): boolean {
    if (this.consultation.symptoms == "" || this.consultation.symptoms == undefined) {
      alert('Please Enter Symptoms');
      const element = this.renderer.selectRootElement('#symptoms');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (!AppValidations.validateSymptoms(this.consultation.symptoms)) {
      const element = this.renderer.selectRootElement('#symptoms');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.consultation.speciality == "" || this.consultation.speciality == undefined) {
      alert('Please Select speciality');
      const element = this.renderer.selectRootElement('#speciality');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.consultation.phoneNumber == "" || this.consultation.phoneNumber == undefined) {
      alert('Please Enter Phone Number');
      const element = this.renderer.selectRootElement('#phoneNumber');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (!AppValidations.validatePhoneNumber(this.consultation.phoneNumber)) {
      const element = this.renderer.selectRootElement('#phoneNumber');
      setTimeout(() => element.focus(), 0);
      return false;
    } else {
      return true;
    }
  }
  secondDiv() {
    if (this.validateFirstDivData()) {
      this.firstDivFlag = false;
      this.secondDivFlag = true;
      this.thirdDivFlag = false;
    }
  }
  validateSecondDivData(): boolean {
    if (this.consultation.consultationType == "" || this.consultation.consultationType == undefined) {
      alert('Please Select Consultation Type');
      const element = this.renderer.selectRootElement('#consultationType');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.consultation.patientName == "" || this.consultation.patientName == undefined) {
      alert('Please Enter Patient Name');
      const element = this.renderer.selectRootElement('#patientName');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (!AppValidations.validateName(this.consultation.patientName)) {
      const element = this.renderer.selectRootElement('#patientName');
      setTimeout(() => element.focus(), 0);
      return false;
    } else {
      return true;
    }
  }
  onSubmit() {
    if (this.validateFirstDivData() && this.validateSecondDivData()) {
      this.firstDivFlag = false;
      this.secondDivFlag = false;
      this.thirdDivFlag = false;
      this.router.navigate(['/consultationCheckout']);
    }
  }
}
