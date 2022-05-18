export abstract class Thing {
  id: string = '';
  constructor(id:string) {
    this.id=id;
  }
  abstract getImage(): string;
}
export interface Gauge {
  min:number;
  max:number;
  actual:number|null;
}
export class Tool extends Thing {
  getImage(): string {
    return 'assets/tools/' + this.id + '.png';
  }
}
export class Material extends Thing {
  getImage(): string {
    return 'assets/materials/' + this.id + '.png';
  }
}
export class Enchant extends Thing implements Gauge{
  min= 1;
  actual=1;
  max= 1;
  getImage(): string {
    return 'assets/eBook.gif';
  }
  constructor(id:string, min:number, max:number) {
    super(id);
    this.max=max;
    this.min=min;
    this.actual=min;
  }
}
