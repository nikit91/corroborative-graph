import {AfterContentInit, AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {CgData} from '../../model/cg-data';
import * as d3 from 'd3';
import {GRAPHDATA} from '../../model/mock-data';
import {CgTriple} from '../../model/cg-triple';
import {CgNodeItem} from '../../model/cg-node-item';
import {CgLineItem} from '../../model/cg-line-item';
import {CgPath} from '../../model/cg-path';
import {NgControlStatusGroup} from '@angular/forms';

@Component({
  selector: 'app-graph-view',
  templateUrl: './graph-view.component.html',
  styleUrls: ['./graph-view.component.css']
})
export class GraphViewComponent implements OnInit, AfterViewInit {
  @Input()
  graphData: CgData;
  g;
  svg;
  private minXDist = 500;
  private minYDist = 50;
  private nodeRad = 20;
  private sNode: CgNodeItem;
  private eNode: CgNodeItem;
  private sNodeX: number;
  private sNodeY: number;
  private maxXDist: number;

  private nodeArr: CgNodeItem[] = [];
  private edgeArr: CgLineItem[] = [];
  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.maxXDist = this.getMaxDist(this.graphData);
    const curScope = this;
    const svg = d3.select('svg');
    // fixme: fix the workaround
    // noinspection TypeScriptUnresolvedVariable
    let width = svg.node().clientWidth;
    // noinspection TypeScriptUnresolvedVariable
    let height = svg.node().clientHeight;
    if (width === 0 || height === 0) {
      width = 500;
      height = 500;
    }
    this.svg = svg;
    this.g = svg.append('g');
    const g = this.g;
    const eleMap = { };
    this.sNodeY = height / 2;
    this.sNodeX = this.nodeRad + 20;
    this.getDefaultPath(this.graphData.defaultPath);
    this.getAllPaths(this.graphData.pathList);


    this.drawEdges(this.edgeArr);
    this.drawCircles(this.nodeArr);
    // arrows
    svg.append('svg:defs').append('svg:marker')
      .attr('id', 'arrow').attr('viewBox', '0 0 10 10')
      .attr('refX', 43).attr('refY', 5)
      .attr('markerUnits', 'strokeWidth')
      .attr('markerWidth', 10)
      .attr('markerHeight', 6)
      .attr('orient', 'auto')
      .append('svg:path')
      .attr('d', 'M 0 0 L 10 5 L 0 10 z');
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

  getMaxDist(data: CgData) {
    let maxLen = -1;
    for (const x in this.graphData.pathList) {
      const curLen = this.graphData.pathList[x].path.length;
      if (curLen > maxLen) {
        maxLen = curLen;
      }
    }

    return maxLen * this.minXDist;
  }
  getDefaultPath(triple: CgTriple) {
    const sNode = new CgNodeItem(this.sNodeX, this.sNodeY, triple.subject);
    this.sNode = sNode;
    const maxDist = this.maxXDist;
    const eNode = new CgNodeItem(this.sNodeX + maxDist, this.sNodeY, triple.object);
    this.eNode = eNode;
    const edge = new CgLineItem(sNode.cx, sNode.cy, eNode.cx, eNode.cy, triple.property);

    this.nodeArr.push(sNode);
    this.nodeArr.push(eNode);
    this.edgeArr.push(edge);
  }

  drawCircles(items: CgNodeItem[]) {
    // Define the div for the tooltip
    const div = d3.select('body').append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0);
    const circle = this.g.selectAll('circle')
      .data(items);
    const circleEnter = circle.enter().append('circle');
    circleEnter.attr('cy', function(d) { return d.cy; });
    circleEnter.attr('cx', function(d) { return d.cx; });
    circleEnter.attr('r', this.nodeRad);
    circleEnter.attr('fill', 'grey');
  }

  drawEdges(items: CgLineItem[]) {
    const lines = this.g.selectAll('.link').data(items)
      .enter().append('g').attr('class', 'node')
      .append('line')
      .attr('class', 'path')
      .attr('marker-end', 'url(#arrow)')
      .style('stroke', 'gray') // <<<<< Add a color
      .attr('x1', function(d, i) { return  d.cx1; })
      .attr('y1', function(d, i) { return d.cy1; })
      .attr('x2', function(d, i) { return d.cx2; })
      .attr('y2', function(d, i) {  return d.cy2; });
  }

  getAllPaths(cgPaths: CgPath[]) {
    let yDelta = this.minYDist;
    // Loop through all the paths
    for (let i = 0; i < cgPaths.length; i++) {
      const curPath = cgPaths[i];
      let prevNode = this.sNode;
      const xDelta = this.maxXDist / curPath.path.length;
      // Loop through each triple in a path
      for (let j = 0; j < curPath.path.length; j++) {
        const curTriple = curPath.path[j];
        const curSub = curTriple.subject;
        const curProp = curTriple.property;
        const curObj = curTriple.object;
        const nextNode: CgNodeItem = new CgNodeItem(prevNode.cx + xDelta, this.sNode.cy + yDelta, '');
        const edge: CgLineItem = new CgLineItem(0, 0, 0, 0, curProp);
        let fromNode: CgNodeItem;
        let toNode: CgNodeItem;
        if (curSub === prevNode.uri) {
          nextNode.uri = curObj;
          fromNode = prevNode;
          toNode = nextNode;
        } else if (curObj === prevNode.uri) {
          nextNode.uri = curSub;
          fromNode = nextNode;
          toNode = prevNode;
        }
        if (nextNode.uri === this.eNode.uri) {
          nextNode.cx = this.eNode.cx;
          nextNode.cy = this.eNode.cy;
        }

        edge.cx1 = fromNode.cx;
        edge.cy1 = fromNode.cy;
        edge.cx2 = toNode.cx;
        edge.cy2 = toNode.cy;

        prevNode = nextNode;
        if (nextNode.uri !== this.eNode.uri) {
          this.nodeArr.push(nextNode);
        }
        this.edgeArr.push(edge);
      }
      // setting the y coordinate for next path
      if (yDelta > 0) {
        yDelta = -yDelta;
      } else {
        yDelta = -yDelta + this.minYDist;
      }
    }
  }

}
