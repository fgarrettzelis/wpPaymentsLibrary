
class NameId {
    name: string;
    id: any;
    text?: string;
}
class KeyValue {
  key: string;
  value: any;
}
class Alert {
    type: string;
    message: string;
  }

class ApiError {
  field: string;
  value: string[];
}

class Message {
  code: string;
  errors: Array<ApiError>;
}

class ErrorDetails {
  context: string;
  code: string;
  message: Message;
  status: number;
}
export {Alert, NameId, ApiError, ErrorDetails, Message, KeyValue};
