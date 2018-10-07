import { Driver } from '../driver/driver.model';
import { Department } from '../../config/department.enum';

export class FuelEntryDetail {
    kilometers: number;
    plate: string;
    department: Department;
    amount: number;
    driver: Driver;
    signedBy: string;
}
