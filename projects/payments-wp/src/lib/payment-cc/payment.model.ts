import { PaymentMethodTypes } from '../models/payment-static.model';
import {OrgPreferences} from "../models/org.model";
import {PatientDetail} from "../models/patient.model";
import {DropDownItems} from "../dropdown-items.interface";

enum PaymentType {
    Visa = 1,
    MasterCard = 2,
    Discover = 3,
    AmericanExpress = 4,
    Ach = 5,
    Check = 6,
    Cash = 7
}

enum PaymentMethodType {
    Card = 1,
    Ach = 2
}

enum AchType {
    Checking = 1,
    Savings = 2
}

enum PaymentsResponseStatus
{
  Success = "Success",
  PartialSuccess = "PartialSuccess",
  Failed = "Failed"
}

class PayInvoices {
  invoices:  Array<Invoice>;
  totalAmount: number;
}

class InvoicePayment {
    paymentMethod: PaymentMethod;
    invoices: Invoice[];
}

class Invoice {
    invoiceId: string;
    amount: number;
}

class PatientPayment{
    paymentMethod: PaymentMethod;
    patientId: string;
    isSplitPayment: boolean
    invoice: InvoicePatient;
    paymentAmount: number;
}

class OBPPayment{
    accountUniqueId: string;
    isPatientStaged: boolean;
    invoiceUniqueId: string;
    isInvoiceStaged: boolean;
    paymentMethod: PaymentMethod;
    paymentAmount: number;
    isEInvoice: boolean;
}

class InvoicePatient {
    invoiceExternalId: string;
    invoiceNumber: string;
    invoiceAmount: number;
    note: string;
}

class PaymentMethod {
    paymentInstrumentToken: string;
    details: PaymentMethodDetail;
    usedForAutopay: boolean;
    usedForSchedulePayment: boolean;
}

class PaymentMethodDetail {
    type: string;
    nameOnAccount: string;
    streetAddress: string;
    streetAddress2: string;
    city: string;
    state: string;
    billingZip: string;
    encryptedAccountNumber: string;
    lastFour: string;
    save: boolean;
    dateCreated: Date;
    isDefault: boolean;
    date: string;
    checkNumber: string;
    addressUnavailableConsent: boolean;
    tokenType: string;
    token: string;
}

class AchPaymentMethod extends PaymentMethodDetail {
    routingNumber: string;
    achType: string;
}

class CardPaymentMethod extends PaymentMethodDetail {
    expirationMonth: number;
    expirationYear: number;
    cvv: string;
    paymentType: string;
    payPageRegistrationIdField: string;
    tokenMerchantResponse: string;
}

class InvoicePaymentsResponse {
  email: string;
  paymentType: string;
  status: PaymentsResponseStatus;
  payments: Array<InvoicePaymentResponse>;
}

class InvoicePaymentResponse {
    invoiceId: string;
    transactionId: string;
    error: string;
}

class BankInfo {
    public BankName: string;
}

class MSAPublicKey {
    public Key: string;
}

class RefundStatus {
    public transactionId: number;
    public transactionGuid: string;
    public originalTransactionGuid: string;
    public transactionType: string;
    public status: string;
    public refundAmount: number;
}

class RefundRequest {
  public transactionGuid: string;
  public amount: number;
  public reason: string;
}

class Address {
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip5: string;
  zip4: string;

  constructor(address1: string = '', address2: string = '', city: string = '', state: string = '', zip5: string = '') {
      this.address1 = address1;
      this.address2 = address2;
      this.city = city;
      this.state = state;
      this.zip5 = zip5;
  }
}

class GooglePaymentResponse {
    description: string;
    type: string;
    tokenizationData: TokenizationData;
    info: Info;
}

class TokenizationData {
    type: string;
    token: string;
}

class Info {
    cardNetwork: string;
    cardDetails: string;
}

class ApplePaymentResponse {
    paymentData: PaymentData;
    paymentMethod: ApplePaymentMethod;
    transactionIdentifier: string;
}

class PaymentData {
    data: string;
    signature: string;
    version: string;
    header: Header;
}

class Header {
    publicKeyHash: string;
    ephemeralPublicKey: string;
    transactionId: string;
}

class ApplePaymentMethod {
    displayName: string;
    network: string;
    type: string;
}

class WPFields {
    accountNum: any;
    cvv: any;
    expDate: any;
    paypageRegistrationId: any;
    bin: any;
}

class WPEprotectRequest {
    paypageId: string;
    reportGroup: string;
    orderId: string;
    id: string;
    url: string;
}


export {
    RefundRequest,
    RefundStatus,
    InvoicePayment,
    Invoice,
    PaymentMethod,
    PaymentMethodDetail,
    AchPaymentMethod,
    CardPaymentMethod,
    InvoicePaymentsResponse,
    InvoicePaymentResponse,
    PaymentsResponseStatus,
    PaymentMethodType,
    PaymentType,
    AchType,
    BankInfo,
    MSAPublicKey,
    PatientPayment,
    InvoicePatient,
    OBPPayment,
    Address,
    PayInvoices,
    GooglePaymentResponse,
    ApplePaymentResponse,
    WPFields,
    WPEprotectRequest
}
