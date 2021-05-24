import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculationsService {

  calcAverage(values: number[]): number {
    if (values.length == 0) {
      return 0;
    }

    return values.reduce((prevValue, currValue) => prevValue + currValue) / values.length;

  }
}
