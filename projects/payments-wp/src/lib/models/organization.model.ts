class Organization {
    organizationExternalId: string;
    payerId: number;
    name: string;
    shortName: string;
    orgCategory: string;
    orgType: string;
    preferences: OrganizationPreferences;
    paymentPreferences: OrganizationPaymentPrefrences;
    isInternal: boolean;  
    loginUrl: string; 
}
class OrganizationPaymentPrefrences {
    acceptedPaymentTypes: Array<string>;
    acceptedCreditCards: Array<string>;
    allowPartialAuth: boolean;
    enforcePayInFullForAllEnabled: boolean;
    minimumAchTransactionAmount: number;
    maximumAchTransactionAmount: number;
    minimumCreditCardTransactionAmount: number;
    maximumCreditCardTransactionAmount: number;
    maximumOverPaymentDollarAmount: number;
    maximumTransactionAmount: number;
    minimumTransactionAmount: number;
    overPaymentEnabled: boolean;
    enableEProtect: boolean;
}

class OrganizationPreferences {
    supportAddress: string;
    verifyAccount: boolean;
    brandingColors: string;
    contactInfo: string;
}

export {
    Organization,
    OrganizationPreferences,
    OrganizationPaymentPrefrences
}
