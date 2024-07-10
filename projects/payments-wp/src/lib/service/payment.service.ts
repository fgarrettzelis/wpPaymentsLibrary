import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class PaymentService {    
    public wpCCError: BehaviorSubject<string> = new BehaviorSubject<string>('');

    constructor() {
      
    }

  }
