import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Medicine } from 'src/app/model/medicine';
import { MedicineService } from 'src/app/service/medicine.service';

@Component({
  selector: 'app-medicine',
  templateUrl: './medicine.component.html',
  styleUrls: ['./medicine.component.css']
})
export class MedicineComponent implements OnInit {

  medicine: Medicine;
  id: any;
  medicineList!: Medicine[];
  expiryDate: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private medicineService: MedicineService) {
    this.medicine = new Medicine();
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.medicineService.findById(this.id).subscribe((data: Medicine) => {
      this.medicine = data;
      console.log("this.medicine::" + this.medicine);
    });
  }

  onSubmit() {
    this.medicineService.save(this.medicine).subscribe(result => this.gotoMedicineList());
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