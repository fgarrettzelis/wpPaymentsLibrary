import { CreditCard } from 'angular-cc-library';
import { CreditCardTypes } from '../../lib/models/payment-static.model';

class CreditCardTypeValidation {
    public static getCreditCardType(ccNumber: string): string {
        const ccType: string = CreditCard.cardType(ccNumber.replace(/\s/g, ''));
        switch (ccType) {
            case 'amex':
                return CreditCardTypes.AmericanExpress;
            case 'discover':
                return CreditCardTypes.Discover;
            case 'visa':
                return CreditCardTypes.Visa;
            case 'mastercard':
                return CreditCardTypes.MasterCard;
            default:
                return "";
        }
    }
    public static isCardAccepted(cardNumber: string, acceptedCreditCards: Array<string>): boolean {
        // get card type
        const cardType: string = this.getCreditCardType(cardNumber);
        if (cardType) {
          return this.isCardTypeAccepted( cardType, acceptedCreditCards );
        } else {
            return false;
        }
    }

    public static isCardTypeAccepted(cardType: string, acceptedCreditCards: Array<string>): boolean {
        if (acceptedCreditCards) {
            const accType: Array<string> = acceptedCreditCards.filter(t => t.toLowerCase() === cardType.toLowerCase());
            if (accType.length > 0) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
     }

    public static getCvvValidation(cardType: string, cvv: string): string {
        let cvvError = '';
        if (cardType === CreditCardTypes.AmericanExpress && cvv.length !== 4) {
            cvvError = 'payment.cvv-4-digits';
          } else if (cardType !== CreditCardTypes.AmericanExpress && cvv.length !== 3) {
            cvvError = 'payment.cvv-3-digits';
          }
        return cvvError;
    }

    public static getCCLengthError(cardType: string, cardNumber: string): string {        
        let ccError = '';
        if ((cardType === CreditCardTypes.AmericanExpress && cardNumber.length != 15) ||
            (cardType !== CreditCardTypes.AmericanExpress && cardNumber.length !== 16)) {
            ccError = 'payment.cardNumber-invalid';
            }
        return ccError;
    }
}

export { CreditCardTypeValidation }


