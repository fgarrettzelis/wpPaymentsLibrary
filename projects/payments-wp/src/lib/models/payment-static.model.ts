class PaymentMethodTypes {
    static Card = 'Card';
    static Ach = 'Ach';
    static Cash = 'Cash';
    static Check = 'Check';
    static SwipeCard = 'SwipeCard';
    static Other = 'Other';
    static GPay = 'GooglePay';
    static APPLEPay = 'ApplePay';
}

class AchTypes {
    static Checking = 'Checking';
    static Savings = 'Savings';
}

class CreditCardTypes {
    static Visa = 'Visa';
    static MasterCard = 'MasterCard';
    static Discover = 'Discover';
    static AmericanExpress = 'AmericanExpress';
}

class MsaStatus {
  static OPEN = 'OPEN';
}

export {
    PaymentMethodTypes,
    AchTypes,
    CreditCardTypes,
    MsaStatus
}
