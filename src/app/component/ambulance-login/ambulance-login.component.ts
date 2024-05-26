import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { AppValidations } from 'src/app/constant/app-validations';
import { Ambulance } from 'src/app/model/ambulance';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-ambulance-login',
  templateUrl: './ambulance-login.component.html',
  styleUrls: ['./ambulance-login.component.css']
})
export class AmbulanceLoginComponent implements OnInit {

  errorMessage = '';
  ambulance: Ambulance = new Ambulance;
  showPassword: boolean = true;
  constructor(private authService: AuthService, private router: Router, private renderer: Renderer2) { }
  ngOnInit(): void {
  }
  toggleShow() {
    this.showPassword = !this.showPassword;
  }
  onSubmit() {
    if (this.validateAmbulanceLoginData()) {
      this.authService.loginAmbulance(this.ambulance).subscribe(
        data => {
          if (data.success) {
            this.router.navigate(['/driverDashboard']);
          }
        },
        err => {
          this.errorMessage = err.error.message;
        }
      );

    }
  }
  validateAmbulanceLoginData(): boolean {
    if (this.ambulance.mobileNumber == "" || this.ambulance.mobileNumber == undefined) {
      alert('Please Eneter Mobile Number');
      const element = this.renderer.selectRootElement('#mobileNumber');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (!AppValidations.validatePhoneNumber(this.ambulance.mobileNumber)) {
      const element = this.renderer.selectRootElement('#mobileNumber');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.ambulance.password == "" || this.ambulance.password == undefined) {
      alert('Please Enter password');
      const element = this.renderer.selectRootElement('#password');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (!AppValidations.validatePassword(this.ambulance.password)) {
      const element = this.renderer.selectRootElement('#password');
      setTimeout(() => element.focus(), 0);
      return false;
    } else {
      return true;
    }
  }
}
