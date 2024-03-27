import { Component, OnInit } from '@angular/core';
import { Ambulance } from 'src/app/model/ambulance';
import { User } from 'src/app/model/user';
import { UserInfo } from 'src/app/model/user-info';
import { StorageService } from 'src/app/service/storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-search-ambulance',
  templateUrl: './search-ambulance.component.html',
  styleUrls: ['./search-ambulance.component.css']
})
export class SearchAmbulanceComponent implements OnInit {
  message: any;
  statusFlag: boolean = false;
  currentUserInfo: UserInfo = new UserInfo;
  currentUser: User = new User;
  ambulanceList: Ambulance[] = [];
  constructor(private storageService: StorageService, private userService: UserService) { }

  ngOnInit(): void {
    this.currentUserInfo = this.storageService.getUser();
    this.currentUserInfo.token = this.storageService.getToken();
    this.getUserData();
    this.getAmbulanceList();
  }
  getUserData() {
    this.userService.getUser(this.currentUserInfo).subscribe((data: User) => {
      //console.log('data ::' + data);
      this.currentUser = data;
    });
  }
  getAmbulanceList() {
    this.userService.getAmbulanceList(this.currentUserInfo.id, this.currentUserInfo.token).subscribe((data: Ambulance[]) => {
      this.ambulanceList = data;
      console.log('data length::' + data.length);
    });
  }
}
