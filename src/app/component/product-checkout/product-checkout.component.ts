import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserInfo } from 'src/app/model/user-info';
import { StorageService } from 'src/app/service/storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-product-checkout',
  templateUrl: './product-checkout.component.html',
  styleUrls: ['./product-checkout.component.css']
})
export class ProductCheckoutComponent implements OnInit {
  message: any;
  statusFlag: boolean = false;
  currentUserInfo: UserInfo = new UserInfo;
  currentUser: User = new User;
  constructor(private route: ActivatedRoute, private router: Router, private storageService: StorageService, private userService: UserService) { }

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
    //alert('paymentSuccess');
    this.router.navigate(['/paymentSuccess']);
  }

}
