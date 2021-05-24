import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-selector-button',
  templateUrl: './selector-button.component.html',
  styleUrls: ['./selector-button.component.scss']
})
export class SelectorButtonComponent {
  @Input() color: string;
  @Input() text: string;
}
