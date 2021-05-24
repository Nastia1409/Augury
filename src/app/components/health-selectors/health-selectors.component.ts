import { Component } from '@angular/core';
import { HealthType } from 'src/app/models/enums';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { HealthDataService } from 'src/app/services/health-data.service';

@Component({
  selector: 'app-health-selectors',
  templateUrl: './health-selectors.component.html',
  styleUrls: ['./health-selectors.component.scss']
})
export class HealthSelectorsComponent {
  selectorsData = new Array<{ text: string, color: string }>();

  constructor(
    healthDataService: HealthDataService,
    private configurationService: ConfigurationService
  ) {
    healthDataService.healthData$.subscribe(healthData => {
      for (const curr of Array.from(healthData.values())) {
        this.selectorsData.push(
          {
            text: this.healthSelectorTextFormat(curr.type, curr.amount),
            color: configurationService.getHealthColor(curr.type)
          }
        );
      }
    });
  }

  private healthSelectorTextFormat(type: HealthType, amount: number): string {
    return `${this.configurationService.getHealthText(type)} (${amount})`;
  }

}
