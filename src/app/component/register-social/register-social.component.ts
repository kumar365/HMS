import { Component, OnInit, Renderer2 } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { AppValidations } from 'src/app/constant/app-validations';


@Component({
  selector: 'app-register-social',
  templateUrl: './register-social.component.html',
  styleUrls: ['./register-social.component.css']
})
export class RegisterSocialComponent implements OnInit {

  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  showPassword: boolean = true;
  showPasswordConfirm: boolean = true;
  constructor(private authService: AuthService, private renderer: Renderer2) { }

  ngOnInit(): void {
  }
  toggleShow() {
    this.showPassword = !this.showPassword;
  }
  toggleShowConfirm() {
    this.showPasswordConfirm = !this.showPasswordConfirm;
  }
  validateRegistrationForm(): boolean {
    //alert('validateLoginForm');
    if (this.form.displayName == "" || this.form.displayName == undefined) {
      alert('Please Enter Display Name');
      const element = this.renderer.selectRootElement('#displayName');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (!AppValidations.validateName(this.form.displayName)) {
      const element = this.renderer.selectRootElement('#displayName');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.form.email == "" || this.form.email == undefined) {
      alert('Please Enter Email');
      const element = this.renderer.selectRootElement('#email');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (!AppValidations.validateMail(this.form.email)) {
      const element = this.renderer.selectRootElement('#email');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.form.password == "" || this.form.password == undefined) {
      alert('Please Enter password');
      const element = this.renderer.selectRootElement('#password');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (!AppValidations.validatePassword(this.form.password)) {
      const element = this.renderer.selectRootElement('#password');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.form.matchingPassword == "" || this.form.matchingPassword == undefined) {
      alert('Please Enter Confirm Password');
      const element = this.renderer.selectRootElement('#matchingPassword');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.form.password != this.form.matchingPassword) {
      alert('Please Enter Confirm Password same as Password');
      const element = this.renderer.selectRootElement('#matchingPassword');
      setTimeout(() => element.focus(), 0);
      return false;
    } else {
      return true;
    }
  }

  onSubmit(): void {
    if (this.validateRegistrationForm()) {
      this.authService.registerSocial(this.form).subscribe(
        data => {
          console.log(data);
          this.isSuccessful = true;
          this.isSignUpFailed = false;
        },
        err => {
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
        }
      );
    }
  }

}

