import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

/**
 * Components
 */
import { DriversComponent } from '../components/drivers/drivers.component'
import { DriversNewComponent } from '../components/drivers-new/drivers-new.component'
import { DriversEditComponent } from '../components/drivers-edit/drivers-edit.component'
import { EquipmentsComponent } from '../components/equipments/equipments.component'
import { EquipmentNewComponent } from '../components/equipment-new/equipment-new.component'
import { EquipmentEditComponent } from '../components/equipment-edit/equipment-edit.component'
import { HomeComponent } from '../components/home/home.component'
import { LoginComponent } from '../components/login/login.component'
import { SupplyStationsComponent } from '../components/supply-stations/supply-stations.component'
import { SupplyStationsNewComponent } from '../components/supply-stations-new/supply-stations-new.component'
import { SupplyStationsEditComponent } from '../components/supply-stations-edit/supply-stations-edit.component'

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
  { path: 'settings/equipments', component: EquipmentsComponent, canActivate: [AuthGuard] },
  { path: 'settings/equipment/new', component: EquipmentNewComponent, canActivate: [AuthGuard] },
  { path: 'settings/equipment/:id', component: EquipmentEditComponent, canActivate: [AuthGuard] },
  { path: 'settings/stations', component: SupplyStationsComponent, canActivate: [AuthGuard] },
  { path: 'settings/stations/new', component: SupplyStationsNewComponent, canActivate: [AuthGuard] },
  { path: 'settings/stations/:id', component: SupplyStationsEditComponent, canActivate: [AuthGuard] },
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
