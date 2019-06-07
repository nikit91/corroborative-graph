import {AfterContentInit, AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {CgData} from '../../model/cg-data';
import * as d3 from 'd3';
import {GRAPHDATA} from '../../model/mock-data';

@Component({
  selector: 'app-graph-view',
  templateUrl: './graph-view.component.html',
  styleUrls: ['./graph-view.component.css']
})
export class GraphViewComponent implements OnInit, AfterViewInit {
  @Input()
  graphData: CgData;
  g;
  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    const curScope = this;
    const svg = d3.select('svg');
    // fixme: fix the workaround
    const width = svg.node().parentNode.parentNode.parentNode.clientWidth;
    const height = svg.node().parentNode.parentNode.parentNode.clientHeight;

    this.g = svg.append('g');
    const g = this.g;
    const eleMap = { };

    const circle = g.selectAll('circle')
      .data([32, 57, 112, 293]);

    const circleEnter = circle.enter().append('circle');

    circleEnter.attr('cy', 60);
    circleEnter.attr('cx', function(d, i) { return i * 100 + 30; });
    circleEnter.attr('r', function(d) { return 20; });

    circleEnter.each(function(d) { curScope.saveToMap(d, 'circle', this, eleMap); });



    const lines = g.attr('class', 'line')
      .selectAll('line').data([[32, 57], [112, 293]])
      .enter().append('line')
      .style('stroke', 'gray') // <<<<< Add a color
      .attr('x1', function(d, i) { return  eleMap[d[0]].circle.getAttribute('cx'); })
      .attr('y1', function(d, i) { return eleMap[d[0]].circle.getAttribute('cy'); })
      .attr('x2', function(d, i) { return eleMap[d[1]].circle.getAttribute('cx'); })
      .attr('y2', function(d, i) {  return eleMap[d[1]].circle.getAttribute('cy'); });

    svg.append('rect')
      .attr('fill', 'none')
      .attr('pointer-events', 'all')
      .attr('width', width)
      .attr('height', height).style('color', 'red').style('border-width', '7px')
      .call(d3.zoom()
        .scaleExtent([1, 8])
        .on('zoom', function() { g.attr('transform', d3.event.transform); }));

  }

  saveToMap(key, valKey, elDt, eleMap) {
    if (!eleMap[key]) {
      eleMap[key] = {};
    }
    const item = eleMap[key];
    item[valKey] = elDt;
  }

}
