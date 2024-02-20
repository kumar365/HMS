import { Component, OnInit } from '@angular/core';
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
  constructor(private storageService: StorageService, private userService: UserService) { }

  ngOnInit(): void {
    this.currentUserInfo = this.storageService.getUser();
    this.currentUserInfo.token = this.storageService.getToken();
    this.getUserData();
  }
  getUserData() {
    this.userService.getUser(this.currentUserInfo).subscribe((data: User) => {
      //console.log('data ::' + data);
      this.currentUser = data;
    });
  }
  onSubmit() {
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

  reloadPage(): void {
    window.location.reload();
  }
}
