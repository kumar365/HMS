import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserInfo } from 'src/app/model/user-info';
import { CommonService } from 'src/app/service/common.service';
import { StorageService } from 'src/app/service/storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-lab-test',
  templateUrl: './lab-test.component.html',
  styleUrls: ['./lab-test.component.css']
})
export class LabTestComponent implements OnInit {
  message: any;
  statusFlag: boolean = false;
  currentUserInfo: UserInfo = new UserInfo;
  currentUser: User = new User;

  constructor(private storageService: StorageService, private userService: UserService,
    private commonService: CommonService,private router: Router) { }

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
    });
  }
  onSubmit() {
    this.router.navigate(['/searchTests']);
  }
}
