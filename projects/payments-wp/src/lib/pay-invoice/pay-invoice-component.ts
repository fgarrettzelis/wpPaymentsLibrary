import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, ValidatorFn, Validators} from '@angular/forms';
import {ValidationPatterns} from '../models/validation-patterns';
// import {NgbDateParserFormatter, NgbModal} from '@ng-bootstrap/ng-bootstrap';
// import {cardNumberValid, cardTypeValid} from '../validator/creditcard.validator';
import {PaymentMethodBaseComponent} from '../payment-method-base.component';
import {PaymentResponse} from '../models/payment.model';
import {  CardPaymentMethod, InvoicePaymentsResponse, PaymentMethod, GooglePaymentResponse, ApplePaymentResponse, WPFields, WPEprotectRequest} from "../payment-cc/payment.model";
import {PaymentStatusResponse} from '../models/review.model';
import {KeyValue} from '../models/common';
import {formatDate} from '@angular/common';
import { PaymentService } from '../service/payment.service';

const stateValidator: any = (control: UntypedFormControl) => {
  if (control.value.id =='') {
    return {
      'stateError': { value: 'State is required' }
    };
  }
  return null;
};

declare var eProtect: any;
// declare var newrelic: any;

@Component({
  selector: 'app-pay-invoice',
  templateUrl: './pay-invoice-component.html',
  styleUrls: ['./pay-invoice-component.scss']
})

export class PayInvoiceComponent extends PaymentMethodBaseComponent implements OnInit, AfterViewInit {
  @Input() payPageID: string;
  @Input() wpUrl: string;
  @Input() cardTypes: string[] = ["AmericanExpress", "Visa", "MasterCard", "Discover"];
  @Output() wpResult: EventEmitter<any> = new EventEmitter();
  @Output() nextView = new EventEmitter<InvoicePaymentsResponse>();

  // Form Controls
  public paymentForm: UntypedFormGroup;
  public name: UntypedFormControl;
  public address1: UntypedFormControl;
  public address2: UntypedFormControl;
  public billingCity: UntypedFormControl;
  public billingState: UntypedFormControl;
  public billingZipCode: UntypedFormControl;
  public phone: UntypedFormControl;
  public email: UntypedFormControl;
  public recaptcha: UntypedFormControl;
  public acceptTermsAndConditions: UntypedFormControl;
  // Credit Card
  public cardNumber: UntypedFormControl;
  public expirationYear: UntypedFormControl;
  public expirationMonth: UntypedFormControl;
  public cvvCode: UntypedFormControl;
  // ACH
  public accountNumber: UntypedFormControl;
  public routingNumber: UntypedFormControl;
  public accountType: UntypedFormControl;
  // StoredPayment
  public storedPayment: UntypedFormControl;
  
  public displayPhone: boolean = false;
  // public paymentFeature: PaymentFeature;
  public paymentAmount: Number;
  public paymentDate: string;
  public selectedPaymentMethodType: string = this.PAYMENTMETHOD_CC;
  public selectedStoredMethodType: string;
  public nameOnLabel = '';
  public zipTooltip = '';
  storedPaymentError = '';
  phoneError = '';
  emailError = '';
  captchCheck: boolean = false;
  siteKey: string;
  lang: string = "en";
  logoBaseUrl: string;
  captchaError: string = "";
  public isSubmitDisabled = false;
  public isResetDisabled = true;
  public showSuccess = false;
  public spinnerMessage = '';
  public spinnerOverlay: boolean = false;
  public transactionId: number;
  public paymentProcessingError: boolean = false;
  public type: string;
  summary: Array<KeyValue> = [];
  useStoredPayment = false;
  useGooglePay = false;
  useApplePay = false;
  isApple: boolean = false;
  maskNumber = '************';
  public paymentResponse: PaymentResponse = null;
  public paymentStatusResponse: PaymentStatusResponse;
  public selectPaymentMethod: PaymentMethod;
  public saveTitle: string;
  public saveTitleMethod: boolean = false;
  public savePaymentMethod: boolean = false;
  saveTerms = false;
  public termsTooltip = '';

