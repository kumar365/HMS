import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private storageService: StorageService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.currentUserInfo = this.storageService.getUser();
    this.currentUserInfo.token = this.storageService.getToken();
    this.getUserData();
    this.prescription.createdDate = new Date();
    //this.prescriptionList.push(this.prescription);
  }
  getUserData() {
    this.userService.getUser(this.currentUserInfo).subscribe((data: User) => {
      //console.log('data ::' + data);
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
    if (this.prescription.prescriptionName) {
      alert('Name must be filled out');
    } else if (this.prescription.quantity == 0) {
      alert("Quantity must be filled out");
    } else {
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
  clearPrescription() {
    this.prescription = new Prescription;
  }
  reloadPage(): void {
    window.location.reload();
  }
}