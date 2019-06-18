import {Component, Input, OnInit} from '@angular/core';
import {CgData} from '../../model/cg-data';
import {EventProviderService} from '../../service/event/event-provider.service';

@Component({
  selector: 'app-result-view',
  templateUrl: './result-view.component.html',
  styleUrls: ['./result-view.component.css']
})
export class ResultViewComponent implements OnInit {
  @Input()
  graphData: CgData;
  constructor(public eventService: EventProviderService) { }

  ngOnInit() {
  }

  showForm() {
    this.eventService.viewChangeEvent.emit( false );
  }

}
