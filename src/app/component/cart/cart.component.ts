import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Appointment } from 'src/app/model/appointment';
import { Medicine } from 'src/app/model/medicine';
import { ProductDetails } from 'src/app/model/product-details';
import { User } from 'src/app/model/user';
import { UserInfo } from 'src/app/model/user-info';
import { MedicineService } from 'src/app/service/medicine.service';
import { StorageService } from 'src/app/service/storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  id: any;
  message: any;
  statusFlag: boolean = false;
  currentUserInfo: UserInfo = new UserInfo;
  currentUser: User = new User;
  appointment: Appointment = new Appointment;
  medicine: Medicine = new Medicine;
  medicineList: Medicine[] = [];
  retrievedImage: any;
  constructor(private activatedRoute: ActivatedRoute, private storageService: StorageService, private userService: UserService,
    private router: Router, private medicineService: MedicineService) { }

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
      this.medicineList.push(this.medicine);
      if (this.medicine.imageData != null && this.medicine.imageData != undefined) {
        this.medicine.retrievedImage = 'data:image/jpeg;base64,' + this.medicine.imageData;
      }
      if (this.medicine.productDetails == null && this.medicine.productDetails == undefined) {
        this.medicine.productDetails = new ProductDetails;
      }
      this.medicine.quantity1 = 1;
    });
  }
  onClick(value: string, medicineId: any) {
    for (let index = 0; index < this.medicineList.length; index++) {
      if (this.medicineList[index].id == medicineId) {
        if (value == 'minus') {
          if (this.medicineList[index].quantity1 >= 1) {
            this.medicineList[index].quantity1 = this.medicineList[index].quantity1 - 1;
          }
        } else if (value == 'plus') {
          if (this.medicineList[index].quantity1 >= 0 && this.medicineList[index].quantity1 < this.medicineList[index].totalQuantity) {
            this.medicineList[index].quantity1 = this.medicineList[index].quantity1 + 1;
          }
        }
      }
    }

  }
  onSubmit() {
    this.router.navigate(['/productCheckout']);
  }
}
