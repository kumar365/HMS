import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-health-id-mobile',
  templateUrl: './health-id-mobile.component.html',
  styleUrls: ['./health-id-mobile.component.css']
})
export class HealthIdMobileComponent implements OnInit{
  constructor(private router: Router) {}
 ngOnInit(): void {
   
 }
 otp() {
   this.router.navigate(['/otp']);
 }
}