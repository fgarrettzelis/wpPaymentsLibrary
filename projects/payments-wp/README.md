# Angular
This project is created with angular CLI 16

# Info
this is a credit card processing through Worldpay

# Dependencie
add these to youe package.json and install
`"@ng-bootstrap/ng-bootstrap": "15.1.2",`
`"angular-cc-library": "3.2.0",`
`"bootstrap": "^4.4.1"`

# Insinstall
`npm i payments-wp`

# Usage 

once installed, copy the asset folder from the PaymentsWp directory in node_module to your assset directory

```js
///....
import { PaymentsWpModule } from 'payments-wp' //add the import

@NgModule({
//....
  imports: [
  //....
    PaymentsWpModule
  ],

})
export class AppModule { }
```

```js
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

```

in your client
```html
<youe_component>
    <lib-payments-wp
        [payPageID]="payPageID" 
        [wpUrl]="wpUrl" 
        (wpRes)="results($event)">
    </lib-payments-wp>
    {{response}}
</youe_component>
```