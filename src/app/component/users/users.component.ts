import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { UserInfo } from 'src/app/model/user-info';
import { StorageService } from 'src/app/service/storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  currentUserInfo: UserInfo = new UserInfo;
  users!: User[];

  constructor(private storageService: StorageService, private userService: UserService) {
  }

  ngOnInit() {
    this.currentUserInfo = this.storageService.getUser();
    this.currentUserInfo.token = this.storageService.getToken();
    this.getUsersList();
  }
  getUsersList() {
    this.userService.findAll(this.currentUserInfo.token).subscribe((data: User[]) => {
      this.users = data;
    });
  }
}
