import {AbstractControl,
        ValidationErrors} from "@angular/forms";

export class ValidationPatterns {
    // tslint:disable-next-line: max-line-length
    static email: string = '^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9-]{2,}\\.)+[a-zA-Z]{2,6}$';
    static phoneNumber: string = '^((\\+91-?)|0)?[0-9]{10}$';
    static password: string = '^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[!@#\$%\^&\*])[A-Za-z\\d!$%@#£€*?&]{8,}$';
    static names: string = '[a-zA-Z0-9.\' -]+$';
    static alphaNumeric: string = '[a-zA-Z0-9]+$';
    static alphaOnly: string = '^[a-zA-Z ]*$';
    static numericOnly: string = '^[0-9]*$';
    static numberDecimal: string = '^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$';
    static text = '^[a-zA-Z0-9][a-zA-Z0-9.,; ]+$';
    static address = '^[a-zA-Z0-9][a-zA-Z0-9.,;# ]+$';
    static city = '^[a-zA-Z][a-zA-Z0-9 ]+$';
    static datePatern = '(0|1)[0-9]\/[0-3][0-9]\/(19|20)[0-9]{2}$';
    static code: string = '[0-9]+';
    static username = '^(?=.*[a-zA-Z])[a-zA-Z0-9\-._@+]{6,50}$';
    static ssoUsername = '^((?=.*[a-zA-Z])[a-zA-Z0-9\-._@+])|[0-9]{6,50}$';
    static twoDecimal = /^-?\d*[.,]?\d{0,2}$/;
    static fourDecimal = /^-?\d*[.,]?\d{0,4}$/;

    static cannotContainSpace(control: AbstractControl) : ValidationErrors | null {
      if((control.value as string).indexOf(' ') >= 0){

        return {cannotContainSpace: true}
      }

      return null;
    }

    static keyPress(event: any) {
      const pattern = /[0-9 /]/;
      const inputChar = String.fromCharCode(event.charCode);
      const theEvent = event || window.event;
      const key = theEvent.keyCode || theEvent.which;
      if ((key >= 48 && key <= 57) || key === 8 || key === 9 || key === 46 || pattern.test(inputChar)) {
        return true;
      } else {
        event.preventDefault();
      }
    }

    static isPasteNumericInput(event: ClipboardEvent) {
      const clipboardData = event.clipboardData;
      const pastedText = clipboardData.getData('text');

      const matches = /[\D]*/.exec(pastedText);

      if (matches != null && matches[0] !== '') {
        event.cancelBubble = true;
        event.returnValue = false;
      }
    }

    static parsePhone(number: any) {
      let tmp = number.split("(").join("");
      tmp = tmp.split(")").join("");
      tmp = tmp.split(" ").join("");
      tmp = tmp.split("-").join("");
      return tmp;
    }
}
