import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { SupplyStationService } from '../../services/supply-station/supply-station.service';
import { SupplyStation } from '../../models/supply-station/supply-station.model';

@Component({
  selector: 'app-supply-stations-edit',
  templateUrl: './supply-stations-edit.component.html',
  styleUrls: ['./supply-stations-edit.component.css']
})
export class SupplyStationsEditComponent implements OnInit {
  private stationForm: FormGroup;
  private error = false;
  private submitted = false;
  private id: string;
  private station: Observable<SupplyStation>;

  constructor(
    private stationService: SupplyStationService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.stationForm = this.formBuilder.group({
      code: ['', [Validators.required]],
      description: ['', [Validators.required]],
      address: ['', []],
      phone: ['', [Validators.required]],
      status: ['', [Validators.required]]
    });

    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.loadData();
    })
  }

  get f() {
    return this.stationForm.controls;
  }

  private loadData() {
    this.station = this.stationService.get(this.id);
    this.station.subscribe(data => {
      console.log(data);
      this.stationForm.setValue({...data, status: 1});
    });
  }

}
