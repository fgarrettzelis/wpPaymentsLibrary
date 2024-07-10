import { UntypedFormGroup } from '@angular/forms';
import { CreditCardTypeValidation } from '../lib/validator/creditcard-type-validation';
import { PaymentMethodTypes,
         CreditCardTypes,
         AchTypes } from '../lib/models/payment-static.model';
// import { PaymentService } from '../lib/service/payment.service';
// import { CustomErrorHandlerService } from '@shared/handlers/error/custom-error-handler.service';
import { DropDownItems } from '../lib/dropdown-items.interface';
import {OrgPreferences} from "../lib/models/org.model";
import { PaymentService } from './service/payment.service';
// import {JSEncrypt} from '../../../../node_modules/jsencrypt'; ////////////////////////////////////

// const JsEncrypt = require('jsencrypt');

export class PaymentMethodBaseComponent {
    public PAYMENTMETHOD_CC = PaymentMethodTypes.Card;
    public PAYMENTMETHOD_ACH = PaymentMethodTypes.Ach;
    public PAYMENTMETHOD_CASH = PaymentMethodTypes.Cash;
    public PAYMENTMETHOD_CHECK = PaymentMethodTypes.Check;
    public PAYMENTMETHOD_SWIPECARD = PaymentMethodTypes.SwipeCard;
    public PAYMENTMETHOD_OTHER = PaymentMethodTypes.Other;
    public PAYMENTMETHOD_GPAY = PaymentMethodTypes.GPay;
    public PAYMENTMETHOD_APPLEPAY = PaymentMethodTypes.APPLEPay;

    public CCTYPE_VISA = CreditCardTypes.Visa;
    public CCTYPE_MCARD = CreditCardTypes.MasterCard;
    public CCTYPE_DISC = CreditCardTypes.Discover;
    public CCTYPE_AMEX = CreditCardTypes.AmericanExpress;

    public ACH_CHECK = AchTypes.Checking;
    public ACH_SAVINGS = AchTypes.Savings;

    public isStoredPaymentsEnabled: boolean = false;
    public isCardEnabled: boolean = false;
    public isAchEnabled: boolean = false;
    public isCashEnabled: boolean = false;
    public isCheckEnabled: boolean = false;
    public isSwipeCarEnabled: boolean = false;
    public isOtherEnabled: boolean = false;
    public isGooglePayEnabled: boolean = false;
    public isApplePayEnabled: boolean = false;

    public states: DropDownItems[] = [
                                {id: 'AL', text: 'Alabama'},
                                {id: 'AK', text: 'Alaska'},
                                {id: 'AS', text: 'American Samoa'},
                                {id: 'AZ', text: 'Arizona'},
                                {id: 'AR', text: 'Arkansas'},
                                {id: 'CA', text: 'California'},
                                {id: 'CO', text: 'Colorado'},
                                {id: 'CT', text: 'Connecticut'},
                                {id: 'DE', text: 'Delaware'},
                                {id: 'DC', text: 'District of Columbia'},
                                {id: 'FL', text: 'Florida'},
                                {id: 'GA', text: 'Georgia'},
                                {id: 'GU', text: 'Guam'},
                                {id: 'HI', text: 'Hawaii'},
                                {id: 'ID', text: 'Idaho'},
                                {id: 'IL', text: 'Illinois'},
                                {id: 'IN', text: 'Indiana'},
                                {id: 'IA', text: 'Iowa'},
                                {id: 'KS', text: 'Kansas'},
                                {id: 'KY', text: 'Kentucky'},
                                {id: 'LA', text: 'Louisiana'},
                                {id: 'ME', text: 'Maine'},
                                {id: 'MD', text: 'Maryland'},
                                {id: 'MA', text: 'Massachusetts'},
                                {id: 'MI', text: 'Michigan'},
                                {id: 'MN', text: 'Minnesota'},
                                {id: 'MS', text: 'Mississippi'},
                                {id: 'MO', text: 'Missouri'},
                                {id: 'MT', text: 'Montana'},
                                {id: 'NE', text: 'Nebraska'},
                                {id: 'NV', text: 'Nevada'},
                                {id: 'NH', text: 'New Hampshire'},
                                {id: 'NJ', text: 'New Jersey'},
                                {id: 'NM', text: 'New Mexico'},
                                {id: 'NY', text: 'New York'},
                                {id: 'NC', text: 'North Carolina'},
                                {id: 'ND', text: 'North Dakota'},
                                {id: 'MP', text: 'Northern Mariana Islands'},
                                {id: 'OH', text: 'Ohio'},
                                {id: 'OK', text: 'Oklahoma'},
                                {id: 'OR', text: 'Oregon'},
                                {id: 'PA', text: 'Pennsylvania'},
                                {id: 'PR', text: 'Puerto Rico'},
                                {id: 'RI', text: 'Rhode Island'},
                                {id: 'SC', text: 'South Carolina'},
                                {id: 'SD', text: 'South Dakota'},
                                {id: 'TN', text: 'Tennessee'},
                                {id: 'TX', text: 'Texas'},
                                {id: 'UT', text: 'Utah'},
                                {id: 'VI', text: 'U.S. Virgin Islands'},
                                {id: 'VT', text: 'Vermont'},
                                {id: 'VA', text: 'Virginia'},
                                {id: 'WA', text: 'Washington'},
                                {id: 'WV', text: 'West Virginia'},
                                {id: 'WI', text: 'Wisconsin'},
                                {id: 'WY', text: 'Wyoming'}
                            ];

