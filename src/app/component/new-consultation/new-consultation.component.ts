import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-consultation',
  templateUrl: './new-consultation.component.html',
  styleUrls: ['./new-consultation.component.css']
})
export class NewConsultationComponent implements OnInit {
  firstDivFlag: boolean = true;
  secondDivFlag: boolean = false;
  thirdDivFlag: boolean = false;
  ngOnInit(): void {

  }
  secondDiv() {
    this.firstDivFlag = false;
    this.secondDivFlag = true;
    this.thirdDivFlag = false;
  }
}
