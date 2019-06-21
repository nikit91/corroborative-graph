import {AfterContentInit, Component} from '@angular/core';

import {GRAPHDATA} from './model/mock-data';
import {EventProviderService} from './service/event/event-provider.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showGraph = true;
  title = 'cg-ui';
  constructor(eventService: EventProviderService) {
    eventService.viewChangeEvent.subscribe((graphBool: boolean) => {
      this.setShowGraph(graphBool);
    });
  }
  getGraphData() {
    return GRAPHDATA;
  }

  setShowGraph(val: boolean) {
    this.showGraph = val;
  }
}
