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
    }
    this.currentUser.token = this.storageService.getToken();
    this.getUserData();
    //console.log('this.currentUser.token ::' + this.currentUser.token);
  }
  getUserData() {
    this.userService.getUser(this.currentUserInfo).subscribe((data: User) => {
      this.currentUser = data;
      if (this.currentUser.country == null || this.currentUser.country == undefined) {
        this.currentUser.country = new Country;
      }
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
    } else if (this.currentUser.address1 == "" || this.currentUser.address1 == undefined) {
      alert('Please Enter Address Line 1');
      const element = this.renderer.selectRootElement('#address1');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.currentUser.address2 == "" || this.currentUser.address2 == undefined) {
      alert('Please Enter Address Line 2');
      const element = this.renderer.selectRootElement('#address2');
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
    //alert(countryId);
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

