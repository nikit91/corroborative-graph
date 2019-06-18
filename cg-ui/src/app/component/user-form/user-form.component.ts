import { Component, OnInit } from '@angular/core';
import {EventProviderService} from '../../service/event/event-provider.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  constructor(public eventService: EventProviderService) { }

  ngOnInit() {
  }

  showGraph() {
    this.eventService.viewChangeEvent.emit( true );
  }

}
