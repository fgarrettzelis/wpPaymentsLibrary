import {PaymentFeature} from "../models/receipt.model";

class PaymentConfirmation {
    orgExternalId: string;
    orgShortName: string;
    parentOrgExternalId: string;
    feature: PaymentFeature;
    hasPaymentProcessingError: boolean;
    email: string;
    totalAmount: number;
    paymentType: string;
    paymentInvoices: Array<PaymentInvoice>;
}

class PaymentInvoice {
    invoiceId: string;
    invoiceNumber: string;
    amount?: number;
    transactionId: string;
    hasPdf: boolean;
    paymentStatus: PaymentStatusResponse;
}

class PaymentStatusResponse {
    transactionGuid: string;
    status: string;
    reason: string;
    referenceId: string;
    invoiceId: string;
    amount: number;
    requestedAmount: number;
    transactionType: string;
    isReceiptAvailable: boolean;
}

enum PaymentStatus {
    SUCCESS = 'Success',
    FAILED = 'Failed',
    IN_PROGRESS = 'In Progress',
    PARTIALREFUND = 'Partial Refund',
}

enum ConfirmationStatus {
    APPROVED = 'Payment Approved!',
    DECLINED = 'Payment Declined',
    SUBMITTED = 'Payment Submitted!',
    PENDING = 'Payment Pending!'
}

class ReviewActions {
    static VIEW_INVOICE = 'View Invoice';
    static REVIEW = 'Review';
    static ADDITIONAL_PAYMENT = 'Submit Additional Payment';
}

class CancelActions {
    static DONE = 'Done';
    static CANCEL_TRANSACTION = 'Cancel Transaction';
}

enum TransactionTypes {
    Unknown = 'Unknown',
    Payment = 'Payment',
    Refund = 'Refund',
    Return = 'Return',
    Credit = 'Credit',
    ChargebackReversal = 'ChargebackReversal',
    RefundReversal = 'RefundReversal',
    Chargeback = 'Chargeback',
    PartialAuthorization = 'PartialAuthorization',
    PartialRefund = 'PartialRefund',
    Reversal = 'Reversal',
    CreditReversal = 'CreditReversal',
    LockboxReturn = 'LockboxReturn',
    Adjustment = 'Adjustment'
}

class TransactionSearch {
    transactionId: string;
    orgExternalId: string;
    clientId: string;
}

export { ReviewActions,
         CancelActions,
         PaymentConfirmation,
         PaymentInvoice,
         PaymentStatusResponse,
         ConfirmationStatus,
         PaymentStatus,
         TransactionTypes,
         TransactionSearch };
