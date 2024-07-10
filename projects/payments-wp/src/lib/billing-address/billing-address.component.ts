import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { States } from '../models/states.model';
import { ValidationPatterns } from '../models/validation-patterns';
import { DropDownItems } from '../dropdown-items.interface';

@Component({
  selector: 'app-billing-address',
  templateUrl: './billing-address.component.html',
  styleUrls: ['./billing-address.component.scss']
})
export class BillingAddressComponent implements OnInit, OnChanges {
  @Input() paymentForm: UntypedFormGroup;
  @Input() zipTooltip: string;
  public address1: UntypedFormControl;
  public address2: UntypedFormControl;
  public billingCity: UntypedFormControl;
  public billingState: UntypedFormControl;
  public billingZipCode: UntypedFormControl;
  addressError = '';
  cityError = '';
  address2Error = '';
  stateError = '';
  zipError = '';
  originalStates: DropDownItems[];
  states: DropDownItems[] = [];
  stateList = new States;
  constructor() {
    this.states = this.stateList.states;
  }

  ngOnInit(): void {
    this.originalStates = this.states;
    this.setUp();
  }

  ngOnChanges(){
    this.setUp();
  }

  setUp(){
    this.address1 = this.paymentForm.controls['address1'] as UntypedFormControl;
    this.address2 = this.paymentForm.controls['address2'] as UntypedFormControl;
    this.billingCity = this.paymentForm.controls['billingCity'] as UntypedFormControl;
    this.billingState = this.paymentForm.controls['billingState'] as UntypedFormControl;
    this.billingZipCode = this.paymentForm.controls['billingZipCode'] as UntypedFormControl;
  }

  getAddress1(event: any) {
    this.paymentForm.controls['address1'].setValue(event);
    this.addressError = '';
    if (event === '') {
      this.addressError = 'payment.address-required';
    } else if (this.paymentForm.get('address1').status === 'INVALID') {
      this.addressError = 'payment.address-invalid';
    } else {
      this.addressError = '';
    }
  }

  getAddress2(event: any) {
    this.paymentForm.controls['address2'].setValue(event);
    this.address2Error = '';
    if (this.paymentForm.get('address2').status === 'INVALID') {
      this.address2Error = 'payment.address-invalid';
    } else {
      this.address2Error = '';
    }
  }

  getCity(event: any) {
    this.paymentForm.controls['billingCity'].setValue(event);
    this.cityError = '';
    if (event === '') {
      this.cityError = 'payment.city-required';
    } else if (this.paymentForm.get('billingCity').status === 'INVALID') {
      this.cityError = 'payment.city-invalid';
    } else {
      this.cityError = '';
    }
  }

  getZip(event: any) {
    this.paymentForm.controls['billingZipCode'].setValue(event);
    this.zipError = '';
    if (event === '') {
      this.zipError = 'payment.zip-required';
    } else if (this.paymentForm.get('billingZipCode').status === 'INVALID') {
      this.zipError = 'payment.zip-invalid';
    } else {
      this.zipError = '';
    }
  }

  state(event: any) {
    this.paymentForm.controls['billingState'].setValue(event);
    this.stateError = '';
    if (event === '') {
      this.stateError = 'payment.state-required';
    } else if (this.paymentForm.get('billingState').status === 'INVALID') {
      this.stateError = 'payment.state-invalid';
    } else {
      this.stateError = '';
    }
  }

  public filter(event: any) {
    if (event.trim() === '' || event === undefined) {
      this.states = this.originalStates;
    } else {
      this.states = this.originalStates.filter(x => x.text.toUpperCase().indexOf(event.toUpperCase()) > -1);
    }
  }

  public keyPress(event: any) {
    return ValidationPatterns.keyPress(event);
  }
}
