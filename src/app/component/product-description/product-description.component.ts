import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Medicine } from 'src/app/model/medicine';
import { ProductDetails } from 'src/app/model/product-details';
import { User } from 'src/app/model/user';
import { UserInfo } from 'src/app/model/user-info';
import { MedicineService } from 'src/app/service/medicine.service';
import { StorageService } from 'src/app/service/storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-product-description',
  templateUrl: './product-description.component.html',
  styleUrls: ['./product-description.component.css']
})
export class ProductDescriptionComponent implements OnInit {
  id: any;
  public message: string | undefined;
  statusFlag: boolean = false;
  currentUserInfo: UserInfo = new UserInfo;
  currentUser: User = new User;
  medicine: Medicine = new Medicine;
  retrievedImage: any;
  constructor(private activatedRoute: ActivatedRoute, private storageService: StorageService,
    private userService: UserService, private medicineService: MedicineService) { }

  ngOnInit(): void {
    this.currentUserInfo = this.storageService.getUser();
    if (this.currentUserInfo != null) {
      this.currentUserInfo.token = this.storageService.getToken();
      this.getUserData();
    }
    this.activatedRoute.queryParams.subscribe(params => {
      console.log(params);
      this.id = params['id'];
      if (this.id != undefined && this.id > 0) {
        this.getMedicineData();
      } else {
        alert('In valid product id');
      }
    });
  }
  getUserData() {
    this.userService.getUser(this.currentUserInfo).subscribe((data: User) => {
      this.currentUser = data;
      if (this.currentUser.imageData != null && this.currentUser.imageData != undefined) {
        this.retrievedImage = 'data:image/jpeg;base64,' + this.currentUser.imageData;
      }
    });
  }
  getMedicineData() {
    this.medicineService.findMedicineById(this.id, this.currentUserInfo.token).subscribe((data: Medicine) => {
      this.medicine = data;
      if (this.medicine.imageData != null && this.medicine.imageData != undefined) {
        this.medicine.retrievedImage = 'data:image/jpeg;base64,' + this.medicine.imageData;
      }
      if (this.medicine.productDetails == null && this.medicine.productDetails == undefined) {
        this.medicine.productDetails = new ProductDetails;
      }
    });
  }
}
