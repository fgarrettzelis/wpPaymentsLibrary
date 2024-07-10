import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PayInvoices } from './payment-cc/payment.model';

@Component({
  selector: 'lib-payments-wp',
  templateUrl: './payments-wp.component.html',
  styles: [
  ]
})
export class PaymentsWpComponent implements OnInit{
  @Input() payPageID: string;
  @Input() wpUrl: string;
  @Output() wpRes: EventEmitter<any> = new EventEmitter();

  payInvoices = new PayInvoices;

  ngOnInit(): void {

  }

  wpResult(event: any) {
    this.wpRes.emit(event);
  }
}
