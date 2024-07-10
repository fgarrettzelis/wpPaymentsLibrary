class AppSettings {
  version: string;
  captchaSiteKey: string;
  captchaSiteKeyTest: string;
  captchaV2Invisible: string;
  captchaV3: string;
  cid: string;
  serviceTimer: ServiceIntervalSetting;
  urlSettings: UrlSettings;
  pcfhApiUrl: string = '';
  portalApiUrl: string = '';
  portalApiAlternateUrl: string = '';
  logoUrl: string = '';
  reportUrl: string = '';
  sso: SsoSettings;
  refresh: refreshSettings;
  authConfig: AuthConfig;
  userPilot: UserPilot;
  googlePay: GooglePay;
  applePay: ApplePay;
  newEInvoiceId: string;
  OTPrintFlag: boolean;
  worldpay: Worldpay;
}

class AuthConfig {
  baseUrl: string;
  issuer: string;
  redirectUri: string;
  clientId: string;
  useInteractionCodeFlow: boolean;
  scopes: Array<string>;
  responseType: Array<string>;
  postLogoutRedirectUri: string;
}


class UserPilot {
  userPilotKey: string;
  loadUserPilot: boolean = false;
}

class UrlSettings {
  logoBaseUrl: string;
  portalHostBaseUrl: string;
  pcfhApiBaseUrl: string;
  portalSuffixMain: string;
  portalSuffixAlternate: string;
  reportBaseUrl: string;
}

class ServiceIntervalSetting {
  interval: number;
  swipeInterval: number;
  seconds: number;
}

class SsoSettings {
  redirectTimerMilliSeconds: number;
}

class refreshSettings {
  enableLogging: boolean;
  intervalMinutes: number;
  reminderMinutes: number;
  inactiveMinutes: number;
  browserRefreshMilliSeconds: number;
}

class GooglePay {
  publicKey: string;
  merchantId: string;
  merchantName: string;
  env: string;
}

class ApplePay {
  merchantIdentifier: string;
}

class Worldpay {
  onOffSwitch: boolean;
  logErrors: boolean;
  paypageId: string;
  reportGroup: string;
  url: string;
  scriptURL: string;  
}

export {
  AppSettings,
  ServiceIntervalSetting,
  UrlSettings,
  SsoSettings,
  refreshSettings
};
