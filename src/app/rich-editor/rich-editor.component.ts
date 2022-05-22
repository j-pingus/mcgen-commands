import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ThemePalette} from "@angular/material/core";
import {FormControl, Validators} from "@angular/forms";

export interface RichText {
  text: string;
  color: string;
}

@Component({
  selector: 'rich-editor',
  templateUrl: './rich-editor.component.html',
  styleUrls: ['./rich-editor.component.css']
})
export class RichEditorComponent implements OnInit {

  public colorPalette: ThemePalette = 'primary';
  public text: string = '';
  colorCtr: FormControl = new FormControl(null, [Validators.required]);

  @Input()
  name: string = '';
  @Output()
  textChanged = new EventEmitter<RichText>();

  constructor() {
  }

  ngOnInit(): void {
  }

  changed() {
    this.textChanged.next({text: this.text, color: this.colorCtr.value});
  }
}