    public msaPublicKey: string = "";

    public orgAcceptedPaymentTypes: Array<string> = new Array<string>();
    public orgAcceptedCreditCards: Array<string> = new Array<string>();

    constructor(
        private basePaymentService: PaymentService
                ) {
    }

    public isControlValid(controlName: string, form: UntypedFormGroup): boolean {
        if (form) {
            const formControl = form.get(controlName);
            return (formControl != null && formControl.touched) ? formControl.valid : true;
        } else {
            return true;
        }
    }

    public keyPress(event: any) {
        const pattern = /[0-9 /]/;
        const inputChar = String.fromCharCode(event.charCode);
        const theEvent = event || window.event;
        const key = theEvent.keyCode || theEvent.which;
        if ((key >= 48 && key <= 57) || key === 8 || key === 9 || key === 46 || pattern.test(inputChar)) {
            return true;
        } else {
            event.preventDefault();
        }
    }

    public setOrgAcceptedPaymentMethodTypes(orgPreferences:OrgPreferences): void {
        this.orgAcceptedPaymentTypes = orgPreferences.acceptedPaymentTypes;
        this.orgAcceptedCreditCards = orgPreferences.acceptedCreditCards;
    }

    public isCardTypeAccepted(ccType: string): boolean {
        return CreditCardTypeValidation.isCardTypeAccepted(ccType, this.orgAcceptedCreditCards);
    }

    public isPasteNumericInput(event: ClipboardEvent) {
        const clipboardData = event.clipboardData;
        const pastedText = clipboardData!.getData('text');

        const matches = /[\D]*/.exec(pastedText);

        if (matches != null && matches[0] !== '') {
            event.cancelBubble = true;
            event.returnValue = false;
        }
    }

    // public isBankRouteNumberValid(routeNumber: any, form: UntypedFormGroup): void {
    //     this.basePaymentService.getRoutingNumberValidation(routeNumber.srcElement.value).subscribe({
    //             next: (data) => {
    //                     const bname = data.BankName;
    //                     if (bname.includes('invalid')) {
    //                         form.get('routingNumber')!.setErrors({routeNumberInvalid: true});
    //                     }
    //             },
    //             error: (e) => {
    //                 form.get('routingNumber')!.setErrors({routeNumberInvalid: true});
    //             },
    //             complete: () => {
    //                 console.info('complete') 
    //             }

                                        
    //     });
    // }

    // public setMSAPublicKey() {
    //     this.basePaymentService.getMsaPublicKey().subscribe({
    //         next: (msakey) => {
    //             this.msaPublicKey = msakey.Key.toString();
    //            },
    //            error: (e) => {
    //                console.log("Error");
    //            },
    //            complete: () => {
    //                console.info('complete') 
    //            }
    //     });
    // }

    // public encryptAccountNumber(accountNumber: string) {
    //     try {
    //         //const jencrypt = new JsEncrypt.JSEncrypt();
    //         //jencrypt.setPublicKey(this.msaPublicKey);
    //         //const encryptedAccount: string = jencrypt.encrypt(accountNumber);
    //         //return encryptedAccount;
    //         return accountNumber;
    //     } catch (error) {
    //         console.log("Error", error);            
    //     }
    // }

    public setPaymentMethodTypes() {
        this.isCashEnabled = this.isPaymentMethodTypeAccepted(this.PAYMENTMETHOD_CASH);
        this.isAchEnabled = this.isPaymentMethodTypeAccepted(this.PAYMENTMETHOD_ACH);
        this.isCheckEnabled = this.isPaymentMethodTypeAccepted(this.PAYMENTMETHOD_CHECK);
        this.isCardEnabled = this.isPaymentMethodTypeAccepted(this.PAYMENTMETHOD_CC);
        this.isSwipeCarEnabled = this.isPaymentMethodTypeAccepted(this.PAYMENTMETHOD_SWIPECARD);
        this.isGooglePayEnabled = this.isPaymentMethodTypeAccepted(this.PAYMENTMETHOD_GPAY);
        this.isApplePayEnabled = this.isPaymentMethodTypeAccepted(this.PAYMENTMETHOD_APPLEPAY);        
        this.isOtherEnabled = this.isCheckEnabled || this.isCashEnabled;
    }

    public isPaymentMethodTypeAccepted(paymentMethodType: string): boolean {
        if (this.orgAcceptedPaymentTypes) {
            const accPaymentMethod = this.orgAcceptedPaymentTypes.find(p => p === paymentMethodType);
            return accPaymentMethod === paymentMethodType;
        } else {
            return false;
        }
    }

    public handlePaymentErrorResponse(error: any): string {
        let errorDetails = '';
        const errorMessage = error.tostring();
        if (errorMessage) {
            if (errorMessage.code === 'failed_validation') {
                errorMessage.errors.forEach((e: any) => {
                    e.value.forEach((m: any) => { errorDetails += m.concat('\r\n'); });
                });
            } else  {
                errorDetails = errorMessage.errors[0].value[0];
            }
        }
        return errorDetails;
    }
}
