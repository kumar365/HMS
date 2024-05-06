import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppValidations } from 'src/app/constant/app-validations';
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
  constructor(private storageService: StorageService, private userService: UserService,
    private commonService: CommonService, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.currentUserInfo = this.storageService.getUser();
    if (this.currentUserInfo != null) {
      this.currentUserInfo.token = this.storageService.getToken();
      this.getUserData();
    }
    this.getCountries();
    this.getStates(this.currentUser.country.id);
    this.getCities(this.currentUser.state.id);
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
      this.currentUser.dateOfBirthString = this.convertDateToDateString(this.currentUser.dateOfBirth);
      this.currentUser.token = this.storageService.getToken();
    });
  }
  convertDateToDateString(orderDate: any) {
    var d = new Date(orderDate)
    return [d.getFullYear(), this.pad(d.getMonth() + 1), this.pad(d.getDate())].join('-');
  }
  pad(s: any) { return (s < 10) ? '0' + s : s; }

  onSubmit() {
    if (this.validateUserData()) {
      this.userService.updateProfile(this.currentUser).subscribe((data: MessageResponse) => {
        this.message = data.message;
        if (this.message == MessageConstants.UpdateProfileMessage) {
          this.storageService.saveUser(this.currentUser);
          this.statusFlag = true;
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
    } else if (this.currentUser.dateOfBirthString == "" || this.currentUser.dateOfBirthString == undefined) {
      alert('Please Enter Date Of Birth');
      const element = this.renderer.selectRootElement('#dateOfBirthString');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.currentUser.bloodGroup == "" || this.currentUser.bloodGroup == undefined) {
      alert('Please Select Blood Group');
      const element = this.renderer.selectRootElement('#bloodGroup');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.currentUser.email == "" || this.currentUser.email == undefined) {
      alert('Please eneter Email');
      const element = this.renderer.selectRootElement('#email');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (!AppValidations.validateMail(this.currentUser.email)) {
      const element = this.renderer.selectRootElement('#email');
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
    } else if (this.currentUser.address == "" || this.currentUser.address == undefined) {
      alert('Please Enter Address');
      const element = this.renderer.selectRootElement('#address');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (!AppValidations.validateAddress(this.currentUser.address)) {
      const element = this.renderer.selectRootElement('#address');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.currentUser.country.name == "" || this.currentUser.country.name == undefined) {
      alert('Please Select Country');
      const element = this.renderer.selectRootElement('#country');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.currentUser.state.name == "" || this.currentUser.state.name == undefined) {
      alert('Please Select state');
      const element = this.renderer.selectRootElement('#state');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.currentUser.city.name == "" || this.currentUser.city.name == undefined) {
      alert('Please Select city');
      const element = this.renderer.selectRootElement('#city');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.currentUser.pinCode == "" || this.currentUser.pinCode == undefined) {
      alert('Please Enter Zip Code');
      const element = this.renderer.selectRootElement('#pinCode');
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
    this.commonService.findStates(countryId).subscribe((stateData: State[]) => {
      this.states = stateData;
      this.cities = [];
    });
  }
  getCities(stateId: number) {
    this.commonService.findCities(stateId).subscribe((cityData: City[]) => {
      this.cities = cityData;
    });
  }
  onChangeCountry() {
    let countryId = this.currentUser.country.id;
    if (countryId) {
      this.commonService.findStates(countryId).subscribe((data: State[]) => {
        this.states = data;
        this.cities = [];
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
      });
    } else {
      this.cities = [];
    }
  }
  reloadPage(): void {
    window.location.reload();
  }
}
