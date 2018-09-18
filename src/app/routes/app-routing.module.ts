import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

/**
 * Components
 */
import { DriversComponent } from '../components/drivers/drivers.component'
import { DriversNewComponent } from '../components/drivers-new/drivers-new.component'
import { EquipmentsComponent } from '../components/equipments/equipments.component'
import { EquipmentsNewComponent } from '../components/equipments-new/equipments-new.component'
import { HomeComponent } from '../components/home/home.component'
import { LoginComponent } from '../components/login/login.component'
import { SupplyStationsComponent } from '../components/supply-stations/supply-stations.component'
import { SupplyStationsNewComponent } from '../components/supply-stations-new/supply-stations-new.component'

/**
 * Guards
 */
import { AuthGuard } from '../guards/auth.guard'

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'settings/drivers', component: DriversComponent },
  { path: 'settings/drivers/new', component: DriversNewComponent },
  { path: 'settings/equipments', component: EquipmentsComponent },
  { path: 'settings/equipments/new', component: EquipmentsNewComponent },
  { path: 'settings/stations', component: SupplyStationsComponent },
  { path: 'settings/stations/new', component: SupplyStationsNewComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
]

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule],
  declarations: []
})

export class AppRoutingModule { }
