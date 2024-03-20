import { Component, OnInit, Renderer2 } from '@angular/core';
import { AppValidations } from 'src/app/constant/app-validations';
import { MessageConstants } from 'src/app/constant/message-constants';
import { ApiResponse } from 'src/app/model/api-response';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-patient-registration',
  templateUrl: './patient-registration.component.html',
  styleUrls: ['./patient-registration.component.css']
})
export class PatientRegistrationComponent implements OnInit {
  message: any;
  messageFlag: boolean = false;
  user: User = new User;
  showPassword = true;
  showDiv = true;
  termsAndConditionsFlag: Boolean = false;
  constructor(private authService: AuthService, private renderer: Renderer2) { }
  ngOnInit(): void {

  }
  toggleShow() {
    this.showPassword = !this.showPassword;
  }
  onSubmit() {
    if (this.validateUserData()) {
      this.authService.registerPatient(this.user).subscribe((data: ApiResponse) => {
        this.message = data.message;
        if (this.message == MessageConstants.RegisterPatientMessage) {
          this.messageFlag = true;
          this.user = new User;
        }
      });
    }
  }
  validateUserData(): boolean {
    if (this.user.displayName == "" || this.user.displayName == undefined) {
      alert('Please eneter Name');
      const element = this.renderer.selectRootElement('#displayName');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (!AppValidations.validateName(this.user.displayName)) {
      const element = this.renderer.selectRootElement('#displayName');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.user.email == "" || this.user.email == undefined) {
      alert('Please eneter Email');
      const element = this.renderer.selectRootElement('#email');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (!AppValidations.validateMail(this.user.email)) {
      const element = this.renderer.selectRootElement('#email');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.user.phoneNumber == "" || this.user.phoneNumber == undefined) {
      alert('Please eneter Phone Number');
      const element = this.renderer.selectRootElement('#phoneNumber');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (!AppValidations.validatePhoneNumber(this.user.phoneNumber)) {
      const element = this.renderer.selectRootElement('#phoneNumber');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.user.password == "" || this.user.password == undefined) {
      alert('Please eneter Password');
      const element = this.renderer.selectRootElement('#password');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (!AppValidations.validatePassword(this.user.password)) {
      const element = this.renderer.selectRootElement('#password');
      setTimeout(() => element.focus(), 0);
      return false;
    } else {
      return true;
    }
  }
  changeTermsAndConditions() {
    this.termsAndConditionsFlag = !this.termsAndConditionsFlag;
    if (this.termsAndConditionsFlag) {
      this.user.termsAndConditions = 'Y';
    } else {
      this.user.termsAndConditions = 'N';
    }
  }
}