  public hasAccessStoredPayments: boolean = true;

  googlePaymentResponse: GooglePaymentResponse;
  applePaymentResponse: ApplePaymentResponse;
  eprotectAccountNum: any;
  eprotectCVV: any;
  eprotectEXPDate: any;
  eprotectFields: WPFields = new WPFields;
  eprotectRequest: WPEprotectRequest = new WPEprotectRequest;
  tempForm4Worldpay: any;
  wp2ndTryFlag: number = 0;

  // @ViewChild('captchaElem', { static: false }) captchaElem: ReCaptcha2Component;
   
  constructor(             
              private formBuilder: UntypedFormBuilder,
              private paymentService: PaymentService,             
              private cdr: ChangeDetectorRef
              ) {
    super(paymentService);

  }

  setEProtect(): void {
    const exists = document.getElementById('wpAPI') as HTMLInputElement;
    if(exists === null) {
      let script = document.createElement('script');      
      script.src = "https://request.eprotect.vantivprelive.com/eProtect/eProtect-api3.js";      
      script.id = "wpAPI";
      window.document.body.appendChild(script);
    }  
  }

  ngOnInit(): void {    
    const now = new Date();    
    this.paymentDate = formatDate(now, 'MM/dd/yyyy', 'en-US');    
    this.orgAcceptedPaymentTypes.push("Card");    
    this.orgAcceptedCreditCards = this.cardTypes;
    this.termsTooltip = 'Please read and print the Terms and Conditions.';    
    this.initializeForm();

  }

  ngAfterViewInit() {
    
  }

  initializeForm() {
    this.setUpBaseForm();
    this.setupBillingForm();
    if (this.orgAcceptedPaymentTypes) {
      this.setPaymentMethodTypes();      
      if(this.useStoredPayment){
        this.selectedPaymentMethodType = null;
      } else {
        this.selectedPaymentMethodType = this.isCardEnabled ? this.PAYMENTMETHOD_CC : this.PAYMENTMETHOD_ACH;
      }
      this.setEProtect();
      this.setUpPaymentMethod(this.selectedPaymentMethodType);
    } else {
      this.isSubmitDisabled = true;
      console.log('No Payment Options available for your organization');
    }    
  }

  private setupBillingForm(): void {
    this.name = new UntypedFormControl('', Validators.compose([Validators.required, Validators.pattern(ValidationPatterns.names), Validators.maxLength(200)]));
    // this.address1 = new UntypedFormControl('', Validators.compose([Validators.required, Validators.pattern(ValidationPatterns.address), Validators.maxLength(35)]));
    // this.address2 = new UntypedFormControl('', Validators.compose([Validators.pattern(ValidationPatterns.address), Validators.maxLength(35)]));
    // this.billingCity = new UntypedFormControl('', Validators.compose([Validators.required, Validators.pattern(ValidationPatterns.city), Validators.maxLength(25)]));
    // this.billingState = new UntypedFormControl({ id: '', text: 'State'}, Validators.compose([Validators.required, stateValidator]));
    // this.billingZipCode = new UntypedFormControl('', Validators.compose([Validators.required, Validators.pattern(ValidationPatterns.code), Validators.maxLength(5), Validators.minLength(5)]));

    this.paymentForm.addControl('name', this.name);
    // this.paymentForm.addControl('address1', this.address1);
    // this.paymentForm.addControl('address2', this.address2);
    // this.paymentForm.addControl('billingCity', this.billingCity);
    // this.paymentForm.addControl('billingState', this.billingState);
    // this.paymentForm.addControl('billingZipCode', this.billingZipCode);
  }

  public setUpPaymentMethod(paymentMethodType: string): void {
    if(paymentMethodType == this.PAYMENTMETHOD_ACH){
      //this.setupAchControls();
    }
    else if(paymentMethodType == this.PAYMENTMETHOD_CC){
      this.setupCardControls()
    }
  }

  private setUpBaseForm(): void {    
      this.paymentForm = this.formBuilder.group({
        recaptcha: ['']
      });    
  }

