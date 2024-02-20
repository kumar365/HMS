
export class AppConstants {
    public static USER_KEY = 'auth-user';
    public static TOKEN_KEY = 'auth-token';
    public static API_BASE_URL = 'http://localhost:9000/';
    private static OAUTH2_URL = AppConstants.API_BASE_URL + "oauth2/authorization/";
    private static REDIRECT_URL = "?redirect_uri=http://localhost:9000/login";
    public static GOOGLE_AUTH_URL = AppConstants.OAUTH2_URL + "google" + AppConstants.REDIRECT_URL;
    public static FACEBOOK_AUTH_URL = AppConstants.OAUTH2_URL + "facebook" + AppConstants.REDIRECT_URL;
    public static GITHUB_AUTH_URL = AppConstants.OAUTH2_URL + "github" + AppConstants.REDIRECT_URL;
    public static LINKEDIN_AUTH_URL = AppConstants.OAUTH2_URL + "linkedin" + AppConstants.REDIRECT_URL;
    public static API_URL = AppConstants.API_BASE_URL + "api/";
    public static COMMON_URL = AppConstants.API_BASE_URL + "common/";
    public static AUTH_API = AppConstants.API_URL + "auth/";
    public static SIGNIN = AppConstants.AUTH_API + 'signin';
    public static SIGNUP = AppConstants.AUTH_API + 'signup';
    public static SIGNUP_PATIENT = AppConstants.AUTH_API + 'signupPatient';
    public static SIGNUP_DOCTOR = AppConstants.AUTH_API + 'signupDoctor';
    public static SIGNOUT = AppConstants.AUTH_API + 'signout';
    public static SEND_PHONE_NUMBER_VERIFICATION_CODE = AppConstants.AUTH_API + 'sendPhoneNumberVerificationCode';
    public static SEND_EMAIL_VERIFICATION_CODE = AppConstants.AUTH_API + 'sendEmailVerificationCode';
    public static CHANGE_PASSWORD = AppConstants.API_URL + 'changePassword';
    public static GET_USER_BY_ID = AppConstants.API_URL + 'getUserById/';
    public static GET_COUNTRIES = AppConstants.COMMON_URL + 'countries';
    public static GET_STATES = AppConstants.COMMON_URL + 'states/';
    public static GET_DISTRICTS = AppConstants.COMMON_URL + 'districts/';
    public static UPDATE_PROFILE = AppConstants.API_URL + 'updateProfile';
    public static ADD_DEPENDENT = AppConstants.API_URL + 'addDependent';
    public static GET_DEPENDENTS_LIST = AppConstants.API_URL + 'dependents/';
    public static ADD_MEDICAL_DETAILS = AppConstants.API_URL + 'addMedicalDetails';
    public static GET_MEDICAL_DETAILS_LIST = AppConstants.API_URL + 'medicalDetails/';
    public static DELETE_MEDICAL_DETAILS = AppConstants.API_URL + 'deleteMedicalDetails/';
    public static ADD_MEDICAL_RECORDS = AppConstants.API_URL + 'addMedicalRecords';
    public static GET_MEDICAL_RECORDS_LIST = AppConstants.API_URL + 'medicalRecords/';
    public static DELETE_MEDICAL_RECORDS = AppConstants.API_URL + 'deleteMedicalRecords/';
    public static AMBULANCE_URL = AppConstants.API_BASE_URL + "ambulance/";
    public static ADD_AMBULANCE = AppConstants.AMBULANCE_URL + 'addAmbulance';
    public static GET_AMBULANCE_LIST = AppConstants.AMBULANCE_URL + 'ambulances/';
    public static PRESCRIPTION_URL = AppConstants.API_BASE_URL + "prescription/";
    public static ADD_APPOINTMENT = AppConstants.PRESCRIPTION_URL + 'addAppointment';
    public static GET_APPOINTMENT_LIST = AppConstants.PRESCRIPTION_URL + 'appointments/';
    public static ADD_PRESCRIPTION = AppConstants.PRESCRIPTION_URL + 'addPrescription';
    public static GET_PRESCRIPTION_LIST = AppConstants.PRESCRIPTION_URL + 'prescriptions/';
    public static PAYMENT_URL = AppConstants.API_BASE_URL + "payment/";
    public static ADD_BILL = AppConstants.PAYMENT_URL + 'addBill';
    public static GET_BILL_LIST = AppConstants.PAYMENT_URL + 'bills/';
    public static ADD_INVOICE = AppConstants.PAYMENT_URL + 'addInvoice';
    public static GET_INVOICE_LIST = AppConstants.PAYMENT_URL + 'invoices/';


    public static Users = AppConstants.API_URL + 'users';
    public static CheckUser = 'checkUser';
    public static AddMedicine = 'addMedicine';
    public static GetMedicineById = 'getMedicineById';
    public static DeleteMedicineById = 'deleteMedicineById/';

    public static ItemPerPage: number = 50;
    public static PageSize: number[] = [10, 50, 100, 200, 500];
    public static AllowFiltering: boolean = true;
    public static IsUserLoggedIn: boolean = false;
}
