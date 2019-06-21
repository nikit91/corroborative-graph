import { Component, OnInit } from '@angular/core';
import {EventProviderService} from '../../service/event/event-provider.service';
import {CgPath} from '../../model/cg-path';

@Component({
  selector: 'app-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.css']
})
export class DetailViewComponent implements OnInit {
  infoArr: CgPath[] = [
    {
      id: 1,
      pathScore: 0.5643433,
      pathText: 'Barack Obama\'s party is Democratic Party (United States). Democratic Party (United States)\'s country is United States.'},
    {
      id: 2,
      'pathScore': 0.3217161063154906,
      'pathText': 'Carlton W. Reeves\' appointer is Barack Obama. Carlton W. Reeves\' birth place is United States.'},
    {
      id: 3,
      'pathScore': 0.26283496411895807,
      'pathText': 'Nuevo (Bayamón)\'s leader name is Barack Obama. Nuevo Bayamón is part of United States.'
    },
  ];
  constructor(evntService: EventProviderService) {
    evntService.sendDetailEvent.subscribe((infoArr: CgPath[]) => {
      setTimeout(() => {this.infoArr = Object.assign([], infoArr);
      this.infoArr.sort(this.pathScoreSorter);
      });

    });
  }

  pathScoreSorter(path1: CgPath, path2: CgPath) {
    const scr1 = path1.pathScore;
    const scr2 = path2.pathScore;
    return ((scr2 < scr1) ? -1 : ((scr2 > scr1) ? 1 : 0));
  }

  ngOnInit() {
  }

  public removeItem(value: any) {
    this.infoArr = this.infoArr.filter(function(ele: any) {
      return ele.id !== value.id;
    });

  }

  addItem() {

  }

}
