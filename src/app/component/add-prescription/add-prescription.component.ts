import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { AppValidations } from 'src/app/constant/app-validations';
import { MessageConstants } from 'src/app/constant/message-constants';
import { MessageResponse } from 'src/app/model/message-response';
import { Prescription } from 'src/app/model/prescription';
import { User } from 'src/app/model/user';
import { UserInfo } from 'src/app/model/user-info';
import { StorageService } from 'src/app/service/storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-add-prescription',
  templateUrl: './add-prescription.component.html',
  styleUrls: ['./add-prescription.component.css']
})
export class AddPrescriptionComponent implements OnInit {
  message: any;
  statusFlag: boolean = false;
  currentUserInfo: UserInfo = new UserInfo;
  currentUser: User = new User;
  prescription: Prescription = new Prescription;
  prescriptionList: Prescription[] = [];
  constructor(private storageService: StorageService, private userService: UserService,
    private router: Router, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.currentUserInfo = this.storageService.getUser();
    if (this.currentUserInfo != null) {
      this.currentUserInfo.token = this.storageService.getToken();
      this.getUserData();
    }
    this.prescription.createdDate = new Date();
    //this.prescriptionList.push(this.prescription);
  }
  getUserData() {
    this.userService.getUser(this.currentUserInfo).subscribe((data: User) => {
      this.currentUser = data;
    });
  }
  isChecked(event: any, time: string) {
    if (time == 'morning') {
      this.prescription.prescriptionTime = 1;
    } else if (time == 'afternoon') {
      this.prescription.prescriptionTime = 2;
    } else if (time == 'evening') {
      this.prescription.prescriptionTime = 3;
    } else if (time == 'night') {
      this.prescription.prescriptionTime = 4;
    }
  }
  savePrescription() {
    //alert('inside savePrescription');
    if (this.validatePrescription()) {
      console.log('this.currentUserInfo.token ::' + this.currentUserInfo.token);
      this.userService.savePrescription(this.prescription, this.currentUserInfo.token).subscribe((data: MessageResponse) => {
        this.message = data.message;
        //console.log('this.message::' + this.message);
        if (this.message == MessageConstants.PrescriptionDetailsMessage) {
          this.statusFlag = true;
          this.prescription = new Prescription;
        }
        if (this.statusFlag) {
          this.router.navigate(['/patientProfile']);
        }
      });
    }
  }
  validatePrescription(): boolean {
    if (this.prescription.prescriptionName == "" || this.prescription.prescriptionName == undefined) {
      alert('Please eneter Name');
      const element = this.renderer.selectRootElement('#prescriptionName');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (!AppValidations.validateName(this.prescription.prescriptionName)) {
      const element = this.renderer.selectRootElement('#prescriptionName');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.prescription.quantity <= 0 || this.prescription.quantity == undefined) {
      alert('Please eneter Quantity');
      const element = this.renderer.selectRootElement('#quantity');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.prescription.prescriptionDays == "" || this.prescription.prescriptionDays == undefined) {
      alert('Please eneter Days');
      const element = this.renderer.selectRootElement('#prescriptionDays');
      setTimeout(() => element.focus(), 0);
      return false;
    } else {
      return true;
    }
  }
  clearPrescription() {
    this.prescription = new Prescription;
  }
  reloadPage(): void {
    window.location.reload();
  }
}