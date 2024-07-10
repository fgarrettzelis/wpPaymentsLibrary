import { FormGroup,
         ValidatorFn,
         ValidationErrors,
         AbstractControl } from '@angular/forms';
import { CreditCardTypeValidation } from './creditcard-type-validation';
import { CreditCardValidators } from 'angular-cc-library';

// wrapper for 3rd party library
export function cardNumberValid(control: AbstractControl): ValidationErrors | null {
    const validation = CreditCardValidators.validateCCNumber(control);
    return validation;
}

export function cardTypeValid(acceptedCreditCards: Array<string>): ValidatorFn  {
    return (control: AbstractControl): {[key: string]: boolean} | null => {
        if (!control.value) {
            return { cardTypeInvalid: true };
        }

        if (!CreditCardTypeValidation.isCardAccepted(control.value, acceptedCreditCards)) {
            return { cardTypeInvalid: true };
        }

        return null;
    };
}
