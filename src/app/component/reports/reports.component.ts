import { Component } from '@angular/core';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent {
  title = 'Reports';
  expenseEntry = { 
    id: 1, 
    item: "PizzaDosa", 
    amount: 21, 
    category: "Food", 
    location: "Zomato", 
    spendOn: new Date(2020, 6, 1, 10, 10, 10), createdOn: new Date(2020, 6, 1, 10, 10, 10), 
 }; 
}
