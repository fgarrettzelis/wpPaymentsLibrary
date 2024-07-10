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