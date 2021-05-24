import { HealthType } from "./enums";

export interface HealthDataModel {
    type: HealthType;
    average: number;
    amount: number;
}