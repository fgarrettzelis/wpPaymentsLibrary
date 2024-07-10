import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button-secure',
  templateUrl: './button-secure.component.html',
  styleUrls: ['./button-secure.component.scss']
})
export class ButtonSecureComponent implements OnInit {
  @Input() text: string;
  @Input() disabled: boolean = false;
  @Output() buttonClicked: EventEmitter<boolean> = new EventEmitter();
  // faLock=faLock;
  constructor() { }

  ngOnInit(): void {
  }

  onClick() {
    this.buttonClicked.emit(true);
  }

}
