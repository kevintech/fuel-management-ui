import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

/**
 * Components
 */
import { LoginComponent } from '../components/login/login.component'
import { HomeComponent } from '../components/home/home.component'
import { DriversComponent } from '../components/drivers/drivers.component'
import { DriversNewComponent } from '../components/drivers-new/drivers-new.component'
import { DriversEditComponent } from '../components/drivers-edit/drivers-edit.component'
import { DriverBatchLoadComponent } from '../components/driver-batch-load/driver-batch-load.component'
import { EquipmentsComponent } from '../components/equipments/equipments.component'
import { EquipmentBatchLoadComponent } from '../components/equipment-batch-load/equipment-batch-load.component'
import { EquipmentNewComponent } from '../components/equipment-new/equipment-new.component'
import { EquipmentEditComponent } from '../components/equipment-edit/equipment-edit.component'
import { SupplyStationsComponent } from '../components/supply-stations/supply-stations.component'
import { SupplyStationBatchLoadComponent } from '../components/supply-station-batch-load/supply-station-batch-load.component'
import { SupplyStationsNewComponent } from '../components/supply-stations-new/supply-stations-new.component'
import { SupplyStationsEditComponent } from '../components/supply-stations-edit/supply-stations-edit.component'
import { FuelEntryComponent } from '../components/fuel-entry/fuel-entry.component'
import { FuelEntryNewComponent } from '../components/fuel-entry-new/fuel-entry-new.component'
import { FuelEntryEditComponent } from '../components/fuel-entry-edit/fuel-entry-edit.component'
import { OilEntryComponent } from '../components/oil-entry/oil-entry.component';
import { OilEntryNewComponent } from '../components/oil-entry-new/oil-entry-new.component';
import { OilEntryEditComponent } from '../components/oil-entry-edit/oil-entry-edit.component';
import { FuelEntryReportComponent } from '../components/fuel-entry-report/fuel-entry-report.component';

/**
 * Guards
 */
import { AuthGuard } from '../guards/auth.guard'

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'settings/drivers', component: DriversComponent, canActivate: [AuthGuard] },
  { path: 'settings/drivers/new', component: DriversNewComponent, canActivate: [AuthGuard] },
  { path: 'settings/drivers/:id', component: DriversEditComponent, canActivate: [AuthGuard] },
  { path: 'settings/drivers/load', component: DriverBatchLoadComponent, canActivate: [AuthGuard] },
  { path: 'settings/equipments', component: EquipmentsComponent, canActivate: [AuthGuard] },
  { path: 'settings/equipment/new', component: EquipmentNewComponent, canActivate: [AuthGuard] },
  { path: 'settings/equipment/load', component: EquipmentBatchLoadComponent, canActivate: [AuthGuard] },
  { path: 'settings/equipment/:id', component: EquipmentEditComponent, canActivate: [AuthGuard] },
  { path: 'settings/stations', component: SupplyStationsComponent, canActivate: [AuthGuard] },
  { path: 'settings/stations/new', component: SupplyStationsNewComponent, canActivate: [AuthGuard] },
  { path: 'settings/stations/load', component: SupplyStationBatchLoadComponent, canActivate: [AuthGuard] },
  { path: 'settings/stations/:id', component: SupplyStationsEditComponent, canActivate: [AuthGuard] },
  { path: 'entries/fuel', component: FuelEntryComponent, canActivate: [AuthGuard] },
  { path: 'entries/fuel/new', component: FuelEntryNewComponent, canActivate: [AuthGuard] },
  { path: 'entries/fuel/:id', component: FuelEntryEditComponent, canActivate: [AuthGuard] },
  { path: 'entries/oil', component: OilEntryComponent, canActivate: [AuthGuard] },
  { path: 'entries/oil/new', component: OilEntryNewComponent, canActivate: [AuthGuard] },
  { path: 'entries/oil/:id', component: OilEntryEditComponent, canActivate: [AuthGuard] },
  { path: 'reports/fuel', component: FuelEntryReportComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'home' }
]

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule],
  declarations: []
})

export class AppRoutingModule { }
