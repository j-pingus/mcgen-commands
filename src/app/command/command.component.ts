import {Component, OnInit} from '@angular/core';
import {Enchant, Thing} from "../model/model";
import {RichText} from "../rich-editor/rich-editor.component";
import {Clipboard} from "@angular/cdk/clipboard";

@Component({
  selector: 'command',
  templateUrl: './command.component.html',
  styleUrls: ['./command.component.css']
})
export class CommandComponent implements OnInit {
  tool: Thing | null = null;
  material: Thing | null = null;
  enchants: Enchant[] = [];
  display: RichText | null = null;
  lore: RichText | null = null;
  unbreakable = false;
  public command = "/give";

  constructor(private clipboard:Clipboard) {
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
    if ($event != null && $event.length > 0) {
      this.material = $event[0];
    } else {
      this.material = null;
    }
    this.computeCommand();
  }

  setDisplay($event: RichText) {
    this.display = $event;
    this.computeCommand();
  }

  setLore($event: RichText) {
    this.lore = $event;
    this.computeCommand();
  }

  computeText(richText: RichText): string {
    var ret = "{\"text\":\"" +
      richText.text +
      "\"";
    if (richText.color != null) {
      ret += ",\"color\":\"" +
        richText.color +
        "\"";
    }
    ret += "}";
    return ret;
  }

  setUnbreakable($event: boolean) {
    this.unbreakable = $event;
    this.computeCommand();
  }

  private computeCommand() {
    this.command = "/give @p ";
    if (this.material) {
      this.command += this.material?.id;
      this.command += "_";
    }
    this.command += this.tool?.id;
    var extra = false;
    this.command += "{ ";
    if (this.unbreakable) {
      extra = true;
      this.command += "Unbreakable:1";
    }
    if (this.enchants.length > 0) {
      if (extra) {
        this.command += ",";
      }
      extra = true;
      this.command += "Enchantments:[";
      this.command +=
        this.enchants.map(enchant => {
          return "{ id:" + enchant.id + " ,lvl:" + enchant.actual + "}";
        }).join(', ');
      this.command += "]";

    }
    if (this.lore != null || this.display != null) {
      if (extra) {
        this.command += ","
      }
      extra = true;
      this.command += "display:{";
      if (this.display != null) {
        this.command += "Name:'[" + this.computeText(this.display) + "]'";
      }
      if (this.display != null && this.lore != null) {
        this.command += ",";
      }
      if (this.lore != null) {
        this.command += "Lore:'[" + this.computeText(this.lore) + "]'";
      }
      this.command += "}";
    }
    this.command += "} 1";
    this.clipboard.copy(this.command);
  }
}
