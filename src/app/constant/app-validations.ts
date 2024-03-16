export class AppValidations {
    static validateName(name: string): boolean {
        var nameRegex = /^[A-Za-z ]{3,16}$/;
        if (nameRegex.test(name)) {
            return true;
        } else {
            alert("Your name is not valid. Only characters A-Z and a-z are acceptable of length 3 to 16.");
            return false;
        }
    }
    static validateMail(email: string): boolean {
        var mailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        if (mailRegex.test(email)) {
            return true;
        } else {
            alert("Your mail is not valid.");
            return false;
        }
    }
    static validatePhoneNumber(phoneNumber: string): boolean {
        var phoneNumberRegex = /^[6-9]{1}[0-9]{9}$/;
        if (phoneNumberRegex.test(phoneNumber)) {
            return true;
        } else {
            alert("Your Phone Numaber is not valid.");
            return false;
        }
    }
    static validatePassword(password: string): boolean {
        const isNonWhiteSpace = /^\S*$/;
        if (!isNonWhiteSpace.test(password)) {
            alert("Password must not contain Whitespaces.");
            return false;
        }
        const isContainsUppercase = /^(?=.*[A-Z]).*$/;
        if (!isContainsUppercase.test(password)) {
            alert("Password must have at least one Uppercase Character.");
            return false;
        }
        const isContainsLowercase = /^(?=.*[a-z]).*$/;
        if (!isContainsLowercase.test(password)) {
            alert("Password must have at least one Lowercase Character.");
            return false;
        }
        const isContainsNumber = /^(?=.*[0-9]).*$/;
        if (!isContainsNumber.test(password)) {
            alert("Password must contain at least one Digit.");
            return false;
        }
        const isContainsSymbol =
            /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/;
        if (!isContainsSymbol.test(password)) {
            alert("Password must contain at least one Special Symbol.");
            return false;
        }
        const isValidLength = /^.{10,16}$/;
        if (!isValidLength.test(password)) {
            alert("Password must be 10-16 Characters Long.");
            return false;
        }
        return true;
    }
    static validateExpiryMonth(exMonth: string): boolean {
        if (+exMonth > 12) {
            alert("Month value is not valid.");
            return false;
        }
        return true;
    }
    static validateExpiryYear(exYear: string): boolean {
        if (+exYear < 2024) {
            alert("Year value is not valid.");
            return false;
        }
        return true;
    }
    static validateExpiryDate(exMonth: string, exYear: string): boolean {
        var today, someday;
        today = new Date();
        someday = new Date();
        someday.setFullYear(+exYear, +exMonth, 1);
        if (someday < today) {
            alert("The expiry date is before today's date. Please select a valid expiry date");
            return false;
        } else {
            return true;
        }
    }
    static validateCVV(cvv: string): boolean {
        let cvvRegex = new RegExp(/^[0-9]{3,4}$/);
        if (cvv == null) {
            alert("Your CVV is not valid.");
            return false;
        }
        if (cvvRegex.test(cvv) == true) {
            return true;
        } else {
            alert("Your CVV is not valid.");
            return false;
        }
    }

    static validateBMI(bmi: string): boolean {
        var bmiRegex = /^([0-9]+[\.]?[0-9]?[0-9]?|[0-9]+)$/;
        if (bmiRegex.test(bmi)) {
            if (+bmi < 0) {
                alert("BMI should be greater than Zero(>0).");
                return false;
            } else if (+bmi > 99) {
                alert("BMI should not be greater than 99");
                return false;
            } else {
                return true;
            }
        } else {
            alert("BMI value not valid");
            return false;
        }
    }
    static validateHeartRate(heartRate: string): boolean {
        var heartRateRegex = /^\d{1,3}$/;
        if (heartRateRegex.test(heartRate)) {
            if (+heartRate < 0) {
                alert("Heart Rate should be greater than Zero(>0).");
                return false;
            } else if (+heartRate < 60) {
                alert("Heart Rate should be greater than 60");
                return false;
            } else if (+heartRate > 120) {
                alert("Heart Rate should not be greater than 120");
                return false;
            } else {
                return true;
            }
        } else {
            alert("Heart Rate value not valid");
            return false;
        }
    }

    static validateWeight(weight: string) {
        var weightRegex = /^\d{1,3}$/;
        if (weightRegex.test(weight)) {
            if (+weight < 0) {
                alert("Weight should be greater than Zero(>0).");
                return false;
            } else if (+weight > 200) {
                alert("weight should not be greater than 200");
                return false;
            } else {
                return true;
            }
        } else {
            alert("weight value not valid");
            return false;
        }
    }

    static validateFBC(fbc: string) {
        var fbcRegex = /^\d{1,3}\-\d{1,3}$/;
        if (fbcRegex.test(fbc)) {
            return true;
        } else {
            alert("FBC value not valid");
            return false;
        }
    }

    static validateBP(bp: string): boolean {
        var bpRegex = /^\d{1,3}\/\d{1,3}$/;
        if (bpRegex.test(bp)) {
            return true;
        } else {
            alert("BP value not valid");
            return false;
        }
    }
    static validatePrice(price: string): boolean {
        var priceRegex = /^\d+(\.\d{1,2})?$/;
        if (priceRegex.test(price)) {
            if (+price < 0) {
                alert("Price should be greater than Zero(>0).");
                return false;
            } else {
                return true;
            }
        } else {
            alert("Price value not valid");
            return false;
        }
    }
}
