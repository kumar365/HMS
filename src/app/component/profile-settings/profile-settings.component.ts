import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MessageConstants } from 'src/app/constant/message-constants';
import { City } from 'src/app/model/city';
import { Country } from 'src/app/model/country';
import { MessageResponse } from 'src/app/model/message-response';
import { State } from 'src/app/model/state';
import { User } from 'src/app/model/user';
import { UserInfo } from 'src/app/model/user-info';
import { CommonService } from 'src/app/service/common.service';
import { StorageService } from 'src/app/service/storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})
export class ProfileSettingsComponent implements OnInit {
  message: any;
  statusFlag: boolean = false;
  currentUserInfo: UserInfo = new UserInfo;
  currentUser: User = new User;
  countries: Country[] = [];
  states: State[] = [];
  cities: City[] = [];
  formData!: FormGroup;
  constructor(private storageService: StorageService, private userService: UserService, private commonService: CommonService) { }

  ngOnInit(): void {
    this.currentUserInfo = this.storageService.getUser();
    this.currentUserInfo.token = this.storageService.getToken();
    this.currentUser.token = this.storageService.getToken();
    this.getUserData();
    //console.log('this.currentUser.token ::' + this.currentUser.token);
  }
  getUserData() {
    this.userService.getUser(this.currentUserInfo).subscribe((data: User) => {
      //console.log('data ::' + data);
      this.currentUser = data;
      this.currentUser.dateOfBirthString = this.convertDateToDateString(this.currentUser.dateOfBirth);
      this.getCountries();
      this.getStates(this.currentUser.country.id);
      this.getCities(this.currentUser.state.id);
    });
  }
  convertDateToDateString(orderDate: any) {
    var d = new Date(orderDate)
    return [d.getFullYear(), this.pad(d.getMonth() + 1), this.pad(d.getDate())].join('-');
  }
  pad(s: any) { return (s < 10) ? '0' + s : s; }
  onClickSubmit() {
    //console.log('this.currentUser.phoneNumber::' + this.currentUser.phoneNumber);
    console.log('this.currentUser.dateOfBirthString::' + this.currentUser.dateOfBirthString);
    this.userService.updateProfile(this.currentUser).subscribe((data: MessageResponse) => {
      this.message = data.message;
      //console.log('this.message::' + this.message);
      if (this.message == MessageConstants.UpdateProfileMessage) {
        //this.storageService.saveUser(this.currentUser);
        this.statusFlag = true;
        //this.setForm();
      }
    });
  }

  getCountries() {
    this.commonService.findCountries().subscribe((data: Country[]) => {
      this.countries = data;
      this.states = [];
      //console.log('this.countries::' + this.countries);
    });
  }
  getStates(country: number) {
    console.log('country::', country);
    this.commonService.findStates(country).subscribe((stateData: State[]) => {
      this.states = stateData;
      this.cities = [];
      //console.log('this.states::' + this.states);
    });
  }
  getCities(state: number) {
    this.commonService.findCities(state).subscribe((cityData: City[]) => {
      this.cities = cityData;
      //console.log('this.cities::' + this.cities);
    });
  }
  onChangeCountry() {
    let countryId = this.currentUser.country.id;
    if (countryId) {
      this.commonService.findStates(countryId).subscribe((data: State[]) => {
        this.states = data;
        this.cities = [];
        //console.log('this.states::' + this.states);
      });

    } else {
      this.states = [];
      this.cities = [];
    }
  }
  onChangeState() {
    let stateId = this.currentUser.state.id;
    if (stateId) {
      this.commonService.findCities(stateId).subscribe((data: City[]) => {
        this.cities = data;
        //console.log('this.cities::' + this.cities);
      });
    } else {
      this.cities = [];
    }
  }
  reloadPage(): void {
    window.location.reload();
  }
}
