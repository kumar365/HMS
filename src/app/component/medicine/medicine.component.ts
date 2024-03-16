import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppValidations } from 'src/app/constant/app-validations';
import { Medicine } from 'src/app/model/medicine';
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
  currentUserInfo: UserInfo = new UserInfo;
  currentUser: User = new User;
  medicine: Medicine = new Medicine();
  id: any;
  medicineList!: Medicine[];
  expiryDate: any;
  constructor(private storageService: StorageService,private route: ActivatedRoute, private userService: UserService,
    private router: Router, private medicineService: MedicineService, private renderer: Renderer2) {
  }
  ngOnInit(): void {
    this.currentUserInfo = this.storageService.getUser();
    this.currentUserInfo.token = this.storageService.getToken();
    this.getUserData();
    this.id = this.route.snapshot.params['id'];
    this.medicineService.findById(this.id).subscribe((data: Medicine) => {
      this.medicine = data;
      console.log("this.medicine::" + this.medicine);
    });
  }
  getUserData() {
    this.userService.getUser(this.currentUserInfo).subscribe((data: User) => {
      this.currentUser = data;
    });
  }
  validateMedicineData(): boolean {
    if (this.medicine.name == "" || this.medicine.name == undefined) {
      alert('Please Enter Medicine Name');
      const element = this.renderer.selectRootElement('#name');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (!AppValidations.validateName(this.medicine.name)) {
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
    } else if (this.medicine.expiryDate == "" || this.medicine.expiryDate == undefined) {
      alert('Please Enter Expiry Date');
      const element = this.renderer.selectRootElement('#expiryDate');
      setTimeout(() => element.focus(), 0);
      return false;
    } else {
      return true;
    }
  }

  onSubmit() {
    if (this.validateMedicineData()) {
      this.medicineService.save(this.medicine,this.currentUserInfo.token).subscribe(result => this.gotoMedicineList());
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
    this.medicine.totalQuantity = parseInt(this.medicine.units) * this.medicine.quantityPerUnit;
  }

}