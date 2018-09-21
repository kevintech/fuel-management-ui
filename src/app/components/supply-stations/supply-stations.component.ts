import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SupplyStationService } from '../../services/supply-station/supply-station.service';
import { SupplyStation } from '../../models/supply-station/supply-station.model';

@Component({
  selector: 'app-supply-stations',
  templateUrl: './supply-stations.component.html',
  styleUrls: ['./supply-stations.component.css']
})
export class SupplyStationsComponent implements OnInit {
  public stationItems: Observable<SupplyStation[]>;

  constructor(private stationService: SupplyStationService) { }

  ngOnInit() {
    this.stationItems = this.stationService.getAll();
  }
}
