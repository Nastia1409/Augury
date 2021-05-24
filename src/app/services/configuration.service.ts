import { Injectable } from '@angular/core';
import { HealthType } from '../models/enums';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  getHealthColor(healthType: HealthType): string {
    switch (healthType) {
      case HealthType.ACCEPTABLE:
        return 'green';
      case HealthType.ALARM:
        return 'orange';
      case HealthType.DANGER:
        return 'red';
      case HealthType.MONITOR:
        return 'limegreen';
      case HealthType.NO_STATUS:
        return 'gray';
    }
  }

  // export to translation file
  getHealthText(healthType: HealthType): string {
    switch (healthType) {
      case HealthType.ACCEPTABLE:
        return 'Acceptable';
      case HealthType.ALARM:
        return 'Alarm';
      case HealthType.DANGER:
        return 'Danger';
      case HealthType.MONITOR:
        return 'Monitor';
      case HealthType.NO_STATUS:
        return 'no status';
    }
  }

  getHealthTypeByAverage(average: number): HealthType {
    if (average > 100)
      return HealthType.ACCEPTABLE;
    if (average > 10)
      return HealthType.MONITOR;
    if (average > 1)
      return HealthType.ALARM;
    if (average > 0)
      return HealthType.DANGER;

    return HealthType.NO_STATUS;
  }
}
