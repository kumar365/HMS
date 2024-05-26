import { Component, OnInit, Renderer2 } from '@angular/core';
import { AppValidations } from 'src/app/constant/app-validations';
import { MessageConstants } from 'src/app/constant/message-constants';
import { Ambulance } from 'src/app/model/ambulance';
import { MessageResponse } from 'src/app/model/message-response';
import { AuthService } from 'src/app/service/auth.service';


@Component({
  selector: 'app-ambulance-register',
  templateUrl: './ambulance-register.component.html',
  styleUrls: ['./ambulance-register.component.css']
})
export class AmbulanceRegisterComponent implements OnInit {
  message: any;
  statusFlag: boolean = false;
  ambulance: Ambulance = new Ambulance;
  showPassword: boolean = true;
  showPasswordConfirm: boolean = true;
  constructor(private authService: AuthService, private renderer: Renderer2) { }

  ngOnInit(): void {
  }
  toggleShow() {
    this.showPassword = !this.showPassword;
  }
  toggleShowConfirm() {
    this.showPassword = !this.showPassword;
  }
  onSubmit() {
    if (this.validateAmbulanceData()) {
      this.authService.registerAmbulance(this.ambulance).subscribe((data: MessageResponse) => {
        this.message = data.message;
        //console.log('this.message::' + this.message);
        if (this.message == MessageConstants.RegisterAmbulanceMessage) {
          this.statusFlag = true;
          this.ambulance = new Ambulance;
        }
      });
    }
  }

  validateAmbulanceData(): boolean {
    if (this.ambulance.fullName == "" || this.ambulance.fullName == undefined) {
      alert('Please Enter Full Name');
      const element = this.renderer.selectRootElement('#fullName');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.ambulance.mobileNumber == "" || this.ambulance.mobileNumber == undefined) {
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
    } else if (this.ambulance.confirmPassword == "" || this.ambulance.confirmPassword == undefined) {
      alert('Please Enter Confirm Password');
      const element = this.renderer.selectRootElement('#confirmPassword');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.ambulance.password != this.ambulance.confirmPassword) {
      alert('Confirm Password must be same as password');
      const element = this.renderer.selectRootElement('#confirmPassword');
      setTimeout(() => element.focus(), 0);
      return false;
    } else {
      return true;
    }
  }

  reloadPage(): void {
    window.location.reload();
  }
}
