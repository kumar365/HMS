import { Component, OnInit } from '@angular/core';
import { Ambulance } from 'src/app/model/ambulance';
import { User } from 'src/app/model/user';
import { UserInfo } from 'src/app/model/user-info';
import { CommonService } from 'src/app/service/common.service';
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
  constructor(private storageService: StorageService, private userService: UserService,
    private commonService: CommonService) { }

  ngOnInit(): void {
    this.currentUserInfo = this.storageService.getUser();
    if (this.currentUserInfo != null) {
      this.currentUserInfo.token = this.storageService.getToken();
      this.getUserData();
    }
    this.getAmbulanceList();
  }
  getUserData() {
    this.userService.getUser(this.currentUserInfo).subscribe((data: User) => {
      this.currentUser = data;
    });
  }
  getAmbulanceList() {
    this.commonService.getAmbulanceList().subscribe((data: Ambulance[]) => {
      this.ambulanceList = data;
    });
  }
}
