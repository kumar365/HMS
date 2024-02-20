import { Component, OnInit } from '@angular/core';
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
  constructor(private storageService: StorageService, private userService: UserService) { }
  ngOnInit(): void {
    this.dependentFlag = false;
    this.currentUserInfo = this.storageService.getUser();
    this.currentUserInfo.token = this.storageService.getToken();
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
  onSubmit() {
    //alert(this.currentUser.username);
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