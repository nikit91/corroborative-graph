import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventProviderService {
  viewChangeEvent = new EventEmitter<boolean>();
  constructor() { }
}
