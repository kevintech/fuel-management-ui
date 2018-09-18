import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { DriverService } from '../../services/driver/driver.service'
import { Driver } from '../../models/driver/driver.model'

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.css']
})
export class DriversComponent implements OnInit {
  public driverItems: Observable<Driver[]>

  constructor(private driverService: DriverService) { }

  ngOnInit() {
    this.driverItems = this.driverService.getAll()
  }

}
