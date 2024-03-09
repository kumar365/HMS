import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AppValidations } from 'src/app/constant/app-validations';
import { MessageConstants } from 'src/app/constant/message-constants';
import { MessageResponse } from 'src/app/model/message-response';
import { User } from 'src/app/model/user';
import { UserInfo } from 'src/app/model/user-info';
import { StorageService } from 'src/app/service/storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-doctor-change-password',
  templateUrl: './doctor-change-password.component.html',
  styleUrls: ['./doctor-change-password.component.css']
})
export class DoctorChangePasswordComponent implements OnInit {
  message: any;
  changePasswordFlag: boolean = false;
  currentUserInfo: UserInfo = new UserInfo;
  currentUser: User = new User;
  formData!: FormGroup;
  constructor(private storageService: StorageService, private userService: UserService, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.setForm();
    this.currentUserInfo = this.storageService.getUser();
    this.currentUserInfo.token = this.storageService.getToken();
    this.getUserData();

  }
  getUserData() {
    this.userService.getUser(this.currentUserInfo).subscribe((data: User) => {
      this.currentUser = data;
    });
  }
  validateChangePasswordData(data: any): boolean {
    if (data.oldPassword == "" || data.oldPassword == undefined) {
      alert('Please Enter Old Password');
      const element = this.renderer.selectRootElement('#oldPassword');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (!AppValidations.validatePassword(data.oldPassword)) {
      const element = this.renderer.selectRootElement('#oldPassword');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (data.newPassword == "" || data.newPassword == undefined) {
      alert('Please Enter New Password');
      const element = this.renderer.selectRootElement('#newPassword');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (!AppValidations.validatePassword(data.newPassword)) {
      const element = this.renderer.selectRootElement('#newPassword');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (data.confirmPassword == "" || data.confirmPassword == undefined) {
      alert('Please Enter Confirm Password');
      const element = this.renderer.selectRootElement('#confirmPassword');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (data.newPassword != data.confirmPassword) {
      alert('Confirm Password must be same as password');
      const element = this.renderer.selectRootElement('#confirmPassword');
      setTimeout(() => element.focus(), 0);
      return false;
    } else {
      return true;
    }
  }
  onClickSubmit(data: any) {
    if (this.validateChangePasswordData(data)) {
      this.currentUserInfo.oldPassword = data.oldPassword;
      this.currentUserInfo.newPassword = data.newPassword;
      this.userService.changePassword(this.currentUserInfo).subscribe((data: MessageResponse) => {
        this.message = data.message;
        console.log('this.message::' + this.message);
        if (this.message == MessageConstants.ChangePasswordMessage) {
          this.changePasswordFlag = true;
          this.setForm();
        }
      });
    }
  }
  setForm() {
    this.formData = new FormGroup({
      oldPassword: new FormControl(""),
      newPassword: new FormControl(""),
      confirmPassword: new FormControl(""),
    });
  }
  reloadPage(): void {
    window.location.reload();
  }
  
}
