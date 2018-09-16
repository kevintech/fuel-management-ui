import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

/**
 * Components
 */
import { LoginComponent } from '../components/login/login.component'
import { HomeComponent } from '../components/home/home.component'
import { SupplyStationsComponent } from '../components/supply-stations/supply-stations.component'
import { EquipmentsComponent } from '../components/equipments/equipments.component'
import { EquipmentsNewComponent } from '../components/equipments-new/equipments-new.component'
import { DriversComponent } from '../components/drivers/drivers.component'

/**
 * Guards
 */
import { AuthGuard } from '../guards/auth.guard'

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'settings/stations', component: SupplyStationsComponent },
  { path: 'settings/equipments', component: EquipmentsComponent },
  { path: 'settings/equipments/new', component: EquipmentsNewComponent },
  { path: 'settings/drivers', component: DriversComponent },
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
