import { Component, OnInit } from '@angular/core';
import { MessageConstants } from 'src/app/constant/message-constants';
import { ApiResponse } from 'src/app/model/api-response';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-patient-signup',
  templateUrl: './patient-signup.component.html',
  styleUrls: ['./patient-signup.component.css']
})
export class PatientSignupComponent implements OnInit {
  message: any;
  messageFlag: boolean = false;
  user: User = new User;
  showPassword = true;
  showDiv = true;
  constructor(private authService: AuthService) { }
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
    var validateFlag = false;
    if (this.user.displayName == "" || this.user.displayName == undefined) {
      alert('Please eneter Name');
      return validateFlag;
    } else if (this.user.email == "" || this.user.email == undefined) {
      alert('Please eneter Email');
      return validateFlag;
    } else if (this.user.phoneNumber == "" || this.user.phoneNumber == undefined) {
      alert('Please eneter Phone Number');
      return validateFlag;
    } else if (this.user.password == "" || this.user.password == undefined) {
      alert('Please eneter Password');
      return validateFlag;
    } else {
      validateFlag = true;
      return validateFlag;
    }
  }
}
