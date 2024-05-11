import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as Aos from 'aos';
import { User } from 'src/app/model/user';
import { UserInfo } from 'src/app/model/user-info';
import { StorageService } from 'src/app/service/storage.service';
import { UserService } from 'src/app/service/user.service';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';




@Component({
  selector: 'app-find-doctors',
  templateUrl: './find-doctors.component.html',
  styleUrls: ['./find-doctors.component.css']
})
export class FindDoctorsComponent implements OnInit {
  message: any;
  statusFlag: boolean = false;
  currentUserInfo: UserInfo = new UserInfo;
  currentUser: User = new User;
  doctor: User = new User;
  retrievedImage: any;
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private storageService: StorageService, private userService: UserService) { }

  ngOnInit(): void {
    Aos.init({ once: true, duration: 1000 });
    this.currentUserInfo = this.storageService.getUser();
    if (this.currentUserInfo != null) {
      this.currentUserInfo.token = this.storageService.getToken();
      this.getUserData();
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

  onSubmit() {
    this.router.navigate(['/searchDoctors']);
  }

}