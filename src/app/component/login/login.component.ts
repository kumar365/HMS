import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../model/user';
import { AuthService } from '../../service/auth.service';
import { StorageService } from '../../service/storage.service';


@Component({
   selector: 'app-login',
   templateUrl: './login.component.html',
   styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

   userName!: string;
   password!: string;
   formData!: FormGroup;
   isLoggedIn = false;
   isLoginFailed = false;
   errorMessage = '';
   roles: string[] = [];
   showPassword: boolean = true;
   constructor(private authService: AuthService, private storageService: StorageService, private router: Router) { }

   ngOnInit() {
      this.formData = new FormGroup({
         userName: new FormControl(""),
         password: new FormControl(""),
      });
      if (this.storageService.isLoggedIn()) {
         this.isLoggedIn = true;
         this.roles = this.storageService.getUser().roles;
      }
   }
   toggleShow() {
      this.showPassword = !this.showPassword;
   }
   onSubmit(data: any) {
      this.userName = data.userName;
      this.password = data.password;

      console.log("Login page: " + this.userName);
      console.log("Login page: " + this.password);

      this.authService.login(this.userName, this.password)
         .subscribe((user: User) => {
            console.log('user:: ' + user);
            console.log("token :: " + user.token);
            this.storageService.saveUser(user);
            this.isLoginFailed = false;
            this.isLoggedIn = true;
            // this.roles = this.storageService.getUser().roles;
            //this.reloadPage();
            if (user.token) {
               this.router.navigate(['/patientDashboard']);
            }

            for (let index = 0; index < this.roles.length; index++) {
               const element = this.roles[index];
               if (element == 'ROLE_PATIENT') {
                  this.router.navigate(['/patientDashboard']);
               }
               if (element == 'ROLE_DOCTOR') {
                  this.router.navigate(['/doctorDashboard']);
               }
            }

         });
   }
   reloadPage(): void {
      window.location.reload();
   }
}

