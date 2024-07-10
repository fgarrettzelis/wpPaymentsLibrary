import { CurrencyPipe } from '@angular/common';
import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Subject } from "rxjs";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  @Input() id: string = "";
  @Input() labelTitle: string = "";
  @Input() inputText: string = "";
  @Input() inputType: string = "text";  
  @Input() errorMessage: string = "";
  @Input() inputValue: string = "";
  @Input() maxlength: string = '255';
  @Input() minlength: string = '';
  @Input() readonly: boolean = false;
  @Input() disabled: boolean = false;
  @Input() required: boolean = false;
  @Input() currencySymbol: boolean = false;
  @Input() applyDebounce: boolean = false;
  @Input() autoComplete:string = '';
  @Input() ariaLabel: string = "";
  @Input() gridMargin: boolean = false;
  @Output() valueChanged: EventEmitter<string> = new EventEmitter();
  @Output() gotFocus: EventEmitter<boolean> = new EventEmitter(); 
  @Output() outFocus: EventEmitter<string> = new EventEmitter(); 
  @Output() keyPress: EventEmitter<any> = new EventEmitter(); 
  @Output() isPasteNumericInput: EventEmitter<any> = new EventEmitter();
  @Output() givebackControl: EventEmitter<any> = new EventEmitter();
  
  public toggleClass:boolean = false;

  txtValChanged: Subject<string> = new Subject<string>();

  cntrlID: string = "";

  constructor(private currencyPipe: CurrencyPipe) {}

  ngOnInit () {
    if(this.ariaLabel === "") {
      this.ariaLabel = this.labelTitle;
    } 
    this.cntrlID = this.generateGuid();
    if(this.inputValue) {
      this.inputValue = this.inputValue.toString().replace(/[$]/g, '');
      if(this.currencySymbol) {
      this.inputValue !== null ? this.currencyPipe.transform(this.inputValue.replace(',','')) : "";
      }
    }
   
      this.txtValChanged
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe(value => this.valueChanged.emit(value));
  }

  toggleLabel() {
    this.toggleClass = !this.toggleClass;
  }

  onChange() {
    this.inputValue = this.inputValue.toString().replace(/[$]/g, '');
    if(this.applyDebounce){
      this.txtValChanged.next(this.inputValue);
    }else{
      this.valueChanged.emit(this.inputValue);
      this.givebackControl.emit(document.getElementById(this.cntrlID))
    }
  }

  focusing() {
    this.gotFocus.emit(true);
  }

  focusOut(element: any) {
    if(this.currencySymbol) {
      element.target.value = this.currencyPipe.transform(this.inputValue.replace(/[$]/g, ''));
    }else{
      this.onBlurInput();
    }
  }

  onBlurInput() {
    this.outFocus.emit(this.inputValue);
  }

  keyPressed(event: any) {
    this.keyPress.emit(event);
  }

  isPasteNumeric(event: any) {
    this.isPasteNumericInput.emit(event);
  }

  generateGuid() : string {
    if(this.id === "") {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
          v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    } else {
      return this.id;
    }

  }
   
  allowNumbersOnly(event: any) {
    event.target.value = event.target.value.replace(/[^0-9.]/g, "") 
  }
}
