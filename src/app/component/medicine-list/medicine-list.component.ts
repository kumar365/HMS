import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Medicine } from 'src/app/model/medicine';
import { MedicineService } from 'src/app/service/medicine.service';

@Component({
   selector: 'app-medicine-list',
   templateUrl: './medicine-list.component.html',
   styleUrls: ['./medicine-list.component.css']
})
export class MedicineListComponent implements OnInit {
   title!: string;
   message!: string;
   medicineList!: Medicine[];
   constructor(private router: Router, private medicineService: MedicineService) { }
   ngOnInit() {
      this.title = "Medicine List";
      this.getMedicineList();
   }
   delete(medicine: Medicine): void {
      this.medicineService.deleteMedicine(medicine.id).subscribe((data: string) => {
         this.message = data;
         console.log('this.message::' + this.message);
         if (this.message === 'Medicine is deleted successfully') {
            this.getMedicineList();
         }
      });
   }
   getMedicineList() {
      this.medicineService.findAll().subscribe((data: Medicine[]) => {
         this.medicineList = data;
      });
   }
   edit(medicine: Medicine) {
      console.log('medicine.id::' + medicine.id);
      this.router.navigate(['medicine', { id: medicine.id }]);
   }
}