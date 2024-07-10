
## Dependencie
add these to youe package.json and install
"@ng-bootstrap/ng-bootstrap": "15.1.2",
"angular-cc-library": "3.2.0",
"bootstrap": "^4.4.1"

## Insinstall
npm i payments-wp

## Usage 
once installed, copy the asset folder from the PaymentsWp directory in node_module to your assset directory

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaymentsWpModule } from 'payments-wp' //add the import

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    PaymentsWpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

<youe_componet>
    <lib-payments-wp
        [payPageID]="payPageID"
        [wpUrl]="wpUrl" 
        (wpRes)="results($event)">
    </lib-payments-wp>
    {{response}}
</youe_componet>
