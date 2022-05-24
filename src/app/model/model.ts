export abstract class Thing {
  id: string = '';
  compatible: string[] | null = null;

  constructor(id: string) {
    this.id = id;
  }

  abstract getImage(): string;

  getCompatibleWith(): string[] | null {
    return this.compatible;
  }

  setCompatibleWith(ids: string[]): Thing {
    this.compatible = ids;
    return this;
  }

  addCompatibleWith(...ids: string[]): Thing {
    if (this.compatible == null) {
      this.compatible = [];
    }
    this.compatible.push(...ids);
    return this;
  }
}

export interface Gauge {
  min: number;
  max: number;
  actual: number | null;
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

export class Enchant extends Thing implements Gauge {
  min = 1;
  actual = 1;
  max = 1;

  constructor(id: string, min: number, max: number) {
    super(id);
    this.max = max;
    this.min = min;
    this.actual = min;
  }

  getImage(): string {
    return 'assets/eBook.gif';
  }
}
