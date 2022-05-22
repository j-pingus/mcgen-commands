import {Component, OnInit} from '@angular/core';
import {Enchant, Material, Thing, Tool} from "./model/model";
import {ThingListComponent} from "./thing-list/thing-list.component";
import {CommandComponent} from "./command/command.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'mcgen-commands';
  public tools: Tool[] = [
    new Tool('stick').setCompatibleWith(['mending', 'unbreaking']),
    new Tool('sword').setCompatibleWith(['mending', 'wood', 'stone', 'iron',
      'gold', 'diamond', 'netherite', 'unbreaking', 'sharpness', 'looting']),
    new Tool('axe').setCompatibleWith(['mending', 'wood', 'stone', 'iron',
      'gold', 'diamond', 'netherite', 'unbreaking', 'sharpness', 'looting']),
    new Tool('pickaxe').setCompatibleWith(['mending', 'wood', 'stone', 'iron',
      'gold', 'diamond', 'netherite', 'unbreaking', 'sharpness', 'looting']),
    new Tool('helmet').setCompatibleWith(['mending', 'leather', 'iron',
      'gold', 'diamond', 'netherite', 'unbreaking', 'blast_protection', 'fire_protection','thorns'])
  ];
  public materials: Material[] = [
    new Material('wood'),
    new Material('leather'),
    new Material('stone'),
    new Material('iron'),
    new Material('gold'),
    new Material('diamond'),
    new Material('netherite'),
  ];
  public enchants: Enchant[] = [
    new Enchant('mending', 1, 1),
    new Enchant('unbreaking', 1, 256),
    new Enchant('sharpness', 1, 256),
    new Enchant('looting', 1, 256),
    new Enchant('blast_protection', 1, 256),
    new Enchant('fire_protection', 1, 256),
    new Enchant('thorns', 1, 256),
  ];

  ngOnInit(): void {
  }

  setTool(list: Thing[],
          materialsList: ThingListComponent,
          enchantsList: ThingListComponent,
          command: CommandComponent) {
    command.setTool(list);
    if (list && list.length > 0) {
      materialsList.setEnabled(list[0].getCompatibleWith());
      enchantsList.setEnabled(list[0].getCompatibleWith());
    }
  }
}
