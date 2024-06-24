import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AppValidations } from 'src/app/constant/app-validations';
import { MessageConstants } from 'src/app/constant/message-constants';
import { City } from 'src/app/model/city';
import { Country } from 'src/app/model/country';
import { DoctorAwards } from 'src/app/model/doctor-awards';
import { DoctorDetails } from 'src/app/model/doctor-details';
import { DoctorEducation } from 'src/app/model/doctor-education';
import { DoctorExperience } from 'src/app/model/doctor-experience';
import { DoctorMemberships } from 'src/app/model/doctor-memberships';
import { DoctorRegistration } from 'src/app/model/doctor-registration';
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
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  preview = '';
  retrievedImage: any;

  constructor(private storageService: StorageService, private userService: UserService, private router: Router,
    private commonService: CommonService, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.currentUserInfo = this.storageService.getDoctorUser();
    if (this.currentUserInfo != null) {
      this.currentUserInfo.token = this.storageService.getDoctorToken();
      this.getUserData();
    } else {
      this.router.navigate(['/loginEmail']);
    }
    this.getCountries();
    this.getStates();
    this.getCities();
    if (this.currentUser.doctorDetails.doctorEducations.length == 0) {
      let doctorEducation = new DoctorEducation;
      doctorEducation.index = 1;
      this.currentUser.doctorDetails.doctorEducations.push(doctorEducation);
    }
    if (this.currentUser.doctorDetails.doctorExperiences.length == 0) {
      let doctorExperience = new DoctorExperience;
      doctorExperience.index = 1;
      this.currentUser.doctorDetails.doctorExperiences.push(doctorExperience);
    }
    if (this.currentUser.doctorDetails.doctorAwards.length == 0) {
      let doctorAwards = new DoctorAwards;
      doctorAwards.index = 1;
      this.currentUser.doctorDetails.doctorAwards.push(doctorAwards);
    }
    if (this.currentUser.doctorDetails.doctorMemberships.length == 0) {
      let doctorMemberships = new DoctorMemberships;
      doctorMemberships.index = 1;
      this.currentUser.doctorDetails.doctorMemberships.push(doctorMemberships);
    }
    if (this.currentUser.doctorDetails.doctorRegistrations.length == 0) {
      let doctorRegistration = new DoctorRegistration;
      doctorRegistration.index = 1;
      this.currentUser.doctorDetails.doctorRegistrations.push(doctorRegistration);
    }
  }
  getUserData() {
    this.userService.getUser(this.currentUserInfo).subscribe((data: User) => {
      this.currentUser = data;
      if (this.currentUser.imageData != null && this.currentUser.imageData != undefined) {
        this.retrievedImage = 'data:image/jpeg;base64,' + this.currentUser.imageData;
      }
      if (this.currentUser.country == null || this.currentUser.country == undefined) {
        this.currentUser.country = new Country;
      }
      if (this.currentUser.state == null || this.currentUser.state == undefined) {
        this.currentUser.state = new State;
      }
      if (this.currentUser.city == null || this.currentUser.city == undefined) {
        this.currentUser.city = new City;
      }
      if (this.currentUser.doctorDetails == null || this.currentUser.doctorDetails == undefined) {
        this.currentUser.doctorDetails = new DoctorDetails;
        if (this.currentUser.doctorDetails != null && (this.currentUser.doctorDetails.hospital == null || this.currentUser.doctorDetails.hospital == undefined)) {
          this.currentUser.doctorDetails.hospital = new Hospital;
        }
      }
      if (this.currentUser.doctorDetails.doctorEducations.length > 0) {
        for (let index = 0; index < this.currentUser.doctorDetails.doctorEducations.length; index++) {
          this.currentUser.doctorDetails.doctorEducations[index].index = index + 1;
        }
      }
      this.currentUser.dateOfBirthString = this.convertDateToDateString(this.currentUser.dateOfBirth);
      this.currentUser.token = this.storageService.getDoctorToken();
    });
  }
  convertDateToDateString(orderDate: any) {
    var d = new Date(orderDate)
    return [d.getFullYear(), this.pad(d.getMonth() + 1), this.pad(d.getDate())].join('-');
  }
  pad(s: any) { return (s < 10) ? '0' + s : s; }

  selectFile(event: any): void {
    this.preview = '';
    this.progress = 0;
    this.selectedFiles = event.target.files;
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      if (file) {
        this.preview = '';
        this.currentFile = file;
        const reader = new FileReader();
        reader.onload = (e: any) => {
          console.log(e.target.result);
          this.preview = e.target.result;
        };
        this.currentUser.profileImage = this.currentFile;
        for (let i = 0; i < this.selectedFiles.length; i++) {
          this.currentUser.files.push(this.selectedFiles[i]);
        }
        reader.readAsDataURL(this.currentFile);
      }
    }
  }

  getCountries() {
    this.commonService.findCountries().subscribe((data: Country[]) => {
      this.countries = data;
      this.states = [];
    });
  }
  getStates() {
    this.commonService.findStates().subscribe((stateData: State[]) => {
      this.states = stateData;
      this.cities = [];
    });
  }
  getStatesById(countryId: number) {
    if (countryId > 0) {
      this.commonService.findStatesByCountryId(countryId).subscribe((stateData: State[]) => {
        this.states = stateData;
        this.cities = [];
      });
    }
  }
  getCities() {
    this.commonService.findCities().subscribe((cityData: City[]) => {
      this.cities = cityData;
    });
  }
  getCitiesById(stateId: number) {
    if (stateId > 0) {
      this.commonService.findCitiesByStateId(stateId).subscribe((cityData: City[]) => {
        this.cities = cityData;
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
    } else if (this.currentUser.bloodGroup == "" || this.currentUser.bloodGroup == undefined) {
      alert('Please Select Blood Group');
      const element = this.renderer.selectRootElement('#bloodGroup');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (this.currentUser.biography == "" || this.currentUser.biography == undefined) {
      alert('Please Enter Biography');
      const element = this.renderer.selectRootElement('#biography');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (!this.validateRegistrationData()) {
      return false;
    } else if (!this.validateClinicInfoData()) {
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
    } else if (this.currentUser.pinCode == "" || this.currentUser.pinCode == undefined) {
      alert('Please Enter Postal Code');
      const element = this.renderer.selectRootElement('#pinCode');
      setTimeout(() => element.focus(), 0);
      return false;
    } else if (!this.validatePricing()) {
      return false;
    } else if (!this.validateServiceAndSpecialization()) {
      return false;
    } else {
      return true;
    }
  }
  validateRegistrationData(): boolean {
    if (this.currentUser.doctorDetails != null && this.currentUser.doctorDetails != undefined) {
      this.currentUser.doctorDetails.name = this.currentUser.displayName;
      if (this.currentUser.doctorDetails.registrationNumber == "" || this.currentUser.doctorDetails.registrationNumber == undefined) {
        alert('Please eneter Registration Number');
        const element = this.renderer.selectRootElement('#registrationNumber');
        setTimeout(() => element.focus(), 0);
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }
  validateClinicInfoData(): boolean {
    if (this.currentUser.doctorDetails != null && this.currentUser.doctorDetails != undefined) {
      if (this.currentUser.doctorDetails.hospital != null && this.currentUser.doctorDetails.hospital != undefined) {
        if (this.currentUser.doctorDetails.hospital.name == "" || this.currentUser.doctorDetails.hospital.name == undefined) {
          alert('Please eneter Hospital Name');
          const element = this.renderer.selectRootElement('#hospitalName');
          setTimeout(() => element.focus(), 0);
          return false;
        } else if (!AppValidations.validateName(this.currentUser.doctorDetails.hospital.name)) {
          const element = this.renderer.selectRootElement('#hospitalName');
          setTimeout(() => element.focus(), 0);
          return false;
        } else if (this.currentUser.doctorDetails.hospital.address == "" || this.currentUser.doctorDetails.hospital.address == undefined) {
          alert('Please eneter Hospital Address');
          const element = this.renderer.selectRootElement('#hospitalAddress');
          setTimeout(() => element.focus(), 0);
          return false;
        } else if (!AppValidations.validateAddress(this.currentUser.doctorDetails.hospital.address)) {
          const element = this.renderer.selectRootElement('#hospitalAddress');
          setTimeout(() => element.focus(), 0);
          return false;
        } else {
          return true;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  validatePricing(): boolean {
    if (this.currentUser.doctorDetails != null && this.currentUser.doctorDetails != undefined) {
      if (this.currentUser.doctorDetails.clinicVisitFee <= 0 || this.currentUser.doctorDetails.clinicVisitFee == undefined) {
        alert('Please eneter Clinic Visit Fees');
        const element = this.renderer.selectRootElement('#clinicVisitFee');
        setTimeout(() => element.focus(), 0);
        return false;
      } else if (!AppValidations.validatePrice(this.currentUser.doctorDetails.clinicVisitFee)) {
        const element = this.renderer.selectRootElement('#clinicVisitFee');
        setTimeout(() => element.focus(), 0);
        return false;
      } else if (this.currentUser.doctorDetails.teleConsultationFee <= 0 || this.currentUser.doctorDetails.teleConsultationFee == undefined) {
        alert('Please eneter Tele Consultation Fees');
        const element = this.renderer.selectRootElement('#teleConsultationFee');
        setTimeout(() => element.focus(), 0);
        return false;
      } else if (!AppValidations.validatePrice(this.currentUser.doctorDetails.teleConsultationFee)) {
        const element = this.renderer.selectRootElement('#teleConsultationFee');
        setTimeout(() => element.focus(), 0);
        return false;
      } else if (this.currentUser.doctorDetails.videoConsultFee <= 0 || this.currentUser.doctorDetails.videoConsultFee == undefined) {
        alert('Please eneter Video Consultation Fees');
        const element = this.renderer.selectRootElement('#videoConsultFee');
        setTimeout(() => element.focus(), 0);
        return false;
      } else if (!AppValidations.validatePrice(this.currentUser.doctorDetails.videoConsultFee)) {
        const element = this.renderer.selectRootElement('#videoConsultFee');
        setTimeout(() => element.focus(), 0);
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }
  validateServiceAndSpecialization(): boolean {
    if (this.currentUser.doctorDetails != null && this.currentUser.doctorDetails != undefined) {
      if (this.currentUser.doctorDetails.service == "" || this.currentUser.doctorDetails.service == undefined) {
        alert('Please eneter Service Details');
        const element = this.renderer.selectRootElement('#service');
        setTimeout(() => element.focus(), 0);
        return false;
      } else if (this.currentUser.doctorDetails.specialization == "" || this.currentUser.doctorDetails.specialization == undefined) {
        alert('Please eneter specialization Details');
        const element = this.renderer.selectRootElement('#specialization');
        setTimeout(() => element.focus(), 0);
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  onSubmit() {
    if (this.validateUserData()) {
      this.currentUser.token = this.storageService.getDoctorToken();
      this.userService.updateProfile(this.currentUser).subscribe((data: MessageResponse) => {
        this.message = data.message;
        if (this.message == MessageConstants.UpdateProfileMessage) {
          this.storageService.saveDoctorUser(this.currentUser);
          this.profileStatusFlag = true;
        }
      });
    }
  }


  onChangeCountry() {
    let countryId = this.currentUser.country.id;
    if (countryId > 0) {
      this.getStatesById(countryId);
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
    if (stateId > 0) {
      this.getCitiesById(stateId);
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
  addEducation() {
    let doctorEducation = new DoctorEducation;
    doctorEducation.index = this.currentUser.doctorDetails.doctorEducations.length + 1;
    this.currentUser.doctorDetails.doctorEducations.push(doctorEducation);
  }
  deleteEducation(index: any) {
    this.currentUser.doctorDetails.doctorEducations = this.currentUser.doctorDetails.doctorEducations.filter(obj => obj.index != index);
  }
  addExperience() {
    let doctorExperience = new DoctorExperience;
    doctorExperience.index = this.currentUser.doctorDetails.doctorExperiences.length + 1;
    this.currentUser.doctorDetails.doctorExperiences.push(doctorExperience);
  }
  deleteExperience(index: any) {
    this.currentUser.doctorDetails.doctorExperiences = this.currentUser.doctorDetails.doctorExperiences.filter(obj => obj.index != index);
  }
  addAwards() {
    let doctorAwards = new DoctorAwards;
    doctorAwards.index = this.currentUser.doctorDetails.doctorAwards.length + 1;
    this.currentUser.doctorDetails.doctorAwards.push(doctorAwards);
  }
  deleteAwards(index: any) {
    this.currentUser.doctorDetails.doctorAwards = this.currentUser.doctorDetails.doctorAwards.filter(obj => obj.index != index);
  }
  addMemberships() {
    let doctorMemberships = new DoctorMemberships;
    doctorMemberships.index = this.currentUser.doctorDetails.doctorMemberships.length + 1;
    this.currentUser.doctorDetails.doctorMemberships.push(doctorMemberships);
  }
  deleteMemberships(index: any) {
    this.currentUser.doctorDetails.doctorMemberships = this.currentUser.doctorDetails.doctorMemberships.filter(obj => obj.index != index);
  }
  addRegistration() {
    let doctorRegistration = new DoctorRegistration;
    doctorRegistration.index = this.currentUser.doctorDetails.doctorRegistrations.length + 1;
    this.currentUser.doctorDetails.doctorRegistrations.push(doctorRegistration);
  }
  deleteRegistration(index: any) {
    this.currentUser.doctorDetails.doctorRegistrations = this.currentUser.doctorDetails.doctorRegistrations.filter(obj => obj.index != index);
  }
  reloadPage(): void {
    window.location.reload();
  }
}

