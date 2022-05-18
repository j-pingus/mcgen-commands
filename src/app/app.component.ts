import {Component, OnInit} from '@angular/core';
import {Enchant, Material, Tool} from "./model/model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'mcgen-commands';
  public tools: Tool[] = [
    new Tool('stick'),
    new Tool('sword')
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
    new Enchant('unbreaking', 1, 50),
    new Enchant('sharpness', 1, 50),
    new Enchant('looting', 1, 50),
  ];

  ngOnInit(): void {
  }

}
