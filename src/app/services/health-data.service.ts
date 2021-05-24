import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DataService } from './data.service';
import { HealthDataModel } from '../models/health-data.model';
import { MachineDataModel } from '../models/machine-data.model';
import { HealthType } from '../models/enums';
import { ConfigurationService } from './configuration.service';
import { CalculationsService } from './calculations.service';

@Injectable({
  providedIn: 'root'
})
export class HealthDataService {
  private healthDataMapper$ = new BehaviorSubject<Map<HealthType, HealthDataModel>>(new Map());

  constructor(
    dataService: DataService,
    configurationService: ConfigurationService,
    calculationsService: CalculationsService
  ) {
    dataService.machinesData$.subscribe(machineData => {
      const healthToMachineMapper = new Map<string, MachineDataModel[]>();
      for (let item in HealthType) {
        if (isNaN(Number(item))) {
          healthToMachineMapper.set(item, []);
        }
      }

      let healthType;
      for (const currMachineData of Array.from(machineData.values())) {
        healthType = configurationService.getHealthTypeByAverage(currMachineData.average);
        healthToMachineMapper.get(HealthType[healthType]).push(currMachineData);
      }

      const healthData = this.healthDataMapper$.value;
      for (const [key, value] of healthToMachineMapper.entries()) {
        healthData.set(HealthType[key], {
          amount: value.length,
          average: calculationsService.calcAverage(value.map(curr => curr.average)),
          type: HealthType[key]
        });
      }

      this.healthDataMapper$.next(healthData);

    });
  }

  get healthData$(): Observable<Map<HealthType, HealthDataModel>> {
    return this.healthDataMapper$.asObservable();
  }

}
