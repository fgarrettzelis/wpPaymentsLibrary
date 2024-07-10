enum PaymentFeature {
  InvoiceCentric,
  PFE,
  OPB,
  OneTimePayment
}

class TransactionReceiptEmailRequest {
  transactionExternalId: string;
  emailAddress: string;
}

class Receipt {
    transactionInvoice: TransactionInvoice;
    organization: OrganizationInfo;
    account: AccountInfo;
}

class ObpReceipt extends Receipt {
  invoiceMessage: string;
  invoiceDatas: Array<ReceiptInvoiceData>;
}

class ReceiptInvoice {
  invoiceMessage: string;
  invoiceData: Array<ReceiptInvoiceData>
}

class ReceiptInvoiceData {
  attribute: string;
  label: string;
  value: string;
}

class AccountInfo{
    accountExternalId: string;
    address1: string;
    address2: string;
    city: string;
    emailAddress: string;
    firstName: string;
    lastName: string;
    middleName: string;
    state: string;
    zipCode: string;
  }

 class OrganizationInfo  {
   orgExternalId: string;
   organizationType: string;
   organizationCategory: string;
   name: string;
   shortName: string;
   brandingSuffix: string;
   emailAddress: string;
   contactPhone: string;
   address1: string;
   address2: string;
   city: string;
   state: string;
   zipCode: string;
   organizationLocationText: string;
   hasBranding: boolean;
   brandingTheme: string;
}

 class TransactionInvoice {
   transactionDate: string;
   transactionExternalId: string;
   transactionId: number;
   paymentInstrumentType: string;
   authority: string;
   status: string;
   totalAmount: number;
   requestedAmount: number;
   lastFour: string;
   checkNumber: string;
   transactionType:string;
   paymentMethod:string;
   note: string;
   amountDue: string;
   dueDate: string;
   invoiceNumber: string;
   isPending: boolean;
   customFields: CustomField[];
   paymentType: string;
 }

 class CustomField {
  fieldOrder: number;
  fieldName: string;
  customFieldValue: string;
  enabled: boolean;
  fieldType: string;
}

 class ObpSettings {
  public verifyAccount: boolean;
  public obpFieldSettings: InvoiceFieldSettings[];
  public obpInvoiceMessage: string;

  constructor() {
      this.obpFieldSettings = new Array<InvoiceFieldSettings>();
  }
}

class InvoiceFieldSettings {
  public attribute: string;
  public label: string;
  public required: boolean;
  public display: boolean;
}

class InvoiceData {
  attribute: string;
  value: string;

  constructor(attribute: string, value: string) {
      this.attribute = attribute;
      this.value = value;
  }
}

enum brandColors{
    ourPrimary= '#017BC1',
}
export {
    Receipt,
    ObpReceipt,
    ReceiptInvoice,
    ReceiptInvoiceData,
    brandColors,
    OrganizationInfo,
    AccountInfo,
    TransactionInvoice,
    PaymentFeature,
    ObpSettings,
    InvoiceFieldSettings,
    InvoiceData,
    CustomField,
    TransactionReceiptEmailRequest
}
