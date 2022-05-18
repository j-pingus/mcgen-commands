import {Component, OnInit} from '@angular/core';
import {Enchant, Thing} from "../model/model";

@Component({
  selector: 'command',
  templateUrl: './command.component.html',
  styleUrls: ['./command.component.css']
})
export class CommandComponent implements OnInit {
  tool: Thing | null = null;
  material: Thing | null = null;
  enchants: Enchant[] = [];
  public command = "/give";

  constructor() {
  }

  ngOnInit(): void {
  }

  setTool($event: Thing[]) {
    this.tool = $event[0];
    this.computeCommand();
  }

  setEnchants($event: any[]) {
    this.enchants = $event;
    this.computeCommand();
  }

  setMaterial($event: Thing[]) {
    this.material = $event[0];
    this.computeCommand();
  }

  private computeCommand() {
    this.command = "/give @p ";
    this.command += this.material?.id;
    this.command += "_";
    this.command += this.tool?.id;
    this.command += "{ ";
    if (this.enchants.length > 0) {
      this.command += "Enchantments:[";
      this.command +=
        this.enchants.map(enchant => {
          return "{ id:" + enchant.id + " ,lvl:" + enchant.actual + "}";
        }).join(', ');
      this.command += "]";

    }
    this.command += "} 1";
  }
}
