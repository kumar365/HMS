import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppValidations } from 'src/app/constant/app-validations';
import { MessageConstants } from 'src/app/constant/message-constants';
import { Medicine } from 'src/app/model/medicine';
import { MessageResponse } from 'src/app/model/message-response';
import { ProductDetails } from 'src/app/model/product-details';
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
  title!: string;
  message: any;
  statusFlag: boolean = false;
  currentUserInfo: UserInfo = new UserInfo;
  currentUser: User = new User;
  medicine: Medicine = new Medicine;
  medicineList!: Medicine[];
  expiryDate: any;
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  preview = '';
  usedFor: string = '';
  highlights: string = '';
  retrievedImage: any;
  constructor(private storageService: StorageService, private route: ActivatedRoute, private userService: UserService,
    private router: Router, private medicineService: MedicineService, private renderer: Renderer2) {
  }
  ngOnInit(): void {
    this.title = "Add Medicine";
    this.currentUserInfo = this.storageService.getUser();
    if (this.currentUserInfo != null) {
      this.currentUserInfo.token = this.storageService.getToken();
      this.getUserData();
    }
    this.id = this.route.snapshot.params['id'];
    if (this.id != null && this.id != undefined) {
      this.title = "Edit Medicine";
      this.getMedicineData();
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
  getMedicineData() {
    this.medicineService.findMedicineById(this.id, this.currentUserInfo.token).subscribe((data: Medicine) => {
      this.medicine = data;
      if (this.medicine.imageData != null && this.medicine.imageData != undefined) {
        this.medicine.retrievedImage = 'data:image/jpeg;base64,' + this.medicine.imageData;
        this.medicine.medicineImage = this.medicine.imageData;
      }
      if (this.medicine.productDetails == null && this.medicine.productDetails == undefined) {
        this.medicine.productDetails = new ProductDetails;
      }
      if (this.medicine.usedFor != null && this.medicine.usedFor != undefined) {
        this.usedFor = '';
        for (let index = 0; index < this.medicine.usedFor.length; index++) {
          if (index == 0) {
            this.usedFor = this.medicine.usedFor[index];
          } else {
            this.usedFor = this.usedFor + "; " + this.medicine.usedFor[index];
          }
        }
      }
      if (this.medicine.productDetails.highlights != null && this.medicine.productDetails.highlights != undefined) {
        this.usedFor = '';
        for (let index = 0; index < this.medicine.productDetails.highlights.length; index++) {
          if (index == 0) {
            this.highlights = this.medicine.productDetails.highlights[index];
          } else {
            this.highlights = this.highlights + "; " + this.medicine.productDetails.highlights[index];
          }
        }
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
    if (this.medicine.medicineImage == undefined) {
      alert('Please Select Medicine Image');
      const element = this.renderer.selectRootElement('#medicineImage');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.medicine.name == "" || this.medicine.name == undefined) {
      alert('Please Enter Medicine Name');
      const element = this.renderer.selectRootElement('#name');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (!AppValidations.validateMedicineName(this.medicine.name)) {
      const element = this.renderer.selectRootElement('#name');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.medicine.medicinePrice <= 0 || this.medicine.medicinePrice == undefined) {
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
    } else if (!AppValidations.validateMedicineExpiryDate(this.medicine.expiryDateString)) {
      const element = this.renderer.selectRootElement('#expiryDateString');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.medicine.units == 0 || this.medicine.units == undefined) {
      alert('Please Enter Medicine Units');
      const element = this.renderer.selectRootElement('#units');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (!AppValidations.validateMedicineUnits(this.medicine.units)) {
      const element = this.renderer.selectRootElement('#units');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.medicine.quantityPerUnit == 0 || this.medicine.quantityPerUnit == undefined) {
      alert('Please Enter Quantity Per Unit');
      const element = this.renderer.selectRootElement('#quantityPerUnit');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (!AppValidations.validateMedicineQuantityPerUnit(this.medicine.quantityPerUnit)) {
      const element = this.renderer.selectRootElement('#quantityPerUnit');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.medicine.isPrescriptionRequired == "" || this.medicine.isPrescriptionRequired == undefined) {
      alert('Please Select Is Prescription Required');
      return false;
    } else if (this.medicine.vendor == "" || this.medicine.vendor == undefined) {
      alert('Please Enter Vendor');
      const element = this.renderer.selectRootElement('#vendor');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (!AppValidations.validateVendor(this.medicine.vendor)) {
      const element = this.renderer.selectRootElement('#vendor');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.medicine.usedFor == null || this.medicine.usedFor == undefined) {
      alert('Please Enter Used For');
      const element = this.renderer.selectRootElement('#usedFor');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (!this.validateProductDetails()) {
      return false;
    } else {
      return true;
    }
  }
  validateProductDetails(): boolean {
    if (this.medicine.productDetails != null && this.medicine.productDetails != undefined) {
      if (this.medicine.productDetails.sku == "" || this.medicine.productDetails.sku == undefined) {
        alert('Please Enter SKU');
        const element = this.renderer.selectRootElement('#sku');
        setTimeout(() => element.focus(), 0);
        return false;
      } else if (!AppValidations.validateSKU(this.medicine.productDetails.sku)) {
        const element = this.renderer.selectRootElement('#sku');
        setTimeout(() => element.focus(), 0);
        return false;
      } else if (this.medicine.productDetails.packSize == "" || this.medicine.productDetails.packSize == undefined) {
        alert('Please Enter Pack Size');
        const element = this.renderer.selectRootElement('#packSize');
        setTimeout(() => element.focus(), 0);
        return false;
      } else if (!AppValidations.validatePackSize(this.medicine.productDetails.packSize)) {
        const element = this.renderer.selectRootElement('#packSize');
        setTimeout(() => element.focus(), 0);
        return false;
      } else if (this.medicine.productDetails.unitCount == "" || this.medicine.productDetails.unitCount == undefined) {
        alert('Please Enter Unit Count');
        const element = this.renderer.selectRootElement('#unitCount');
        setTimeout(() => element.focus(), 0);
        return false;
      } else if (!AppValidations.validateUnitCount(this.medicine.productDetails.unitCount)) {
        const element = this.renderer.selectRootElement('#unitCount');
        setTimeout(() => element.focus(), 0);
        return false;
      } else if (this.medicine.productDetails.country == "" || this.medicine.productDetails.country == undefined) {
        alert('Please Enter Country');
        const element = this.renderer.selectRootElement('#country');
        setTimeout(() => element.focus(), 0);
        return false;
      } else if (!AppValidations.validateCountry(this.medicine.productDetails.country)) {
        const element = this.renderer.selectRootElement('#country');
        setTimeout(() => element.focus(), 0);
        return false;
      } else if (this.medicine.productDetails.description == "" || this.medicine.productDetails.description == undefined) {
        alert('Please Enter Medicine Description');
        const element = this.renderer.selectRootElement('#description');
        setTimeout(() => element.focus(), 0);
        return false;
      } else if (!AppValidations.validateDescription(this.medicine.productDetails.description, 'Description')) {
        const element = this.renderer.selectRootElement('#description');
        setTimeout(() => element.focus(), 0);
        return false;
      } else if (this.medicine.productDetails.highlights == null || this.medicine.productDetails.highlights == undefined) {
        alert('Please Enter Medicine Highlights');
        const element = this.renderer.selectRootElement('#highlights');
        setTimeout(() => element.focus(), 0);
        return false;
      } else if (this.medicine.productDetails.directionsForUse == "" || this.medicine.productDetails.directionsForUse == undefined) {
        alert('Please Enter Directions For Use');
        const element = this.renderer.selectRootElement('#directionsForUse');
        setTimeout(() => element.focus(), 0);
        return false;
      } else if (!AppValidations.validateDescription(this.medicine.productDetails.directionsForUse, 'Directions For Use')) {
        const element = this.renderer.selectRootElement('#directionsForUse');
        setTimeout(() => element.focus(), 0);
        return false;
      } else if (this.medicine.productDetails.storage == "" || this.medicine.productDetails.storage == undefined) {
        alert('Please Enter Medicine Storage');
        const element = this.renderer.selectRootElement('#storage');
        setTimeout(() => element.focus(), 0);
        return false;
      } else if (!AppValidations.validateDescription(this.medicine.productDetails.storage, 'Storage')) {
        const element = this.renderer.selectRootElement('#storage');
        setTimeout(() => element.focus(), 0);
        return false;
      } else if (this.medicine.productDetails.administrationInstructions == "" || this.medicine.productDetails.administrationInstructions == undefined) {
        alert('Please Enter Administration Instructions');
        const element = this.renderer.selectRootElement('#administrationInstructions');
        setTimeout(() => element.focus(), 0);
        return false;
      } else if (!AppValidations.validateDescription(this.medicine.productDetails.administrationInstructions, 'Administration Instructions')) {
        const element = this.renderer.selectRootElement('#administrationInstructions');
        setTimeout(() => element.focus(), 0);
        return false;
      } else if (this.medicine.productDetails.warning == "" || this.medicine.productDetails.warning == undefined) {
        alert('Please Enter warning');
        const element = this.renderer.selectRootElement('#warning');
        setTimeout(() => element.focus(), 0);
        return false;
      } else if (!AppValidations.validateDescription(this.medicine.productDetails.warning, 'Warning')) {
        const element = this.renderer.selectRootElement('#warning');
        setTimeout(() => element.focus(), 0);
        return false;
      } else if (this.medicine.productDetails.precaution == "" || this.medicine.productDetails.precaution == undefined) {
        alert('Please Enter Precaution');
        const element = this.renderer.selectRootElement('#precaution');
        setTimeout(() => element.focus(), 0);
        return false;
      } else if (!AppValidations.validateDescription(this.medicine.productDetails.precaution, 'Precaution')) {
        const element = this.renderer.selectRootElement('#precaution');
        setTimeout(() => element.focus(), 0);
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  onSubmit() {
    if (this.validateMedicineData()) {
      if (this.medicine.productDetails != null && this.medicine.productDetails != undefined) {
        this.medicine.productDetails.name = this.medicine.name;
      }
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

  onChangeDiscountPercentage() {
    if (this.medicine.discountPercentage == 0 || this.medicine.discountPercentage == undefined) {
      alert('Please Enter Discount Percentage');
      const element = this.renderer.selectRootElement('#discountPercentage');
      setTimeout(() => element.focus(), 0);
    } else if (this.medicine.discountPercentage < 0) {
      this.medicine.discountPercentage = 0;
      alert('Please Enter Discount Percentage value only in positive values');
      const element = this.renderer.selectRootElement('#discountPercentage');
      setTimeout(() => element.focus(), 0);
    } else if (this.medicine.discountPercentage >= 100) {
      this.medicine.discountPercentage = 0;
      alert('Please Enter Discount Percentage Less than 100');
      const element = this.renderer.selectRootElement('#discountPercentage');
      setTimeout(() => element.focus(), 0);
    }
  }

  addUsedFor() {
    this.medicine.usedFor = [];
    const usedForArray = this.usedFor.split(";");
    for (let index = 0; index < usedForArray.length; index++) {
      this.medicine.usedFor.push(usedForArray[index]);
    }
  }
  addHighlights() {
    this.medicine.productDetails.highlights = [];
    const highlightsArray = this.highlights.split(";");
    for (let index = 0; index < highlightsArray.length; index++) {
      this.medicine.productDetails.highlights.push(highlightsArray[index]);
    }
  }

}