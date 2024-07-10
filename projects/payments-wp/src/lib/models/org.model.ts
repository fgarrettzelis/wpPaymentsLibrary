// import { ObpSettings } from "@shared-features/receipt/models/receipt.model";
import { PatientNotificationPreferences } from "../models/patient.model";

enum OrganizationType {
  Payspan = "Payspan",
  Partner = "Partner",
  Location = "Location",
  Group = "Group",
  Client = "Client",
}

enum OrganizationCategory {
  Partner = "Partner",
  PFEProvider = "PFEProvider",
  Provider = "Provider",
  Payer = "Payer",
  Payspan = "Payspan"
}

class PaymentOrgPreferences {
    public payerId: number;
    public name: string;
    public supportAddress: string;
    public brandingPreferences: PaymentOrgBrandingPreferences;
    public acceptedPaymentTypes: Array<string>;
    public acceptedCreditCards: Array<string>;
    public outstandingPaymentDuringAutoPaySetup: boolean;
    public allowPartialAuth: boolean;
}

class PaymentOrgBrandingPreferences {
  public Id: string;
  public ShortName: string;
  public Logo: string;
  public LegalInfo: string;
  public ContactInfo: string;
  public CopyrightInfo: string;
  public domain: string;
  public NondiscriminationNotice: string;
  public SSORedirectEnabled: boolean;
  public SSORedirectUrl: string;
  public SubscriberLabel: string;
  public MemberIdLabel: string;
  public Language: string;
}

class OrgPreferences {
  public externalOrgId: string;
  public parentExternalOrgId: string;
  public orgName: string;
  public orgShortName: string;
  public supportAddress: string;
  public contactInfo: string;
  public orgCategory: OrganizationCategory;
  public orgType: OrganizationType;
  public allowMultipleCurrentInvoices: boolean;
  public allowPaymentForOverdueInvoices: boolean;
  public overPaymentEnabled: boolean;
  public maximumOverPaymentDollarAmount: number;
  public minimumTransactionAmount: number;
  public maximumTransactionAmount: number;
  public enforcePayInFullForBinderEnabled: boolean;
  public enforcePayInFullForAllEnabled: boolean;
  public deactivatePayNowOnCancelEnabled: boolean;
  public binderConvenienceFeeEnabled: boolean;
  public disablePayNowAfterBinderDueDate: boolean;
  public subscriberLabel: string;
  public memberIdLabel: string;
  public twelveMonthAutopayExpiration: boolean;
  public useCustomFaq: boolean;
  public runAutopayForCancelledInvoices: boolean;
  public showInactiveMemberships: boolean;
  public outstandingPaymentDuringAutoPaySetup: boolean;
  public allowPartialAuth: boolean;
  public allowUserRegistration: boolean;
  public acceptedPaymentTypes: Array<string>;
  public acceptedCreditCards: Array<string>;
  public allowEditingEmailAddress: boolean;
  public displayUserName: boolean;
  public displayInvoiceType: boolean;
  public terminologyFieldSettings: TerminologyFieldSettings;
  public orgAddress: OrgAddress;
  // public obpSettings: ObpSettings;
  public isInternal: boolean;
  public newEinvoiceSmsEnabled: boolean;
  public allowUsersToGoPaperless: boolean;
  public displayPlanInformation: boolean;
  public allowStandardAutoPay: boolean;
  public allowCustomAutoPay: boolean;
  public usePdfInvoices: boolean;
  public useHtmlInvoices: boolean;
  public enablePatientPaymentPlans: boolean;
  public hasExternalAuthProvider: boolean;
  public smsNotificationSettings: Array<PatientNotificationPreferences>;
  public allowAdminsToUnlinkUsers: boolean;
  public reviewInvoicesBeforeSend: boolean;
  public enableEProtect: boolean;
}

class OrgAddress {
  address1: string;
  address2: string;
  city: string;
  state: string;
  zipCode: string;
}
class BasicOrgListQuery {
  public orgCategories: Array<string>;
  public orgTypes: Array<string>;
  public belongsToOrgId?: string;
  public orgFeatures?: Array<string>;
}

class OrgBasicInfo {
  name: string;
  id: string;
  shortName: string;
  category: string;
  typeCode: string;
  features: Array<string>;
  text?: string;
}

class TerminologyFieldSettings {
  accountId: string;
  accountName: string;
  recurringPayments: string;
}

class Terminology {
  defaultFieldSettings: Array<DefaultFieldSettings>;
  orgCategory: string;
  organizationFieldSettings: Array<OrganizationFieldSettings>;
}
class DefaultFieldSettings {
  attribute: string;
  label:string;
}
class OrganizationFieldSettings {
  attribute: string;
  label:string;
}

export {
  OrgPreferences,
  OrgBasicInfo,
  BasicOrgListQuery,
  OrganizationCategory,
  OrganizationType,
  PaymentOrgPreferences,
  PaymentOrgBrandingPreferences,
  OrgAddress,
  TerminologyFieldSettings,
  Terminology,
  DefaultFieldSettings,
  OrganizationFieldSettings
};
