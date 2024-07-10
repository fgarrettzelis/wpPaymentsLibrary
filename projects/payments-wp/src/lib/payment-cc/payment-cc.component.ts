import { AfterContentChecked, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { PaymentMethodBaseComponent } from '../payment-method-base.component';
// import { TranslateService } from '@ngx-translate/core';
// import { CardPaymentMethod } from '@shared-features/payment-method/models/payment.model';
import { PaymentService } from '../../lib/service/payment.service';
import { CreditCardTypeValidation } from '../../lib/validator/creditcard-type-validation';
import { CardPaymentMethod } from './payment.model';
// import { CustomErrorHandlerService } from '@shared/handlers/error/custom-error-handler.service';


@Component({
  selector: 'app-payment-cc',
  templateUrl: './payment-cc.component.html',
  styleUrls: ['./payment-cc.component.scss']
})
export class PaymentCcComponent extends PaymentMethodBaseComponent implements OnInit, OnChanges {
  @Input() paymentForm: UntypedFormGroup;
  @Input() nameOnLabel: string;
  @Input() override orgAcceptedCreditCards: Array<string>;
  @Output() givebackCardNumControl: EventEmitter<any> = new EventEmitter();
  @Output() givebackCVVControl: EventEmitter<any> = new EventEmitter();

  nameError = '';
  cvvError = '';
  monthError = '';
  yearError = '';
  cardNumberError = '';
  public type: string;
  currentYear: number;
  currentMonth: number;
  public showCVV: boolean = false;

  public name: UntypedFormControl;
  public cardNumber: UntypedFormControl;
  public expirationYear: UntypedFormControl;
  public expirationMonth: UntypedFormControl;
  public cvvCode: UntypedFormControl;
  wpCardError: string = "";

  constructor(
    private paymentService: PaymentService) {
    super(paymentService);
  }

  getBackcardNumControl(event: any) {
    this.givebackCardNumControl.emit(event);
  }

  getBackCVVControl(event: any) {
    this.givebackCVVControl.emit(event);
  }

  ngOnInit(): void {
    const now = new Date();
    this.currentYear = now.getFullYear();
    this.currentMonth = now.getMonth() + 1;
    this.setUp();
    this.paymentService.wpCCError.subscribe(err => {
      this.wpCardError = err;
    })
  }

  setUp(){
    this.name = this.paymentForm.controls['name'] as UntypedFormControl;
    this.cardNumber = this.paymentForm.controls['cardNumber'] as UntypedFormControl;
    this.cvvCode = this.paymentForm.controls['cvvCode'] as UntypedFormControl;
    this.expirationMonth = this.paymentForm.controls['expirationMonth'] as UntypedFormControl;
    this.expirationYear = this.paymentForm.controls['expirationYear'] as UntypedFormControl;
  }

  ngOnChanges(){
    this.setUp();
  }

  getName(event: any) {
    this.paymentForm.controls['name'].setValue(event);
    this.nameError = '';
    if (event === '') {
      this.nameError = 'payment.name-required';
    } else if (this.paymentForm.get('name')!.status === 'INVALID') {
      this.nameError = 'payment.name-invalid';
    } else {
      this.nameError = '';
    }
  }

  getcardNumber(event: any) {
    this.wpCardError = "";
    this.paymentForm.get('cardNumber')!.setValue(event);    
    this.cardNumberError = '';
    if (event === '') {
      this.cardNumberError = 'payment.cardNumber-required';
    } else if (this.paymentForm.get('cardNumber').status === 'INVALID') {
      this.cardNumberError = 'payment.cardNumber-invalid';      
    } else {
      this.validateCardLength(event);  
    }
    if (this.cardNumberError === '') {
      if (this.paymentForm.get('cvvCode')!.value !== null && this.paymentForm.get('cvvCode')!.value.length > 0) {
        this.validateCardCVV();
      }
    }
    
  }

  validateCardCVV() {
    const cardPaymentMethod = this.getCardPaymentMethod(this.paymentForm.value);
    const cvvValidationError = CreditCardTypeValidation.getCvvValidation(cardPaymentMethod.paymentType, cardPaymentMethod.cvv);
    if (cvvValidationError !== '') {
      this.cvvError = cvvValidationError;
      this.paymentForm.get('cvvCode')!.setErrors({ CvvInvalid: true });
    } else {
      this.cvvError = '';
      this.paymentForm.get('cvvCode')!.setErrors(null);
    }
  }

  validateCardLength(creditCardNumer: any) {
    const cardType = CreditCardTypeValidation.getCreditCardType(creditCardNumer);   
    const ccValidationError = CreditCardTypeValidation.getCCLengthError(cardType, creditCardNumer);    
    if (ccValidationError !== '') {
      this.cardNumberError = ccValidationError;
      this.paymentForm.get('cardNumber')!.setErrors({ CCInvalid: true });
    } else {
      this.cardNumberError = '';
      this.paymentForm.get('cardNumber')!.setErrors(null);
    }
  }

  private getCardPaymentMethod(formValues: any): CardPaymentMethod {
    const paymentMethodDetail: CardPaymentMethod = new CardPaymentMethod();
    const cardNumber = formValues.cardNumber.replace(/\s/g, '');

    paymentMethodDetail.expirationMonth = +formValues.expirationMonth;
    paymentMethodDetail.expirationYear = +formValues.expirationYear;
    paymentMethodDetail.cvv = formValues.cvvCode;
    // paymentMethodDetail.encryptedAccountNumber = this.encryptAccountNumber(cardNumber)!;
    paymentMethodDetail.encryptedAccountNumber = cardNumber!;
    paymentMethodDetail.lastFour = cardNumber.substr(-4);
    paymentMethodDetail.paymentType = CreditCardTypeValidation.getCreditCardType(cardNumber);
    this.type = paymentMethodDetail.paymentType;
    return paymentMethodDetail;
  }

  getCVV(event: any) {
    this.paymentForm.get('cvvCode')!.setValue(event);
    this.cvvError = '';
    if (event === '') {
      this.cvvError = 'payment.cvv-required';
    } else if (this.paymentForm.get('cvvCode')!.status === 'INVALID') {
      this.cvvError = 'payment.cvv-invalid';
    } else {
      this.validateCardCVV();
    }
  }

  public changeExpirationYear(event: any) {
    this.expirationYear.setValue(event);
    this.expirationYear.markAsTouched();
    this.paymentForm.controls['expirationYear'].setValue(event);
    if (event === '') {
      this.yearError = 'payment.year-required';
    } else if (+this.expirationYear.value < this.currentYear) {
      this.yearError = 'payment.year-invalid';
      this.paymentForm.controls['expirationYear'].setErrors({ error: this.yearError });
    } else {
      this.yearError = '';
      if (this.expirationMonth.value != null && this.expirationMonth.value != "MM") {
        if (+this.expirationMonth.value < this.currentMonth && +this.expirationYear.value <= this.currentYear) {
          this.monthError = 'payment.month-invalid';
          this.paymentForm.controls['expirationMonth'].setErrors({ error: this.monthError });
        } else {
          this.monthError = '';
          this.paymentForm.controls['expirationMonth'].setErrors(null);
        }
      }
    }
  }

  public changeExpirationMonth(event: any) {
    this.expirationMonth.setValue(event);
    this.expirationMonth.markAsTouched();
    this.paymentForm.controls['expirationMonth'].setValue(event);
    if (event === '') {
      this.monthError = 'payment.month-required';
    } else if (+this.expirationMonth.value < this.currentMonth && +this.expirationYear.value <= this.currentYear) {
      this.monthError = 'payment.month-invalid';
      this.paymentForm.controls['expirationMonth'].setErrors({ error: this.monthError });
    } else {
      this.monthError = '';
    }
  }
  cvv() {
    this.showCVV = true;
  }

  cvvClose() {
    this.showCVV = false;
  }
}
