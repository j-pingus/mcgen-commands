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
  private static ARMOR_ENCHANTS = ['mending', 'unbreaking', 'blast_protection', 'fire_protection',
    'thorns','projectile_protection','protection']
  private static ARMOR_MATERIALS = ['leather', 'iron', 'gold', 'diamond', 'netherite']
  private static TOOLS_MATERIALS = ['leather', 'iron', 'gold', 'diamond', 'netherite']
  title = 'mcgen-commands';
  public tools: Tool[] = [
    new Tool('stick').setCompatibleWith(['mending', 'unbreaking']),
    new Tool('sword').setCompatibleWith(['mending', 'unbreaking', 'sharpness', 'fire_aspect','looting','knockback'])
      .addCompatibleWith(...AppComponent.TOOLS_MATERIALS),
    new Tool('axe').setCompatibleWith(['mending', 'unbreaking', 'sharpness', 'looting'])
      .addCompatibleWith(...AppComponent.TOOLS_MATERIALS),
    new Tool('pickaxe').setCompatibleWith(['mending', 'unbreaking', 'sharpness', 'looting'])
      .addCompatibleWith(...AppComponent.TOOLS_MATERIALS),
    new Tool('helmet')
      .addCompatibleWith(...AppComponent.ARMOR_MATERIALS)
      .addCompatibleWith(...AppComponent.ARMOR_ENCHANTS,'respiration'),
    new Tool('chestplate')
      .addCompatibleWith(...AppComponent.ARMOR_MATERIALS)
      .addCompatibleWith(...AppComponent.ARMOR_ENCHANTS),
    new Tool('leggings')
      .addCompatibleWith(...AppComponent.ARMOR_MATERIALS)
      .addCompatibleWith(...AppComponent.ARMOR_ENCHANTS),
    new Tool('boots')
      .addCompatibleWith(...AppComponent.ARMOR_MATERIALS)
      .addCompatibleWith(...AppComponent.ARMOR_ENCHANTS,'feather_falling'),
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
    new Enchant('protection', 1, 256),
    new Enchant('projectile_protection', 1, 256),
    new Enchant('thorns', 1, 256),
    new Enchant('respiration', 1, 256),
    new Enchant('feather_falling', 1, 256),
    new Enchant('fire_aspect', 1, 256),
    new Enchant('knockback', 1, 256),
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
