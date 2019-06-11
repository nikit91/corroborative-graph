export class CgLineItem {
  cx1: number;
  cy1: number;
  cx2: number;
  cy2: number;
  uri: string;
  constructor(cx1: number, cy1: number, cx2: number, cy2: number, uri: string) {
    this.cx1 = cx1;
    this.cy1 = cy1;
    this.cx2 = cx2;
    this.cy2 = cy2;
    this.uri = uri;
  }
}
