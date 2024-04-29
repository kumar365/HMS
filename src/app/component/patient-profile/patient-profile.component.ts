import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppValidations } from 'src/app/constant/app-validations';
import { MessageConstants } from 'src/app/constant/message-constants';
import { ApiResponse } from 'src/app/model/api-response';
import { Appointment } from 'src/app/model/appointment';
import { Bill } from 'src/app/model/bill';
import { MedicalRecords } from 'src/app/model/medical-records';
import { Prescription } from 'src/app/model/prescription';
import { User } from 'src/app/model/user';
import { UserInfo } from 'src/app/model/user-info';
import { CommonService } from 'src/app/service/common.service';
import { PaymentService } from 'src/app/service/payment.service';
import { StorageService } from 'src/app/service/storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.css']
})
export class PatientProfileComponent implements OnInit {
  id: any;
  imgURL: any;
  public imagePath: any;
  public message: string | undefined;
  statusFlag: boolean = false;
  currentUserInfo: UserInfo = new UserInfo;
  parentUser: User = new User;
  currentUser: User = new User;
  doctor: User = new User;
  appointmentList: Appointment[] = [];
  prescription: Prescription = new Prescription;
  prescriptionList: Prescription[] = [];
  medicalRecords: MedicalRecords = new MedicalRecords;
  medicalRecordsList: MedicalRecords[] = [];
  medicalRecordsFlag: boolean = false;
  bill: Bill = new Bill;
  billList: Bill[] = [];
  billFlag: boolean = false;

  constructor(private router: Router, private storageService: StorageService, private activatedRoute: ActivatedRoute, private commonService: CommonService,
    private userService: UserService, private paymentService: PaymentService, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.currentUserInfo = this.storageService.getUser();
    if (this.currentUserInfo != null) {
      this.currentUserInfo.token = this.storageService.getToken();
      this.getUserData();
      this.getAppointmentList();
      this.getPrescriptionList();
      this.getMedicalRecordsList();
      this.getBillList();
    }
    this.activatedRoute.queryParams.subscribe(params => {
      console.log(params);
      this.id = params['id'];
      if (this.id != undefined && this.id > 0) {
        this.getPatientDataById(this.id);
      } else {
        alert('In valid user');
        this.router.navigate(['/myPatients']);
      }
    });
    this.prescription.createdDate = new Date();
  }
  getUserData() {
    this.userService.getUser(this.currentUserInfo).subscribe((data: User) => {
      this.parentUser = data;
    });
  }
  getDoctorData() {
    this.commonService.getDoctorById(this.id).subscribe((data: User) => {
      this.doctor = data;
    });
  }
  getPatientDataById(id: any) {
    this.userService.getPatientDataById(id, this.currentUserInfo.token).subscribe((data: User) => {
      if (data != null) {
        this.currentUser = data;
      } else {
        alert('In valid user');
        this.router.navigate(['/myPatients']);
      }
    });
  }
  getAppointmentList() {
    this.userService.getPatientAppointmentList(this.currentUser.id, this.currentUserInfo.token).subscribe((data: Appointment[]) => {
      this.appointmentList = data;
    });
  }
  getPrescriptionList() {
    this.userService.getPrescriptionList(this.currentUser.id, this.currentUserInfo.token).subscribe((data: Prescription[]) => {
      this.prescriptionList = data;
      console.log('prescriptionList length ::' + data.length);
    });
  }
  addDetails() {
    this.medicalRecordsFlag = false;
    this.medicalRecords = new MedicalRecords;
  }
  validateMedicalRecordsData(): boolean {
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
    }
    else if (this.medicalRecords.hospitalName == "" || this.medicalRecords.hospitalName == undefined) {
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
    } else if (!AppValidations.validateSymptoms(this.medicalRecords.symptoms)) {
      const element = this.renderer.selectRootElement('#symptoms');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.medicalRecords.recordDateString == "" || this.medicalRecords.recordDateString == undefined) {
      alert('Please Enter Record Date');
      const element = this.renderer.selectRootElement('#recordDateString');
      setTimeout(() => element.focus(), 0);
      return false;
    } else {
      return true;
    }
  }
  saveMedicalRecords() {
    if (this.validateMedicalRecordsData()) {
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
    this.userService.getMedicalRecordsList(this.currentUser.id, this.currentUserInfo.token).subscribe((data: MedicalRecords[]) => {
      this.medicalRecordsList = data;
    });
  }
  getBillList() {
    this.paymentService.getBillList(this.currentUser.id, this.currentUserInfo.token).subscribe((data: Bill[]) => {
      this.billList = data;
      console.log('billList length ::' + data.length);
    });
  }
}
