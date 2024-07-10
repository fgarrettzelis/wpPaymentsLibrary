import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import { DropDownItems } from '../../lib/dropdown-items.interface';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {
  @Input() data: string[] | DropDownItems[] | any[] = [];  
  @Input() set selectedItem(inputMessage: string | any) {
    this._selectedItem = inputMessage; // uppercase message here
  }  
  get selectedItem(): string | any {
    return this._selectedItem;
  }
  @Input() labelTitle: string = "";
  @Input() placeholder: string = "";
  @Input() errorMessage: string = "";
  @Input() disabled: boolean = false;
  @Input() required: boolean = false;
  @Input() special: boolean = false;
  @Output() selector: EventEmitter<any> = new EventEmitter();
  @Output() selectorObject: EventEmitter<DropDownItems> = new EventEmitter();
  @Output() gotFocus: EventEmitter<boolean> = new EventEmitter();
  @Output() outFocus: EventEmitter<string> = new EventEmitter(); 
  _selectedItem: string | any = "";
  public toggleClass:boolean = false;
  cntrlID: string;
  
  ngOnInit(): void {
    this.cntrlID = this.generateGuid();
  }

  itemSelected(selected: string) {
    if(!this.special) {
     this._selectedItem = selected;
    }
    this.selector.emit(selected);
  }

  objectSelected(selected: DropDownItems) {   
    if(selected.text){
     this.selectedItem = selected.text;
    this.selectorObject.emit(selected);
    }
  }

  toggleLabel() {
    this.toggleClass = !this.toggleClass;
    this.gotFocus.emit(true);
  }

  generateGuid() : string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  onBlurInput() {
    this.outFocus.emit(this._selectedItem);
  }
}
