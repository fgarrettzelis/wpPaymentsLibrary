import { NgModule } from '@angular/core';
import { PaymentsWpComponent } from './payments-wp.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { InputComponent } from '../controls/input/input.component';
import { DropdownDateComponent } from '../controls/dropdown-date/dropdown-date.component';
import { PaymentCcComponent } from './payment-cc/payment-cc.component';
import { PayInvoiceComponent } from './pay-invoice/pay-invoice-component';
import { BillingAddressComponent } from './billing-address/billing-address.component';
import { ButtonSecondaryComponent } from '../controls/button-secondary/button-secondary.component';
import { ButtonSecureComponent } from '../controls/button-secure/button-secure.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DropdownComponent } from '../controls/dropdown/dropdown.component';

@NgModule({
  declarations: [
    PaymentsWpComponent,
    InputComponent,
    DropdownDateComponent,    
    PaymentCcComponent,
    PayInvoiceComponent,
    BillingAddressComponent,
    ButtonSecondaryComponent,
    ButtonSecureComponent,
    DropdownComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    NgbModule
  ],
  exports: [
    PaymentsWpComponent
  ],
  providers:    [ CurrencyPipe ]
})
export class PaymentsWpModule { }
