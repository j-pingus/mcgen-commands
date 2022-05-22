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
  enabled: string[] | null = null;

  constructor() {
  }

  setEnabled(enabled: string[] | null) {
    this.enabled = enabled;
    var newSelected: Thing[] = [];
    this.selected.forEach(select => {
      if (this.isEnabled(select)) {
        newSelected.push(select);
      }
    });
    this.selected = newSelected;
    this.selectedThing.next(this.selected);
  }

  select(thing: Thing) {
    if (this.isEnabled(thing)) {
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
  }

  isEnabled(thing: Thing): boolean {
    if (this.enabled == null) return true;
    return this.enabled.indexOf(thing.id) >= 0;
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
