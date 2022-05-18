import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Gauge, Thing} from "../model/model";

@Component({
  selector: 'things-list',
  templateUrl: './thing-list.component.html',
  styleUrls: ['./thing-list.component.css']
})
export class ThingListComponent {
  selected: Thing[] = [];
  @Input()
  title: string = '';
  @Input()
  things: Thing[] = [];
  @Input()
  multi = false;
  @Output()
  selectedThing: EventEmitter<Thing[]> = new EventEmitter<Thing[]>();

  constructor() {
  }

  select(thing: Thing) {
    if (this.multi) {
      const index = this.selected.indexOf(thing);
      if (index == -1) {
        this.selected.push(thing);
      } else {
        this.selected.splice(index, 1);
      }
    } else {
      this.selected = [thing];
    }
    console.log(this.selected);
    this.selectedThing.next(this.selected);
  }

  getClass(thing: Thing) {
    return (this.selected.indexOf(thing) != -1) ? 'selected' : '';
  }

  isGuauge(thing: any) {
    return 'min' in thing;
  }

  gauge(thing: any): Gauge {
    return thing as Gauge;
  }
}
