import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-button-secondary',
  templateUrl: './button-secondary.component.html',
  styleUrls: ['./button-secondary.component.scss']
})

export class ButtonSecondaryComponent implements OnInit {
  @Input() text: string;
  @Input() disabled: boolean = false;
  @Input() customWidth: boolean = false;
  @Output() buttonClicked: EventEmitter<boolean> = new EventEmitter();
  @Input() arialbl: string = null;
  
  constructor() { }

  ngOnInit() {
    if(this.arialbl === null) {
      this.arialbl = this.text + " Button";
    }    
  }

  onClick() {
    this.buttonClicked.emit(true);
  }
}
