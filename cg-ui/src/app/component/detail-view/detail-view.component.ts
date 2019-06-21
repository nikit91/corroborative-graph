import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {EventProviderService} from '../../service/event/event-provider.service';
import {CgPath} from '../../model/cg-path';
import {CgTriple} from '../../model/cg-triple';
import {GraphViewComponent} from '../graph-view/graph-view.component';

@Component({
  selector: 'app-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.css']
})
export class DetailViewComponent implements OnInit {
  @ViewChild('detListContainer', {static: false})
  private detListContainer: ElementRef;
  statMap = {};
  infoArr: CgPath[] = [];
  constructor(public evntService: EventProviderService) {
    evntService.sendDetailEvent.subscribe((infoArr: CgPath[]) => {
      setTimeout(() => {this.infoArr = Object.assign([], infoArr);
      this.infoArr.sort(this.pathScoreSorter);
      this.setAllItemHovDef();
      });

    });

    evntService.pathClickEvent.subscribe((id: number) => {
      this.scrollToDetItem(id);
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

  detailCardClick(id: number) {
    this.evntService.detailClickEvent.emit(id);
  }

  getItemClass(id: number) {

    if (this.statMap[id.toString()] && this.statMap[id.toString()].hover) {
      return 'card-highlight';
    }
    return 'card-no-highlight';
  }

  setItemHov(id: number, val: boolean) {
    if (this.statMap[id.toString()]) {
      this.statMap[id.toString()].hover = val;
    }
  }

  setAllItemHovDef() {
    for (let i = 0; i < this.infoArr.length; i++) {
      const id = this.infoArr[i].id;
      this.statMap[id] = { hover: false};
    }
  }

  scrollToDetItem(id: number) {
    if (!this.statMap[id.toString()]) {
      return;
    }
    const elem = document.getElementById('detcard-' + id);
    const offsetTop = elem.offsetTop;
    this.detListContainer.nativeElement.scrollTop = offsetTop - elem.offsetHeight;
    this.setAllItemHovDef();
    this.setItemHov(id, true);
  }

  getTripleString(trip: CgTriple) {
    const subj = this.getTextSpan(GraphViewComponent.getUriName(trip.subject), 'text-subj');
    const prop = this.getTextSpan(GraphViewComponent.getUriName(trip.property), 'text-prop');
    const obj = this.getTextSpan(GraphViewComponent.getUriName(trip.object), 'text-obj');
    return subj + ' ' + prop + ' ' + obj;
  }

  getUriStr(uri: string) {
    return GraphViewComponent.getUriName(uri);
  }

  private getTextSpan(text: string, className: string) {
    return '<span class="' + className + '">' + text + '</span>';
  }

}
