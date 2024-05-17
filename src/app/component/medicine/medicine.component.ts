import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppValidations } from 'src/app/constant/app-validations';
import { MessageConstants } from 'src/app/constant/message-constants';
import { Medicine } from 'src/app/model/medicine';
import { MessageResponse } from 'src/app/model/message-response';
import { User } from 'src/app/model/user';
import { UserInfo } from 'src/app/model/user-info';
import { MedicineService } from 'src/app/service/medicine.service';
import { StorageService } from 'src/app/service/storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-medicine',
  templateUrl: './medicine.component.html',
  styleUrls: ['./medicine.component.css']
})
export class MedicineComponent implements OnInit {
  id: any;
  message: any;
  statusFlag: boolean = false;
  currentUserInfo: UserInfo = new UserInfo;
  currentUser: User = new User;
  medicine: Medicine = new Medicine();
  medicineList!: Medicine[];
  expiryDate: any;
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  preview = '';
  retrievedImage: any;
  constructor(private storageService: StorageService, private route: ActivatedRoute, private userService: UserService,
    private router: Router, private medicineService: MedicineService, private renderer: Renderer2) {
  }
  ngOnInit(): void {
    this.currentUserInfo = this.storageService.getUser();
    if (this.currentUserInfo != null) {
      this.currentUserInfo.token = this.storageService.getToken();
        this.getUserData();
    }
    this.id = this.route.snapshot.params['id'];
    if (this.id != null && this.id != undefined) {
      this.medicineService.findById(this.id).subscribe((data: Medicine) => {
        this.medicine = data;
      });
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
        this.medicine.medicineImage = this.currentFile;
        for (let i = 0; i < this.selectedFiles.length; i++) {
          this.medicine.files.push(this.selectedFiles[i]);
        }
        reader.readAsDataURL(this.currentFile);
      }
    }
  }
  validateMedicineData(): boolean {
    if (this.medicine.name == "" || this.medicine.name == undefined) {
      alert('Please Enter Medicine Name');
      const element = this.renderer.selectRootElement('#name');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (!AppValidations.validateMedicineName(this.medicine.name)) {
      const element = this.renderer.selectRootElement('#name');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.medicine.medicinePrice == "" || this.medicine.medicinePrice == undefined) {
      alert('Please Enter Medicine Price');
      const element = this.renderer.selectRootElement('#medicinePrice');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (!AppValidations.validatePrice(this.medicine.medicinePrice)) {
      const element = this.renderer.selectRootElement('#medicinePrice');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.medicine.expiryDateString == "" || this.medicine.expiryDateString == undefined) {
      alert('Please Enter Expiry Date');
      const element = this.renderer.selectRootElement('#expiryDateString');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.medicine.medicineImage == undefined) {
      alert('Please Select Medicine Image');
      const element = this.renderer.selectRootElement('#medicineImage');
      setTimeout(() => element.focus(), 0);
      return false;
    } else {
      return true;
    }
  }

  onSubmit() {
    if (this.validateMedicineData()) {
      this.medicineService.save(this.medicine, this.currentUserInfo.token).subscribe((data: MessageResponse) => {
        this.message = data.message;
        if (this.message == MessageConstants.MedicineMessage) {
          this.statusFlag = true;
          this.gotoMedicineList();
        }
      });
    }
  }

  gotoMedicineList() {
    this.router.navigate(['/medicineList']);
  }

  getValidDate() {
    console.log('selectedDate::' + this.medicine.expiryDate);
    const date = new Date(this.medicine.expiryDate);
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();
    this.medicine.expiryDate = yyyy + '-' + mm + '-' + dd;
  }

  getTotalQTY() {
    if (this.medicine.units > 0 && this.medicine.units != undefined && this.medicine.quantityPerUnit > 0 && this.medicine.quantityPerUnit != undefined) {
      this.medicine.totalQuantity = this.medicine.units * this.medicine.quantityPerUnit;
    }
  }

}