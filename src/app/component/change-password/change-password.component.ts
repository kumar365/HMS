import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MessageConstants } from 'src/app/constant/message-constants';
import { MessageResponse } from 'src/app/model/message-response';
import { User } from 'src/app/model/user';
import { UserInfo } from 'src/app/model/user-info';
import { StorageService } from 'src/app/service/storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  message: any;
  changePasswordFlag: boolean = false;
  currentUserInfo: UserInfo = new UserInfo;
  currentUser: User = new User;
  formData!: FormGroup;
  constructor(private storageService: StorageService, private userService: UserService) { }

  ngOnInit(): void {
    this.setForm();
    this.currentUserInfo = this.storageService.getUser();
    this.currentUserInfo.token = this.storageService.getToken();
    this.getUserData();
    console.log('this.token ::' + this.currentUserInfo.token);
  }
  getUserData() {
    this.userService.getUser(this.currentUserInfo).subscribe((data: User) => {
      this.currentUser = data;
    });
  }
  onClickSubmit(data: any) {
    if (data.newPassword == data.confirmPassword) {
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
      console.log(true);
    } else {
      alert(MessageConstants.PasswordDiffMessage);
      console.log(false);
      this.reloadPage();
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
