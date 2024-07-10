import { PaymentMethod } from "../models/payment.model";

class Patient {
    dateOfBirth: string;
    patientName: string;
    patientId: string;
    patientExternalId: string;
    email: string;
    phone: string;
    status: string;
    dateUpdated: string;
    toDelete: boolean;
    patientAddress: PatientAddress;
    hasActivePlans : boolean;
}

class PatientAddress {
    address1: string;
    address2: string;
    city: string;
    state: string;
    zip5: string;
    zip4: string
}

class PatientQuery {
    orgId: string;
    dateOfBirth: string;
    freeFormSearch: string;
    page: number
  }

  class PatientGridDetails {
    totalCount: number;
    pageSize: number;
    results: Patient[]
  }

class PatientDetail {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  location: string;
  patientId: string;
  gender: string;
  phone: string;
  phoneType: string;
  email: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip5: string;
  zip4: string;
  middleName: string;
  locationId: string;
  rowUniqueId: string;
  hasOutstandingPFEInvoice: boolean;
  notificationPreferences: Array<NotificationPreference>;
  patientNotificationPreferences: Array<PatientNotificationPreferences>;
  userUniqueId: string;
}

class NotificationPreference {
  public notificationExternalId: string;
  public notificationMethod: string;
  public scheduleType: string;
  public templateName: string;
}
class PatientNotificationPreferences {
  public externalId: string;
  public notificationMethod?: string;
  public selected: boolean;
  public description: string;

}

class UploadResponse {
  importBatchExternalId: string;
}

class UploadStatus {
  importBatchExternalId: string;
  status: string;
  statusReason: string;
  processingStartDate: Date;
  processingEndDate: Date;
  processedTotal: number;
  processedError: number;
  processedSuccess: number;
}

enum ImportFileStatus
{
  Queued = "Queued",
  InProgress = "InProgress",
  ProcessedSuccessfully = "ProcessedSuccessfully",
  ProcessedWithErrors = "ProcessedWithErrors",
  Failed = "Failed",
  Errored = "Errored"
}



class PatientDeleteRequest {
  patientIds: string[];
}

class PatientPaymentPlan {
  planId: string;
  schedule: PaymentSchedule;
  scheduledPayments: string;
  paymentType: string;
}

class PaymentSchedule {
  frequency: string;
  frequencyPeriod: number;
  paymentInstrumentLastFour: string;
  startDate: Date;
  endDate: Date;
  totalAmount: number;
  amount: number;
  lastPaymentAmount: number;
  dateCreated: Date;
  remainingAmount: number;
  invoiceNumber: string;
}

export { Patient, 
        PatientQuery, 
        PatientGridDetails, 
        PatientDetail, 
        PatientDeleteRequest,
        PatientPaymentPlan,
        UploadResponse, 
        UploadStatus,
        ImportFileStatus,
        PaymentSchedule,
        PatientAddress,
        PatientNotificationPreferences
  }