  private setupCardControls(): void {
    this.selectedPaymentMethodType = this.PAYMENTMETHOD_CC;
    this.nameOnLabel = 'name on card';
    this.zipTooltip = 'obp.zip-tooltip';
    this.saveTitle = 'payment.save-card';
    this.cardNumber = new UntypedFormControl('', Validators.compose([Validators.required, Validators.maxLength(19)]));
    this.cvvCode = new UntypedFormControl('', Validators.compose([Validators.required, Validators.maxLength(4), Validators.minLength(3), Validators.pattern(ValidationPatterns.code)]));
    this.expirationYear = new UntypedFormControl(('Year'), Validators.compose([Validators.required, Validators.pattern(ValidationPatterns.code)]));
    this.expirationMonth = new UntypedFormControl(('Month'), Validators.compose([Validators.required, Validators.pattern(ValidationPatterns.code)]));

    this.paymentForm.addControl('cardNumber', this.cardNumber);
    this.paymentForm.addControl('cvvCode', this.cvvCode);
    this.paymentForm.addControl('expirationMonth', this.expirationMonth);
    this.paymentForm.addControl('expirationYear', this.expirationYear);
  }

  
  getPhone(event: any) {
    this.paymentForm.controls['phone'].setValue(event);
    this.phoneError = '';
    if (this.paymentForm.get('phone').status === 'INVALID') {
      this.phoneError = 'patients.phone-invalid';
    } else {
      this.phoneError = '';
    }
  }

  getEmail(event: any) {
    this.paymentForm.controls['email'].setValue(event);
    this.emailError = '';
    if (event === '') {
      this.emailError = 'users.email-address-required';
    } else if (this.paymentForm.get('email').status === 'INVALID') {
      this.emailError = 'users.email-address-invalid';
    } else {
      this.emailError = '';
    }

  }

    submitPaymentWP(formValues: any) {
    this.tempForm4Worldpay = formValues;        
          this.setExpDateWP(formValues.expirationMonth, formValues.expirationYear);     
          if(this.wp2ndTryFlag <= 2) {
            let ep = new eProtect();
            this.eprotectFields.accountNum = this.eprotectAccountNum;
            this.eprotectFields.cvv = this.eprotectCVV;
            this.eprotectFields.expDate = this.eprotectEXPDate;
            const date = new Date();
            this.eprotectRequest.paypageId = this.payPageID;
            this.eprotectRequest.reportGroup = "Domestic Business";
            this.eprotectRequest.orderId = date.getTime().toString();//this.payInvoices.invoices[0].invoiceId;
                        
            this.eprotectRequest.id = date.getTime().toString();
            this.eprotectRequest.url = this.wpUrl;
            
            this.wp2ndTryFlag++;
            ep.sendToEprotect(this.eprotectRequest, this.eprotectFields, this.submitAfterEprotect, this.onErrorAfterEprotect, this.timeoutOnEprotect, 15000);
          } else {
            ///////message to user TODO  
          }

        
  }

  getBackCardNumControl(event: any) {
    this.eprotectAccountNum = event;
  }

  getBackCVVControl(event: any) {
    this.eprotectCVV = event;
  }

  setExpDateWP(month: string, year: string) {
    let wpEXPDate = document.getElementById('eprotectxpdate') as HTMLInputElement;
    wpEXPDate.value = month + year.substring(2);
    this.eprotectEXPDate = wpEXPDate;  
  }

  submitAfterEprotect = (args: any): void => {    
    this.wpResult.emit(args);
    console.log("EP details", args);
  }

  onErrorAfterEprotect = (args: any): void => {
    this.wpResult.emit(args);
    console.log("EP error", args);
    if(args.response === "875" || args.response === "889") {
      if(this.wp2ndTryFlag <= 2) {
        this.submitPaymentWP(this.tempForm4Worldpay);
      } else {
        ////////////////meesage to user
      }
    } else {
      if(args.response === "876" || args.response === "871") {        
        console.log("Invalid card number. Check and retry.");
      } else {
        console.log("Payment failed try again");
      }      
    } 
  }

  timeoutOnEprotect = (args: any): void => {    
    console.log("Payment timed out try again");
  }

}
