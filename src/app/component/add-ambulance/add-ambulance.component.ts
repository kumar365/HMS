import { Component, OnInit, Renderer2 } from '@angular/core';
import { AppValidations } from 'src/app/constant/app-validations';
import { MessageConstants } from 'src/app/constant/message-constants';
import { Ambulance } from 'src/app/model/ambulance';
import { MessageResponse } from 'src/app/model/message-response';
import { User } from 'src/app/model/user';
import { UserInfo } from 'src/app/model/user-info';
import { StorageService } from 'src/app/service/storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-add-ambulance',
  templateUrl: './add-ambulance.component.html',
  styleUrls: ['./add-ambulance.component.css']
})
export class AddAmbulanceComponent implements OnInit {
  message: any;
  statusFlag: boolean = false;
  currentUserInfo: UserInfo = new UserInfo;
  currentUser: User = new User;
  ambulance: Ambulance = new Ambulance;
  retrievedImage: any;
  constructor(private storageService: StorageService, private userService: UserService,
    private renderer: Renderer2) { }

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

  onSubmit() {
    if (this.validateAmbulanceData()) {
      console.log('this.currentUserInfo.token ::' + this.currentUserInfo.token);
      this.userService.saveAmbulance(this.ambulance, this.currentUserInfo.token).subscribe((data: MessageResponse) => {
        this.message = data.message;
        //console.log('this.message::' + this.message);
        if (this.message == MessageConstants.AmbulanceDetailsMessage) {
          this.statusFlag = true;
          this.ambulance = new Ambulance;
        }
      });
    }
  }

  validateAmbulanceData(): boolean {
    if (this.ambulance.type == "" || this.ambulance.type == undefined) {
      alert('Please Select Ambulance Type');
      const element = this.renderer.selectRootElement('#type');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.ambulance.modelNumber == "" || this.ambulance.modelNumber == undefined) {
      alert('Please Eneter Ambulance Model Number');
      const element = this.renderer.selectRootElement('#modelNumber');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.ambulance.registrationNumber == "" || this.ambulance.registrationNumber == undefined) {
      alert('Please Eneter Ambulance Registration Number');
      const element = this.renderer.selectRootElement('#registrationNumber');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.ambulance.addons == "" || this.ambulance.addons == undefined) {
      alert('Please Enter Ambulance Addons');
      const element = this.renderer.selectRootElement('#addons');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.ambulance.driverEmail == "" || this.ambulance.driverEmail == undefined) {
      alert('Please Enter Driver Email');
      const element = this.renderer.selectRootElement('#driverEmail');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (!AppValidations.validateMail(this.ambulance.driverEmail)) {
      const element = this.renderer.selectRootElement('#driverEmail');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.ambulance.driverName == "" || this.ambulance.driverName == undefined) {
      alert('Please Enter Driver Name');
      const element = this.renderer.selectRootElement('#driverName');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (!AppValidations.validateName(this.ambulance.driverName)) {
      const element = this.renderer.selectRootElement('#driverName');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.ambulance.driverNumber == "" || this.ambulance.driverNumber == undefined) {
      alert('Please Enter Driver Number');
      const element = this.renderer.selectRootElement('#driverNumber');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (!AppValidations.validatePhoneNumber(this.ambulance.driverNumber)) {
      const element = this.renderer.selectRootElement('#driverNumber');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.ambulance.location == "" || this.ambulance.location == undefined) {
      alert('Please Enter Location');
      const element = this.renderer.selectRootElement('#location');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.ambulance.ambulanceRate <= 0 || this.ambulance.ambulanceRate == undefined) {
      alert('Please Enter Ambulance Rate >0');
      const element = this.renderer.selectRootElement('#ambulanceRate');
      setTimeout(() => element.focus(), 0);
      return false;
    } else {
      return true;
    }
  }

  reloadPage(): void {
    window.location.reload();
  }
}
