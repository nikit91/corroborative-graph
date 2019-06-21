import {EventEmitter, Injectable} from '@angular/core';
import {CgPath} from '../../model/cg-path';

@Injectable({
  providedIn: 'root'
})
export class EventProviderService {
  viewChangeEvent = new EventEmitter<boolean>();
  sendDetailEvent = new EventEmitter<CgPath[]>();
  constructor() { }
}
