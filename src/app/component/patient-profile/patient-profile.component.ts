import { Component, OnInit } from '@angular/core';
import { MessageConstants } from 'src/app/constant/message-constants';
import { ApiResponse } from 'src/app/model/api-response';
import { Appointment } from 'src/app/model/appointment';
import { Bill } from 'src/app/model/bill';
import { MedicalRecords } from 'src/app/model/medical-records';
import { Prescription } from 'src/app/model/prescription';
import { User } from 'src/app/model/user';
import { UserInfo } from 'src/app/model/user-info';
import { PaymentService } from 'src/app/service/payment.service';
import { StorageService } from 'src/app/service/storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.css']
})
export class PatientProfileComponent implements OnInit {
  public imagePath: any;
  imgURL: any;
  public message: string | undefined;
  statusFlag: boolean = false;
  currentUserInfo: UserInfo = new UserInfo;
  currentUser: User = new User;
  appointmentList: Appointment[] = [];
  prescription: Prescription = new Prescription;
  prescriptionList: Prescription[] = [];
  medicalRecords: MedicalRecords = new MedicalRecords;
  medicalRecordsList: MedicalRecords[] = [];
  medicalRecordsFlag: boolean = false;
  bill: Bill = new Bill;
  billList: Bill[] = [];
  billFlag: boolean = false;

  constructor(private storageService: StorageService, private userService: UserService, private paymentService: PaymentService) { }

  ngOnInit(): void {
    this.currentUserInfo = this.storageService.getUser();
    this.currentUserInfo.token = this.storageService.getToken();
    this.getUserData();
    //this.getAppointmentList();
    this.getPrescriptionList();
    this.getMedicalRecordsList();
    this.getBillList();
    this.prescription.createdDate = new Date();
  }
  getUserData() {
    this.userService.getUser(this.currentUserInfo).subscribe((data: User) => {
      //console.log('data ::' + data);
      this.currentUser = data;
    });
  }
  getAppointmentList() {
    this.userService.getAppointmentList(this.currentUserInfo.id, this.currentUserInfo.token).subscribe((data: Appointment[]) => {
      this.appointmentList = data;
    });
  }
  getPrescriptionList() {
    this.userService.getPrescriptionList(this.currentUserInfo.id, this.currentUserInfo.token).subscribe((data: Prescription[]) => {
      this.prescriptionList = data;
      console.log('prescriptionList length ::' + data.length);
    });
  }
  addDetails() {
    this.medicalRecordsFlag = false;
    this.medicalRecords = new MedicalRecords;
  }
  saveMedicalRecords() {
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
  getBillList() {
    this.paymentService.getBillList(this.currentUserInfo.id, this.currentUserInfo.token).subscribe((data: Bill[]) => {
      this.billList = data;
      console.log('billList length ::' + data.length);
    });
  }
}
