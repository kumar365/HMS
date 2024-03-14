import { Component, OnInit, Renderer2 } from '@angular/core';
import { AppValidations } from 'src/app/constant/app-validations';
import { ApiResponse } from 'src/app/model/api-response';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/service/auth.service';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  message: any;
  statusFlag: boolean = false;
  user: User = new User;
  constructor(private authService: AuthService, private renderer: Renderer2) { }

  ngOnInit(): void {

  }

  validateForgotPasswordData(): boolean {
    if (this.user.email == "" || this.user.email == undefined) {
      alert('Please eneter Email');
      const element = this.renderer.selectRootElement('#email');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (!AppValidations.validateMail(this.user.email)) {
      const element = this.renderer.selectRootElement('#email');
      setTimeout(() => element.focus(), 0);
      return false;
    } else {
      return true;
    }
  }
  onSubmit() {
    if (this.validateForgotPasswordData()) {
      this.authService.forgotPassword(this.user.email).subscribe((data: ApiResponse) => {
        this.message = data.message;
        if (data.success) {
          //this.statusFlag = true;
          window.open(this.message);
        }
      });
    }
  }
}
