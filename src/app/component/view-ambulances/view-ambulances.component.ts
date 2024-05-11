import { Component, OnInit } from '@angular/core';
import { Ambulance } from 'src/app/model/ambulance';
import { User } from 'src/app/model/user';
import { UserInfo } from 'src/app/model/user-info';
import { StorageService } from 'src/app/service/storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-view-ambulances',
  templateUrl: './view-ambulances.component.html',
  styleUrls: ['./view-ambulances.component.css']
})
export class ViewAmbulancesComponent implements OnInit {
  message: any;
  statusFlag: boolean = false;
  currentUserInfo: UserInfo = new UserInfo;
  currentUser: User = new User;
  ambulanceList: Ambulance[] = [];
  retrievedImage: any;
  constructor(private storageService: StorageService, private userService: UserService) { }

  ngOnInit(): void {
    this.currentUserInfo = this.storageService.getUser();
    if (this.currentUserInfo != null) {
      this.currentUserInfo.token = this.storageService.getToken();
      this.getUserData();
      this.getAmbulanceList();
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
  getAmbulanceList() {
    this.userService.getAmbulanceList(this.currentUserInfo.id, this.currentUserInfo.token).subscribe((data: Ambulance[]) => {
      this.ambulanceList = data;
      console.log('data ::' + data);
    });
  }
}
