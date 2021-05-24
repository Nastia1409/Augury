import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

import { MachineDataModel } from '../models/machine-data.model';
import { CalculationsService } from './calculations.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private machineDataMapper$ = new BehaviorSubject<Map<string, MachineDataModel>>(new Map());

  constructor(calculationsService: CalculationsService) {
    this.getDataFromServerMock().subscribe(data => {
      const mapperValue = this.machineDataMapper$.value;
      for (let curr of data) {
        curr.average = calculationsService.calcAverage(curr.vibrations);
        console.log(curr.average);
        mapperValue.set(curr.machineName, curr);
      }

      this.machineDataMapper$.next(mapperValue);
    });
  }

  get machinesData$(): Observable<Map<string, MachineDataModel>> {
    return this.machineDataMapper$.asObservable();
  }


  getDataFromServerMock(): Observable<MachineDataModel[]> {
    return of([
      { machineName: 'machine1', vibrations: [1, 2, 3, 4, 5, 6, 7] },
      { machineName: 'machine2', vibrations: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7] },
      { machineName: 'machine3', vibrations: [10, 20, 30, 40, 50, 60, 70] },
      { machineName: 'machine4', vibrations: [1, 2, 3, 4, 5, 6, 7] }]);
  }
}

