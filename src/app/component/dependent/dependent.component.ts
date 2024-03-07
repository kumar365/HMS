import { Component, OnInit, Renderer2 } from '@angular/core';
import { AppValidations } from 'src/app/constant/app-validations';
import { MessageConstants } from 'src/app/constant/message-constants';
import { ApiResponse } from 'src/app/model/api-response';
import { Dependent } from 'src/app/model/dependent';
import { User } from 'src/app/model/user';
import { UserInfo } from 'src/app/model/user-info';
import { StorageService } from 'src/app/service/storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-dependent',
  templateUrl: './dependent.component.html',
  styleUrls: ['./dependent.component.css']
})
export class DependentComponent implements OnInit {
  message: any;
  edited: boolean = false;
  dependentFlag: boolean = false;
  currentUserInfo: UserInfo = new UserInfo;
  currentUser: User = new User;
  dependent: Dependent = new Dependent;
  dependentList: Dependent[] = [];
  constructor(private storageService: StorageService, private userService: UserService, private renderer: Renderer2) { }
  ngOnInit(): void {
    this.dependentFlag = false;
    this.currentUserInfo = this.storageService.getUser();
    this.currentUserInfo.token = this.storageService.getToken();
    //alert(this.currentUserInfo.token);
    this.getUserData();
    this.getDependentList();
  }
  getUserData() {
    this.userService.getUser(this.currentUserInfo).subscribe((data: User) => {
      this.currentUser = data;
    });
  }
  openModal() {
    this.edited = true;
  }
  addDetails() {
    this.dependentFlag = false;
    this.dependent = new Dependent;
  }
  validateDependentDetails(): boolean {
    if (this.dependent.name == "" || this.dependent.name == undefined) {
      alert('Please Enter Name');
      const element = this.renderer.selectRootElement('#name');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (!AppValidations.validateName(this.dependent.name)) {
      const element = this.renderer.selectRootElement('#name');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.dependent.relationship == "" || this.dependent.relationship == undefined) {
      alert('Please Enter Relationship');
      const element = this.renderer.selectRootElement('#relationship');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (!AppValidations.validateName(this.dependent.relationship)) {
      const element = this.renderer.selectRootElement('#relationship');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.dependent.phoneNumber == "" || this.dependent.phoneNumber == undefined) {
      alert('Please Enter Phone Number');
      const element = this.renderer.selectRootElement('#phoneNumber');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (!AppValidations.validatePhoneNumber(this.dependent.phoneNumber)) {
      const element = this.renderer.selectRootElement('#phoneNumber');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.dependent.gender == "" || this.dependent.gender == undefined) {
      alert('Please Select the Gender');
      const element = this.renderer.selectRootElement('#gender');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.dependent.bloodGroup == "" || this.dependent.bloodGroup == undefined) {
      alert('Please Select the Blood Group');
      const element = this.renderer.selectRootElement('#bloodGroup');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.dependent.dateOfBirthString == "" || this.dependent.dateOfBirthString == undefined) {
      alert('Please Enter Date Of Birth');
      const element = this.renderer.selectRootElement('#dateOfBirthString');
      setTimeout(() => element.focus(), 0);
      return false;
    } else {
      return true;
    }
  }
  onSubmit() {
    if (this.validateDependentDetails()) {
      this.dependent.user = this.currentUser;
      this.dependent.active = true;
      this.userService.saveDependent(this.dependent, this.currentUserInfo.token).subscribe((data: ApiResponse) => {
        this.message = data.message;
        if (this.message == MessageConstants.DependentMessage) {
          this.dependentFlag = true;
          this.getDependentList();
          this.dependent = new Dependent;
        }
      });
    }
  }
  onSubmitEdit() {
    if (this.validateDependentDetails()) {
      this.dependent.user = this.currentUser;
      this.dependent.active = true;
      this.userService.saveDependent(this.dependent, this.currentUserInfo.token).subscribe((data: ApiResponse) => {
        this.message = data.message;
        if (this.message == MessageConstants.DependentMessage) {
          this.dependentFlag = true;
          this.getDependentList();
          this.dependent = new Dependent;
        }
      });
    }
  }
  getDependentList() {
    //alert(this.currentUserInfo.id);
    this.userService.getDependentList(this.currentUserInfo.id, this.currentUserInfo.token).subscribe((data: Dependent[]) => {
      this.dependentList = data;
    });
  }
  edit(dependent: Dependent) {
    this.dependentFlag = false;
    this.dependent = dependent;
    dependent.dateOfBirthString = this.convertDateToDateString(dependent.dateOfBirth);
    this.dependent.dateOfBirth = dependent.dateOfBirthString;
  }
  convertDateToDateString(orderDate: any) {
    var d = new Date(orderDate)
    return [d.getFullYear(), this.pad(d.getMonth() + 1), this.pad(d.getDate())].join('-');
  }
  pad(s: any) { return (s < 10) ? '0' + s : s; }

  deactive(dependent: Dependent) {
    //alert(dependent.active);
    this.dependent = dependent;
    this.dependent.active = false;
    this.userService.saveDependent(this.dependent, this.currentUserInfo.token).subscribe((data: ApiResponse) => {
      this.message = data.message;
      if (this.message == MessageConstants.DependentMessage) {
        this.dependentFlag = true;
        this.getDependentList();
        this.dependent = new Dependent;
      }
    });
    //alert(dependent.active);
  }
}