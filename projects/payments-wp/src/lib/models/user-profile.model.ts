// import {inherits} from "util";

class UserProfile {
  userId: string;
  userInitials: string;
  name: string;
  userName: string;
  email: string;
  orgId: string;
  orgType: string;
  orgCategory: string;
  orgName: string;
  orgShort: string;
  brandingSuffix: string;
  role: string;
  language: string;
  defaultRoute: string;
  menu: Array<UserProfileMenu>;
  userAccess: UserRouteAccess;
  dateLastLogin: Date;
  accessRequirements: AccessRequirements;
  accessToken: string;
  sessionLifetime: number;
  hasAcknowledgedPfeMigration: boolean;
}

class UserProfileMenu {
  public id: string;
  public name: string
}

class NavigationItem {
  public id: string;
  public feature: string;
  public name: string;
  public displayName: string;
  public route: string;
  public hasRoute: boolean;
  public isDefault: boolean;
  public isFeature: boolean;
}

class RouteValidationRequest {
  public routes: Array<string>;
}

class UserRouteAccess {
  routesValidated: Array<RouteAccessValidation>

  public isRouteValid(route: string): boolean {
    try {
      const userRoute: RouteAccessValidation = this.routesValidated.find(a => a.route.toLocaleLowerCase() === route.toLocaleLowerCase())!;
      if (userRoute) {
        return userRoute.valid
      } else {
        return false;
      }
    } catch (ex) {
      return false;
    }
  }
}

enum UserRole {
  PayspanAdmin = 'PayspanAdmin',
  PayspanUser = 'PayspanUser',
  ProviderAdmin = 'ProviderAdmin',
  PayerAdmin = 'PayerAdmin',
  ProviderMember = 'ProviderMember',
  PayerMember = 'PayerMember',
  ProviderUser = 'ProviderUser',
  PayerUser = 'PayerUser'
}

class RouteAccessValidation {
  public route: string;
  public valid: boolean;
}

class AccessRequirements {
  authenticators: Authenticators;
  agreements: Agreements;
}

class Authenticators {
  public satisfied: boolean;
  public factors: Factors;
}

class Factors {
  enrolled: Array<string>;
  options: Array<string>;
}

class Agreements {
  public satisfied: boolean;
}

enum Factor {
  none='None',
  challenge = 'Challenge',
  email = 'Email',
  sms = 'Sms',
  otp = 'Otp'
}

export {
  UserProfile,
  UserProfileMenu,
  UserRouteAccess,
  RouteValidationRequest,
  RouteAccessValidation,
  NavigationItem,
  UserRole,
  AccessRequirements,
  Authenticators,
  Factors,
  Agreements,
  Factor
};
