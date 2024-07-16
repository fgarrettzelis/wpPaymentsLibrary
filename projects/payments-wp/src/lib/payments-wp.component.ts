import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { PayInvoices } from './payment-cc/payment.model';
import { PayInvoiceComponent } from '../lib/pay-invoice/pay-invoice-component';

@Component({
  selector: 'lib-payments-wp',
  templateUrl: './payments-wp.component.html',
  styles: [
  ]
})
export class PaymentsWpComponent implements OnInit{
  @Input() payPageID: string;
  @Input() wpUrl: string;
  @Input() cardTypes: string[] = ["AmericanExpress", "Visa", "MasterCard", "Discover"];
  @Output() wpRes: EventEmitter<any> = new EventEmitter();

  @ViewChild(PayInvoiceComponent) child: PayInvoiceComponent;

  payInvoices = new PayInvoices;

  ngOnInit(): void {

  }

  invokeWP() {
    this.child.submitPaymentWP(this.child.paymentForm.value);
  }

  wpResult(event: any) {
    this.wpRes.emit(event);
  }
}
