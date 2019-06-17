import {AfterContentInit, Component} from '@angular/core';

import {GRAPHDATA} from './model/mock-data';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showGraph = false;
  title = 'cg-ui';
  getGraphData() {
    return GRAPHDATA;
  }
}
