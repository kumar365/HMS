import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppValidations } from 'src/app/constant/app-validations';
import { MessageConstants } from 'src/app/constant/message-constants';
import { City } from 'src/app/model/city';
import { Country } from 'src/app/model/country';
import { Hospital } from 'src/app/model/hospital';
import { MessageResponse } from 'src/app/model/message-response';
import { State } from 'src/app/model/state';
import { User } from 'src/app/model/user';
import { UserInfo } from 'src/app/model/user-info';
import { CommonService } from 'src/app/service/common.service';
import { StorageService } from 'src/app/service/storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-doctor-profile-settings',
  templateUrl: './doctor-profile-settings.component.html',
  styleUrls: ['./doctor-profile-settings.component.css']
})
export class DoctorProfileSettingsComponent implements OnInit {
  message: any;
  profileStatusFlag: boolean = false;
  currentUserInfo: UserInfo = new UserInfo;
  currentUser: User = new User;
  countries: Country[] = [];
  states: State[] = [];
  cities: City[] = [];
  formData!: FormGroup;
  constructor(private storageService: StorageService, private userService: UserService,
    private commonService: CommonService, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.currentUserInfo = this.storageService.getUser();
    if (this.currentUserInfo != null) {
      this.currentUserInfo.token = this.storageService.getToken();
      this.getUserData();
    }
    this.getCountries();
    if (this.currentUser.country != null && this.currentUser.country != undefined) {
      this.getStates(this.currentUser.country.id);
    }
    if (this.currentUser.state != null && this.currentUser.state != undefined) {
      this.getCities(this.currentUser.state.id);
    }
  }
  getUserData() {
    this.userService.getUser(this.currentUserInfo).subscribe((data: User) => {
      this.currentUser = data;
      if (this.currentUser.country == null || this.currentUser.country == undefined) {
        this.currentUser.country = new Country;
      }
      if (this.currentUser.state == null || this.currentUser.state == undefined) {
        this.currentUser.state = new State;
      }
      if (this.currentUser.city == null || this.currentUser.city == undefined) {
        this.currentUser.city = new City;
      }
      if (this.currentUser.hospital == null || this.currentUser.hospital == undefined) {
        this.currentUser.hospital = new Hospital;
      }
      this.currentUser.dateOfBirthString = this.convertDateToDateString(this.currentUser.dateOfBirth);
      this.currentUser.token = this.storageService.getToken();
    });
  }
  convertDateToDateString(orderDate: any) {
    var d = new Date(orderDate)
    return [d.getFullYear(), this.pad(d.getMonth() + 1), this.pad(d.getDate())].join('-');
  }
  pad(s: any) { return (s < 10) ? '0' + s : s; }

  uploadFile() {
    this.currentUser.token = this.storageService.getToken();
    this.userService.uploadFile(this.currentUser).subscribe((data: MessageResponse) => {
      this.message = data.message;
      alert(this.message);
    });
  }
  onSubmit() {
    if (this.validateUserData()) {
      this.currentUser.token = this.storageService.getToken();
      this.userService.updateProfile(this.currentUser).subscribe((data: MessageResponse) => {
        this.message = data.message;
        if (this.message == MessageConstants.UpdateProfileMessage) {
          this.storageService.saveUser(this.currentUser);
          this.profileStatusFlag = true;
        }
      });
    }
  }
  validateUserData(): boolean {
    if (this.currentUser.firstName == "" || this.currentUser.firstName == undefined) {
      alert('Please eneter First Name');
      const element = this.renderer.selectRootElement('#firstName');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (!AppValidations.validateName(this.currentUser.firstName)) {
      const element = this.renderer.selectRootElement('#firstName');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.currentUser.lastName == "" || this.currentUser.lastName == undefined) {
      alert('Please eneter Last Name');
      const element = this.renderer.selectRootElement('#lastName');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (!AppValidations.validateName(this.currentUser.lastName)) {
      const element = this.renderer.selectRootElement('#lastName');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.currentUser.phoneNumber == "" || this.currentUser.phoneNumber == undefined) {
      alert('Please eneter Phone Number');
      const element = this.renderer.selectRootElement('#phoneNumber');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (!AppValidations.validatePhoneNumber(this.currentUser.phoneNumber)) {
      const element = this.renderer.selectRootElement('#phoneNumber');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.currentUser.gender == "" || this.currentUser.gender == undefined) {
      alert('Please Select Gender');
      const element = this.renderer.selectRootElement('#gender');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.currentUser.dateOfBirthString == "" || this.currentUser.dateOfBirthString == undefined) {
      alert('Please Enter Date Of Birth');
      const element = this.renderer.selectRootElement('#dateOfBirthString');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.currentUser.biography == "" || this.currentUser.biography == undefined) {
      alert('Please Enter Biography');
      const element = this.renderer.selectRootElement('#biography');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.currentUser.address == "" || this.currentUser.address == undefined) {
      alert('Please Enter Address');
      const element = this.renderer.selectRootElement('#address');
      setTimeout(() => element.focus(), 0);
      return false;
    } else {
      return true;
    }
  }

  getCountries() {
    this.commonService.findCountries().subscribe((data: Country[]) => {
      this.countries = data;
      this.states = [];
    });
  }
  getStates(countryId: number) {
    if (countryId > 0) {
      this.commonService.findStates(countryId).subscribe((stateData: State[]) => {
        this.states = stateData;
        alert('this.states size:: ' + this.states.length);
        this.cities = [];
      });
    }
  }
  getCities(stateId: number) {
    if (stateId > 0) {
      this.commonService.findCities(stateId).subscribe((cityData: City[]) => {
        this.cities = cityData;
        alert('this.cities size:: ' + this.cities.length);
      });
    }
  }
  onChangeCountry() {
    let countryId = this.currentUser.country.id;
    if (countryId) {
      this.commonService.findStates(countryId).subscribe((data: State[]) => {
        this.states = data;
        this.cities = [];
      });
      for (let index = 0; index < this.countries.length; index++) {
        if (this.countries[index].id == countryId) {
          this.currentUser.country = this.countries[index];
        }
      }
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
      });
      for (let index = 0; index < this.states.length; index++) {
        if (this.states[index].id == stateId) {
          this.currentUser.state = this.states[index];
        }
      }
    } else {
      this.cities = [];
    }
  }
  onChangeCity() {
    for (let index = 0; index < this.cities.length; index++) {
      if (this.cities[index].id == this.currentUser.city.id) {
        this.currentUser.city = this.cities[index];
      }
    }
  }
  reloadPage(): void {
    window.location.reload();
  }
}

