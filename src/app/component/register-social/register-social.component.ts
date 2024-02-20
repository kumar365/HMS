import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';


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

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
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

