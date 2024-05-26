import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserInfo } from 'src/app/model/user-info';
import { AuthService } from 'src/app/service/auth.service';
import { StorageService } from 'src/app/service/storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-lab-register',
  templateUrl: './lab-register.component.html',
  styleUrls: ['./lab-register.component.css']
})
export class LabRegisterComponent implements OnInit {

  isLoggedIn: boolean = false;
  isLoginFailed: boolean = false;
  message = '';
  currentUserInfo: UserInfo = new UserInfo;
  currentUser: User = new User;
  showPassword: boolean = true;
  showPasswordConfirm: boolean = true;
  constructor(private authService: AuthService, private storageService: StorageService,
    private userService: UserService, private router: Router, private renderer: Renderer2) { }

  ngOnInit(): void {
  }
  toggleShow() {
    this.showPassword = !this.showPassword;
  }
  toggleShowConfirm() {
    this.showPasswordConfirm = !this.showPasswordConfirm;
  }
}
