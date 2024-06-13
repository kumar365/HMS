import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TestDetails } from 'src/app/model/test-details';
import { User } from 'src/app/model/user';
import { UserInfo } from 'src/app/model/user-info';
import { CommonService } from 'src/app/service/common.service';
import { StorageService } from 'src/app/service/storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-lab-test-list',
  templateUrl: './lab-test-list.component.html',
  styleUrls: ['./lab-test-list.component.css']
})
export class LabTestListComponent implements OnInit {
  title!: string;
  message!: string;
  currentUserInfo: UserInfo = new UserInfo;
  currentUser: User = new User;
  testDetailsList: TestDetails[] = [];
  retrievedImage: any;
  constructor(private storageService: StorageService, private route: ActivatedRoute, private userService: UserService,
    private router: Router, private commonService: CommonService, private renderer: Renderer2) {
  }
  ngOnInit() {
    this.title = "Lab Test List";
    this.currentUserInfo = this.storageService.getUser();
    if (this.currentUserInfo != null) {
      this.currentUserInfo.token = this.storageService.getToken();
      this.getUserData();
    }
    this.getTestDetailsList();
  }
  getUserData() {
    this.userService.getUser(this.currentUserInfo).subscribe((data: User) => {
      this.currentUser = data;
      if (this.currentUser.imageData != null && this.currentUser.imageData != undefined) {
        this.retrievedImage = 'data:image/jpeg;base64,' + this.currentUser.imageData;
      }
    });
  }
  delete(testDetails: TestDetails): void {
    this.commonService.deleteTestDetails(testDetails.testId, this.currentUserInfo.token).subscribe((data: string) => {
      this.message = data;
      if (this.message === 'Test Details deleted successfully') {
        this.getTestDetailsList();
      }
    });
  }
  getTestDetailsList() {
    this.commonService.getTestDetailsList().subscribe((data: TestDetails[]) => {
      this.testDetailsList = data;
    });
  }
  edit(testDetails: TestDetails) {
    console.log('testDetails.id::' + testDetails.testId);
    this.router.navigate(['addLabTest', { id: testDetails.testId }]);
  }

}
