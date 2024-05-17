import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Medicine } from 'src/app/model/medicine';
import { User } from 'src/app/model/user';
import { UserInfo } from 'src/app/model/user-info';
import { FileUploadService } from 'src/app/service/file-upload.service';
import { MedicineService } from 'src/app/service/medicine.service';
import { StorageService } from 'src/app/service/storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-medicine-order',
  templateUrl: './medicine-order.component.html',
  styleUrls: ['./medicine-order.component.css']
})
export class MedicineOrderComponent implements OnInit {
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  preview = '';
  message: any;
  statusFlag: boolean = false;
  currentUserInfo: UserInfo = new UserInfo;
  currentUser: User = new User;
  medicineList!: Medicine[];
  retrievedImage: any;
  constructor(private storageService: StorageService, private userService: UserService,
    private medicineService: MedicineService, private uploadService: FileUploadService) { }

  ngOnInit(): void {
    this.currentUserInfo = this.storageService.getUser();
    if (this.currentUserInfo != null) {
      this.currentUserInfo.token = this.storageService.getToken();
      this.getUserData();
      this.getMedicineList();
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
  getMedicineList() {
    this.medicineService.findAll(this.currentUserInfo.token).subscribe((data: Medicine[]) => {
      this.medicineList = data;
      for (let index = 0; index < this.medicineList.length; index++) {
        if (this.medicineList[index].imageData != null && this.medicineList[index].imageData != undefined) {
          this.medicineList[index].retrievedImage = 'data:image/jpeg;base64,' + this.medicineList[index].imageData;
        }
      }
    });
  }
  selectFile(event: any): void {
    this.message = '';
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

        reader.readAsDataURL(this.currentFile);
      }
    }
  }
  upload(): void {

    this.progress = 0;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;
        this.uploadService.prescriptionUpload(this.currentFile).subscribe({
          next: (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round((100 * event.loaded) / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              this.statusFlag = true;
            }
          },
          error: (err: any) => {
            console.log(err);
            this.progress = 0;

            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the image!';
            }

            this.currentFile = undefined;
          },
        });
      }

      this.selectedFiles = undefined;
    }
  }
}
