import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './component/home/home.component';
import { AccountsComponent } from './component/accounts/accounts.component';
import { AmbBookingSuccessComponent } from './component/amb-booking-success/amb-booking-success.component';
import { AmbCheckoutComponent } from './component/amb-checkout/amb-checkout.component';
import { AmbulanceBookingComponent } from './component/ambulance-booking/ambulance-booking.component';
import { AppointmentComponent } from './component/appointment/appointment.component';
import { BookAmbulanceComponent } from './component/book-ambulance/book-ambulance.component';
import { BookingConsultationComponent } from './component/booking-consultation/booking-consultation.component';
import { CartComponent } from './component/cart/cart.component';
import { ChangePasswordComponent } from './component/change-password/change-password.component';
import { ConsultantsPanelComponent } from './component/consultants-panel/consultants-panel.component';
import { ConsultationComponent } from './component/consultation/consultation.component';
import { ConsultationCheckoutComponent } from './component/consultation-checkout/consultation-checkout.component';
import { DependentComponent } from './component/dependent/dependent.component';
import { DoctorDashboardComponent } from './component/doctor-dashboard/doctor-dashboard.component';
import { DoctorRegistrationComponent } from './component/doctor-registration/doctor-registration.component';
import { FindDoctorsComponent } from './component/find-doctors/find-doctors.component';
import { FindSurgeonsComponent } from './component/find-surgeons/find-surgeons.component';
import { HealthIdCreationComponent } from './component/health-id-creation/health-id-creation.component';
import { HealthIdMobileComponent } from './component/health-id-mobile/health-id-mobile.component';
import { InvoiceViewComponent } from './component/invoice-view/invoice-view.component';
import { LabCheckoutComponent } from './component/lab-checkout/lab-checkout.component';
import { LabRegisterComponent } from './component/lab-register/lab-register.component';
import { LabTestComponent } from './component/lab-test/lab-test.component';
import { LoginComponent } from './component/login/login.component';
import { LoginEmailComponent } from './component/login-email/login-email.component';
import { LoginMobileComponent } from './component/login-mobile/login-mobile.component';
import { LogoutComponent } from './component/logout/logout.component';
import { MedicalDetailsComponent } from './component/medical-details/medical-details.component';
import { MedicalRecordsComponent } from './component/medical-records/medical-records.component';
import { MedicineComponent } from './component/medicine/medicine.component';
import { MedicineListComponent } from './component/medicine-list/medicine-list.component';
import { MedicineOrderComponent } from './component/medicine-order/medicine-order.component';
import { NewConsultationComponent } from './component/new-consultation/new-consultation.component';
import { OrdersListComponent } from './component/orders-list/orders-list.component';
import { OtpComponent } from './component/otp/otp.component';
import { PatientDashboardComponent } from './component/patient-dashboard/patient-dashboard.component';
import { PatientProfileComponent } from './component/patient-profile/patient-profile.component';
import { PatientRegistrationComponent } from './component/patient-registration/patient-registration.component';
import { PaymentComponent } from './component/payment/payment.component';
import { PrivacyPolicyComponent } from './component/privacy-policy/privacy-policy.component';
import { ProductCheckoutComponent } from './component/product-checkout/product-checkout.component';
import { ProductDescriptionComponent } from './component/product-description/product-description.component';
import { ProfileSettingsComponent } from './component/profile-settings/profile-settings.component';
import { ReportsComponent } from './component/reports/reports.component';
import { SearchAmbulanceComponent } from './component/search-ambulance/search-ambulance.component';
import { SearchDoctorsComponent } from './component/search-doctors/search-doctors.component';
import { StaffDashboardComponent } from './component/staff-dashboard/staff-dashboard.component';
import { StaffRegistrationComponent } from './component/staff-registration/staff-registration.component';
import { TermsConditionsComponent } from './component/terms-conditions/terms-conditions.component';
import { TestBookingSuccessComponent } from './component/test-booking-success/test-booking-success.component';
import { TestCheckoutComponent } from './component/test-checkout/test-checkout.component';
import { UserFormComponent } from './component/user-form/user-form.component';
import { UsersComponent } from './component/users/users.component';
import { VideoCallComponent } from './component/video-call/video-call.component';
import { VoiceCallComponent } from './component/voice-call/voice-call.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './module/material/material.module';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { HttpClientModule } from '@angular/common/http';
import { BookingComponent } from './component/booking/booking.component';
import { ChatComponent } from './component/chat/chat.component';
import { CheckoutComponent } from './component/checkout/checkout.component';
import { BookingSuccessComponent } from './component/booking-success/booking-success.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { SignupComponent } from './component/signup/signup.component';
import { DoctorSignupComponent } from './component/doctor-signup/doctor-signup.component';
import { PatientSignupComponent } from './component/patient-signup/patient-signup.component';
import { PaymentSuccessComponent } from './component/payment-success/payment-success.component';
import { TestDescriptionComponent } from './component/test-description/test-description.component';
import { RegisterComponent } from './component/register/register.component';
import { LoginSocialComponent } from './component/login-social/login-social.component';
import { RegisterSocialComponent } from './component/register-social/register-social.component';
import { Booking2Component } from './component/booking2/booking2.component';
import { PatientDetailsComponent } from './component/patient-details/patient-details.component';
import { ConsultComponent } from './component/consult/consult.component';
import { DoctorProfileSettingsComponent } from './component/doctor-profile-settings/doctor-profile-settings.component';
import { DoctorChangePasswordComponent } from './component/doctor-change-password/doctor-change-password.component';
import { ChatDoctorComponent } from './component/chat-doctor/chat-doctor.component';
import { InvoicesComponent } from './component/invoices/invoices.component';
import { AvailableTimingsComponent } from './component/available-timings/available-timings.component';
import { ScheduleTimingsComponent } from './component/schedule-timings/schedule-timings.component';
import { MyPatientsComponent } from './component/my-patients/my-patients.component';
import { AppointmentsComponent } from './component/appointments/appointments.component';
import { AddPrescriptionComponent } from './component/add-prescription/add-prescription.component';
import { DoctorProfileComponent } from './component/doctor-profile/doctor-profile.component';
import { AddBillingComponent } from './component/add-billing/add-billing.component';
import { LabOragnSpecificTestComponent } from './component/lab-oragn-specific-test/lab-oragn-specific-test.component';
import { LabLoginComponent } from './component/lab-login/lab-login.component';
import { DriverDashboardComponent } from './component/driver-dashboard/driver-dashboard.component';
import { AddAmbulanceComponent } from './component/add-ambulance/add-ambulance.component';
import { ViewAmbulancesComponent } from './component/view-ambulances/view-ambulances.component';
import { AmbulanceRegisterComponent } from './component/ambulance-register/ambulance-register.component';
import { AmbulanceLoginComponent } from './component/ambulance-login/ambulance-login.component';
import { StaffingServicesComponent } from './component/staffing-services/staffing-services.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AccountsComponent,
    AmbBookingSuccessComponent,
    AmbCheckoutComponent,
    AmbulanceBookingComponent,
    AppointmentComponent,
    BookAmbulanceComponent,
    BookingConsultationComponent,
    CartComponent,
    ChangePasswordComponent,
    ConsultantsPanelComponent,
    ConsultationComponent,
    ConsultationCheckoutComponent,
    DependentComponent,
    DoctorDashboardComponent,
    DoctorRegistrationComponent,
    FindDoctorsComponent,
    FindSurgeonsComponent,
    HealthIdCreationComponent,
    HealthIdMobileComponent,
    InvoiceViewComponent,
    LabCheckoutComponent,
    LabRegisterComponent,
    LabTestComponent,
    LoginComponent,
    LoginEmailComponent,
    LoginMobileComponent,
    LogoutComponent,
    MedicalDetailsComponent,
    MedicalRecordsComponent,
    MedicineComponent,
    MedicineListComponent,
    MedicineOrderComponent,
    NewConsultationComponent,
    OrdersListComponent,
    OtpComponent,
    PatientDashboardComponent,
    PatientProfileComponent,
    PatientRegistrationComponent,
    PaymentComponent,
    PrivacyPolicyComponent,
    ProductCheckoutComponent,
    ProductDescriptionComponent,
    ProfileSettingsComponent,
    ReportsComponent,
    SearchAmbulanceComponent,
    SearchDoctorsComponent,
    StaffDashboardComponent,
    StaffRegistrationComponent,
    TermsConditionsComponent,
    TestBookingSuccessComponent,
    TestCheckoutComponent,
    UserFormComponent,
    UsersComponent,
    VideoCallComponent,
    VoiceCallComponent,
    BookingComponent,
    ChatComponent,
    CheckoutComponent,
    BookingSuccessComponent,
    ForgotPasswordComponent,
    SignupComponent,
    DoctorSignupComponent,
    PatientSignupComponent,
    PaymentSuccessComponent,
    TestDescriptionComponent,
    RegisterComponent,
    LoginSocialComponent,
    RegisterSocialComponent,
    Booking2Component,
    PatientDetailsComponent,
    ConsultComponent,
    DoctorProfileSettingsComponent,
    DoctorChangePasswordComponent,
    ChatDoctorComponent,
    InvoicesComponent,
    AvailableTimingsComponent,
    ScheduleTimingsComponent,
    MyPatientsComponent,
    AppointmentsComponent,
    AddPrescriptionComponent,
    DoctorProfileComponent,
    AddBillingComponent,
    LabOragnSpecificTestComponent,
    LabLoginComponent,
    DriverDashboardComponent,
    AddAmbulanceComponent,
    ViewAmbulancesComponent,
    AmbulanceRegisterComponent,
    AmbulanceLoginComponent,
    StaffingServicesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
    constructor(library: FaIconLibrary) {
      library.addIconPacks(fas, far, fab);
    }
}
