import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Medicine } from 'src/app/model/medicine';
import { User } from 'src/app/model/user';
import { UserInfo } from 'src/app/model/user-info';
import { MedicineService } from 'src/app/service/medicine.service';
import { StorageService } from 'src/app/service/storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
   selector: 'app-medicine-list',
   templateUrl: './medicine-list.component.html',
   styleUrls: ['./medicine-list.component.css']
})
export class MedicineListComponent implements OnInit {
   title!: string;
   message!: string;
   currentUserInfo: UserInfo = new UserInfo;
   currentUser: User = new User;
   medicineList!: Medicine[];
   constructor(private storageService: StorageService, private route: ActivatedRoute, private userService: UserService,
      private router: Router, private medicineService: MedicineService, private renderer: Renderer2) {
   }
   ngOnInit() {
      this.currentUserInfo = this.storageService.getUser();
      this.currentUserInfo.token = this.storageService.getToken();
      this.getUserData();
      this.title = "Medicine List";
      this.getMedicineList();
   }
   getUserData() {
      this.userService.getUser(this.currentUserInfo).subscribe((data: User) => {
         this.currentUser = data;
      });
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
      this.medicineService.findAll(this.currentUserInfo.token).subscribe((data: Medicine[]) => {
         this.medicineList = data;
      });
   }
   edit(medicine: Medicine) {
      console.log('medicine.id::' + medicine.id);
      this.router.navigate(['medicine', { id: medicine.id }]);
   }
}