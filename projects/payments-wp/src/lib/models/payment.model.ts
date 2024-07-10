import {Organization} from "../models/organization.model";

class OrganizationPaymentRequest {
  organization: Organization;
  paymentRequestId: number;
  paymentInstrumentRequestId: number;
  paymentRequest: PaymentRequestReceived;
  paymentMethod: PaymentMethod;
  paymentRequestTransaction: PaymentRequestTransaction;
  isPayable: boolean;
  invoiceUniqueId: string;
}

class PaymentRequest {
  paymentRequestId: number;
  payerId: number;
  amount: number;
  paymentMethod: PaymentMethod;
  paymentInstrumentRequestId: number;
}
class PaymentRequestReceived {
  referenceId: string;
  amountDue: number;
  fullAmount?: number;
  invoice: Invoice;
  plan: Plan
  subscriber: Subscriber
  items: Items;
  options: Options;
}

class Subscriber {
  firstName: string;
  lastName: string;
  middleName: string;
  payerMemberId: string;
  exchangeMemberId: string;
  emailAddress: string;
  phoneNumber: string
  address: BillingAddress
}

class Plan {
  carrierName: string;
  planName: string;
  payerPlanId: string;
  groupNumber: string;
  exchangePlanId: string;
  planStart: string;
  planEnd: string;
}

class Invoice {
  invoiceId: string;
  invoiceType: string;
  billPeriodStart: string;
  billPeriodEnd: string;
}

class Items {
  type: string;
  cost: string;
}

class Options {
  paymentInstrumentId: string;
  commentToSubscriber: string;
  redirectUrls: RedirectUrls;
  useConfirmationPage: boolean;
  language: string;
}

class RedirectUrls{
  return_url: string;
  cancel_url: string;
}

class PaymentMethod{
  paymentInstrumentKey: string;
  nameOnAccount: string;
  paymentMethodType: string;
  ccvNumber: number;
  accountNumber: string;
  routingNumber: number;
  emailAddress: string;
  phoneNumber: number;
  paymentInstrumentId: string;
  paymentMethod: string;
  accountLast4: string;
  expirationDate: string;
  billingAddress: BillingAddress;
  lastFour: string;
  paymentType: string; 
  payPageRegistrationIdField: string;
  tokenMerchantResponse: string;
}

class PaymentInstrument {
  paymentInstrumentId: string;
  paymentMethod: string;
  accountLast4: string;
  expirationDate: string;
  name: string;
  BillingAddress: BillingAddress;
  achType: boolean;
}

class GatewayPaymentMethod {
  organization: Organization;
  paymentInstrumentRequestId: number;
  paymentInstrumentRequest: GatewayPaymentInstrumentRequest;
  paymentMethod: PaymentMethod;
}

class GatewayPaymentMethodResponse {
  paymentInstrumentRequestReferenceId: string;
  paymentInstrumentRequestExternalId: string;
  paymentInstrumentId: string;
}

class GatewayPaymentMethodRequest {
  paymentInstrumentKey: string;
  nameOnAccount: string;
  billingAddress: BillingAddress;
  paymentMethodType: string;
  ccvNumber: string;
  accountNumber: string;
  routingNumber: string;
  emailAddress: string;
  phoneNumber: string;
  AchType: string;
  paymentMethod: string;
  accountLast4: string;
  expirationDate: string;
  payPageRegistrationIdField: string;
  tokenMerchantResponse: string;
}

class PaymentMethodRequest {
  payerId: number;
  paymentInstrumentRequestId: number;
  paymentMethod: GatewayPaymentMethodRequest;
}

class GatewayPaymentInstrumentRequest {
  paymentInstrumentReferenceId: string;
  options: Options;
}

class PaymentInstrumentRequest {
  organization: Organization;
  paymentRequestId: number;
  paymentInstrumentRequestId: number;
  paymentRequest: PaymentRequestReceived;
  paymentMethod: PaymentMethod;
  paymentRequestTransaction: PaymentRequestTransaction;
}

class BillingAddress{
  address1: string;
  address2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

class PaymentResponse {
  isValid: boolean;
  errorMessage: string;
  translationCode: string;
  paymentRequestTransaction: PaymentRequestTransaction
}

class PaymentRequestTransaction {
    paymentRequestId: number;
    paymentRequestExternalId: string;
    paymentRequestReferenceId: string;
    transactionId: number;
    transactionGuid: string;
    transactionStatus: string;
    transactionReason: string;
}

class ProviderPaymentRequestResponse extends PaymentRequestTransaction {
  public RedirectUrls: RedirectUrls;
}

enum RedirectUrlType {
  Cancel,
  Return
}

export {
  OrganizationPaymentRequest,
  Invoice,
  Items,
  Options,
  RedirectUrls,
  PaymentMethod,
  BillingAddress,
  PaymentRequest,
  PaymentRequestReceived,
  PaymentResponse,
  PaymentRequestTransaction,
  ProviderPaymentRequestResponse,
  RedirectUrlType,
  PaymentInstrument,
  GatewayPaymentMethod,
  PaymentInstrumentRequest,
  GatewayPaymentMethodResponse,
  GatewayPaymentMethodRequest,
  PaymentMethodRequest
}
