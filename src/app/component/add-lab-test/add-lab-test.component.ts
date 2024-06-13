import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppValidations } from 'src/app/constant/app-validations';
import { MessageConstants } from 'src/app/constant/message-constants';
import { MessageResponse } from 'src/app/model/message-response';
import { ProductDetails } from 'src/app/model/product-details';
import { TestDetails } from 'src/app/model/test-details';
import { User } from 'src/app/model/user';
import { UserInfo } from 'src/app/model/user-info';
import { CommonService } from 'src/app/service/common.service';
import { StorageService } from 'src/app/service/storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-add-lab-test',
  templateUrl: './add-lab-test.component.html',
  styleUrls: ['./add-lab-test.component.css']
})
export class AddLabTestComponent implements OnInit {
  id: any;
  title!: string;
  message: any;
  statusFlag: boolean = false;
  currentUserInfo: UserInfo = new UserInfo;
  currentUser: User = new User;
  testDetails: TestDetails = new TestDetails;
  testDetailsList!: TestDetails[];
  expiryDate: any;
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  preview = '';
  usedFor: string = '';
  highlights: string = '';
  retrievedImage: any;
  constructor(private storageService: StorageService, private route: ActivatedRoute, private userService: UserService,
    private router: Router, private commonService: CommonService, private renderer: Renderer2) {
  }
  ngOnInit(): void {
    this.title = "Add Test Details";
    this.currentUserInfo = this.storageService.getUser();
    if (this.currentUserInfo != null) {
      this.currentUserInfo.token = this.storageService.getToken();
      this.getUserData();
    }
    this.id = this.route.snapshot.params['id'];
    if (this.id != null && this.id != undefined) {
      this.title = "Edit Test Details";
      this.getTestDetailsData();
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
  getTestDetailsData() {
    this.commonService.findTestDetailsById(this.id, this.currentUserInfo.token).subscribe((data: TestDetails) => {
      this.testDetails = data;
      if (this.testDetails.imageData != null && this.testDetails.imageData != undefined) {
        this.testDetails.retrievedImage = 'data:image/jpeg;base64,' + this.testDetails.imageData;
        this.testDetails.testImage = this.testDetails.imageData;
      }
    });
  }
  selectFile(event: any): void {
    this.preview = '';
    this.progress = 0;
    this.selectedFiles = event.target.files;
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      if (file) {
        this.preview = '';
        this.currentFile = file;
        const reader = new FileReader();
        reader.onload = (e: any) => {
          console.log(e.target.result);
          this.preview = e.target.result;
        };
        this.testDetails.testImage = this.currentFile;
        for (let i = 0; i < this.selectedFiles.length; i++) {
          this.testDetails.files.push(this.selectedFiles[i]);
        }
        reader.readAsDataURL(this.currentFile);
      }
    }
  }
  validaTetestDetailsData(): boolean {
    if (this.testDetails.testImage == undefined) {
      alert('Please Select Test Image');
      const element = this.renderer.selectRootElement('#testImage');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.testDetails.testName == "" || this.testDetails.testName == undefined) {
      alert('Please Enter TestDetails Name');
      const element = this.renderer.selectRootElement('#testName');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (!AppValidations.validateName(this.testDetails.testName)) {
      const element = this.renderer.selectRootElement('#name');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.testDetails.labName == "" || this.testDetails.labName == undefined) {
      alert('Please Enter Lab Name');
      const element = this.renderer.selectRootElement('#labName');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (!AppValidations.validateVendor(this.testDetails.labName)) {
      const element = this.renderer.selectRootElement('#labName');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.testDetails.testCost <= 0 || this.testDetails.testCost == undefined) {
      alert('Please Enter Test Price');
      const element = this.renderer.selectRootElement('#testCost');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (!AppValidations.validatePrice(this.testDetails.testCost)) {
      const element = this.renderer.selectRootElement('#testCost');
      setTimeout(() => element.focus(), 0);
      return false;
    } else {
      return true;
    }
  }

  onSubmit() {
    if (this.validaTetestDetailsData()) {
      this.commonService.saveTetestDetails(this.testDetails, this.currentUserInfo.token).subscribe((data: MessageResponse) => {
        this.message = data.message;
        if (this.message == MessageConstants.TestDetailsMessage) {
          this.statusFlag = true;
          this.goToTestDetailsList();
        }
      });
    }
  }

  goToTestDetailsList() {
    this.router.navigate(['/testDetailsList']);
  }

}
