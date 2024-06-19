import { Component, OnInit } from '@angular/core';
import { SearchDoctorFilter } from 'src/app/model/search-doctor-filter';
import { User } from 'src/app/model/user';
import { UserInfo } from 'src/app/model/user-info';
import { CommonService } from 'src/app/service/common.service';
import { StorageService } from 'src/app/service/storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-search-doctors',
  templateUrl: './search-doctors.component.html',
  styleUrls: ['./search-doctors.component.css']
})
export class SearchDoctorsComponent implements OnInit {
  message: any;
  statusFlag: boolean = false;
  currentUserInfo: UserInfo = new UserInfo;
  currentUser: User = new User;
  doctorsList: User[] = [];
  doctorsListBKP: User[] = [];
  retrievedImage: any;
  filter: SearchDoctorFilter = new SearchDoctorFilter;

  genderList = [
    { label: 'Male', selected: false },
    { label: 'Female', selected: false }
  ];

  availabilityList = [
    { label: 'Available Today', selected: false },
    { label: 'Available Tomorrow', selected: false },
    { label: 'Available in Next 7 Days', selected: false },
    { label: 'Available in Next 30 Days', selected: false }
  ];

  specialityList = [
    { label: 'Urology', selected: false },
    { label: 'Ophthalmology', selected: false },
    { label: 'Cardiology', selected: false }
  ];

  experienceList = [
    { label: '1-5 Years', selected: false },
    { label: '5+ Years', selected: false }
  ];
  constructor(private storageService: StorageService, private userService: UserService,
    private commonService: CommonService) { }

  ngOnInit(): void {
    this.currentUserInfo = this.storageService.getUser();
    if (this.currentUserInfo != null) {
      this.currentUserInfo.token = this.storageService.getToken();
      this.getUserData();
    }
    this.getDoctorsList();
  }
  getUserData() {
    this.userService.getUser(this.currentUserInfo).subscribe((data: User) => {
      this.currentUser = data;
      if (this.currentUser.imageData != null && this.currentUser.imageData != undefined) {
        this.retrievedImage = 'data:image/jpeg;base64,' + this.currentUser.imageData;
      }
    });
  }
  getDoctorsList() {
    this.commonService.getDoctorsList().subscribe((data: User[]) => {
      this.doctorsList = data;
      this.doctorsListBKP = this.doctorsList;
    });
  }
  genderChecked(event: any) {
    if (event.target.value === 'Male' && event.target.checked) {
      this.doctorsList = this.doctorsList.filter(d => d.gender === 'Male')
    } else if (event.target.value === 'Female' && event.target.checked) {
      this.doctorsList = this.doctorsList.filter(d => d.gender === 'Female')
    } else if (event.target.value === 'Male' && !event.target.checked) {
      this.doctorsList = this.doctorsListBKP;
    } else if (event.target.value === 'Female' && !event.target.checked) {
      this.doctorsList = this.doctorsListBKP;
    }
  }
  availabilityChecked(event: any) {
    if (event.target.value === 'Available Today' && event.target.checked) {
      this.doctorsList = this.doctorsListBKP;
    } else if (event.target.value === 'Available Tomorrow' && event.target.checked) {
      this.doctorsList = this.doctorsListBKP;
    } else if (event.target.value === 'Available in Next 7 Days' && event.target.checked) {
      this.doctorsList = this.doctorsListBKP;
    } else if (event.target.value === 'Available in Next 30 Days' && event.target.checked) {
      this.doctorsList = this.doctorsListBKP;
    } else if (event.target.value === 'Available Today' && !event.target.checked) {
      this.doctorsList = this.doctorsListBKP;
    } else if (event.target.value === 'Available Tomorrow' && !event.target.checked) {
      this.doctorsList = this.doctorsListBKP;
    } else if (event.target.value === 'Available in Next 7 Days'! && event.target.checked) {
      this.doctorsList = this.doctorsListBKP;
    } else if (event.target.value === 'Available in Next 30 Days'! && event.target.checked) {
      this.doctorsList = this.doctorsListBKP;
    }
  }
  specialityChecked(event: any) {
    if (event.target.value === 'Urology' && event.target.checked) {
      this.doctorsList = this.doctorsListBKP;
    } else if (event.target.value === 'Ophthalmology' && event.target.checked) {
      this.doctorsList = this.doctorsListBKP;
    } else if (event.target.value === 'Cardiology' && event.target.checked) {
      this.doctorsList = this.doctorsListBKP;
    } else if (event.target.value === 'Urology' && !event.target.checked) {
      this.doctorsList = this.doctorsListBKP;
    } else if (event.target.value === 'Ophthalmology' && !event.target.checked) {
      this.doctorsList = this.doctorsListBKP;
    } else if (event.target.value === 'Cardiology'! && event.target.checked) {
      this.doctorsList = this.doctorsListBKP;
    }
  }
  experienceChecked(event: any) {
    if (event.target.value === '1-5 Years' && event.target.checked) {
      this.doctorsList = this.doctorsListBKP;
    } else if (event.target.value === '5+ Years' && event.target.checked) {
      this.doctorsList = this.doctorsListBKP;
    } else if (event.target.value === '1-5 Years' && !event.target.checked) {
      this.doctorsList = this.doctorsListBKP;
    } else if (event.target.value === '5+ Years' && !event.target.checked) {
      this.doctorsList = this.doctorsListBKP;
    }
  }
  resetFilters() {
    this.doctorsList = this.doctorsListBKP;
    this.genderList.forEach(item => item.selected = false);
    this.availabilityList.forEach(item => item.selected = false);
    this.specialityList.forEach(item => item.selected = false);
    this.experienceList.forEach(item => item.selected = false);
  }
}
