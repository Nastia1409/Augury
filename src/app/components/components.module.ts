import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectorButtonComponent } from './selector-button/selector-button.component';
import { HealthSelectorsComponent } from './health-selectors/health-selectors.component';



@NgModule({
  declarations: [SelectorButtonComponent, HealthSelectorsComponent],
  imports: [
    CommonModule
  ],
  exports: [
    SelectorButtonComponent,
    HealthSelectorsComponent
  ]
})
export class ComponentsModule { }
