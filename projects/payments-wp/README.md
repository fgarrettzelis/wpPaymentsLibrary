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
import { Component, OnInit, ViewChild } from '@angular/core';
import { WPModel } from './response.wp.model';
import { PaymentsWpComponent } from 'payments-wp';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'test-library-env';
  payPageID: string = "payPageID";
  wpUrl: string = "https://request.eprotect.vantivprelive.com";
  wpResp: WPModel | undefined;
  cardTypes: string[] = ["AmericanExpress", "Visa", "MasterCard", "Discover"];
  @ViewChild(PaymentsWpComponent) child: PaymentsWpComponent;
  
  ngOnInit(): void {


  }

  invoke() {
    this.child.invokeWP();
  }

  results(event: any) {
    console.log("results from wp", event);
    this.wpResp = event;
  }

}

```

in your client
```html
<youe_component>
      <lib-payments-wp
          [payPageID]="payPageID"
          [wpUrl]="wpUrl"
          [cardTypes]="cardTypes"
          (wpRes)="results($event)">
      </lib-payments-wp>    
    {{response}}
    <button (click)="invoke()">invoke WP</button>    
    {{wpResp | json}}
</youe_component>
```