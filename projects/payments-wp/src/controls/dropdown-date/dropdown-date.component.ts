import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dropdown-date',
  templateUrl: './dropdown-date.component.html',
  styleUrls: ['./dropdown-date.component.scss']
})
export class DropdownDateComponent implements OnInit {
  @Input() month: boolean = false;
  @Input() day: boolean = false;
  @Input() year: boolean = false;
  @Input() week: boolean = false;
  @Input() selectedMonthOrder: string = "MM";
  @Input() selectedDayOrder: string = 'DD';
  @Input() selectedYearOrder: string = "YY";
  @Input() selectedWeekOrder: string = "WW";
  @Input() dateLable: string = "";
  @Input() errorMonthMessage: string = '';
  @Input() errorDayMessage: string = '';
  @Input() errorYearMessage: string = '';
  @Input() errorWeekMessage: string = '';
  @Input() required: boolean = false;
  @Input() yearFuture: boolean = false;
  @Output() monthClicked: EventEmitter<string> = new EventEmitter();
  @Output() dayClicked: EventEmitter<string> = new EventEmitter();
  @Output() yearClicked: EventEmitter<string> = new EventEmitter();
  @Output() weekClicked: EventEmitter<string> = new EventEmitter();

  dateLabelId: string = this.dateLable.replace(/\s/g, "");

  selectWeeks: string[] = [];

  selectMonths: string[] = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12"
  ];

  selectDays: string[] = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '24',
    '25',
    '26',
    '27',
    '28',
    '29',
    '30',
    '31'
  ];
  
  selectYears: string[] = [];
  dayID: string = "";
  monthID: string = "";
  yearID: string = "";

  constructor() { }

  ngOnInit(): void {
    this.setYears();
    this.setWeek();
    this.dayID = this.generateGuid();
    this.monthID = this.generateGuid();
    this.yearID = this.generateGuid();
    this.dateLabelId = this.dateLable.replace(/\s/g, "");
  }

  changeMonthOrder(newMonthOrder: string) {
    this.selectedMonthOrder = newMonthOrder;
    this.monthClicked.emit(newMonthOrder);
  }

  changeDayOrder(newDayOrder: string) {
    this.selectedDayOrder = newDayOrder;
    this.dayClicked.emit(newDayOrder);
  }

  changeWeekOrder(selectWeek: any) {
    this.selectedWeekOrder = selectWeek;
    this.weekClicked.emit(selectWeek);
  }

  public setYears() {
    const now = new Date();
    const thisYear = now.getFullYear(); // this will give current year
    const maxYear = thisYear + 11;

    if (!this.day || this.yearFuture) {
      for (let i = thisYear; i < maxYear; i++) {
        this.selectYears.push(i.toString());
      }
    } else {
      let year = 1900;
      while (year <=  new Date().getFullYear()) {
        this.selectYears.unshift(year.toString());
        year++;
        }
      }
    }

  changeYearOrder(newSortOrder: string) {
    this.selectedYearOrder = newSortOrder;
    this.yearClicked.emit(newSortOrder);
  }

  setWeek() {
    for(let i = 1; i <= 52; i++) {
      this.selectWeeks.push(i.toString());
    }
  }
  generateGuid() : string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
