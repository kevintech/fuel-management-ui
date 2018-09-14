import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SupplyStationsComponent } from './supply-stations/supply-stations.component';
import { EquipmentsComponent } from './equipments/equipments.component';
import { EquipmentsNewComponent } from './equipments-new/equipments-new.component';
import { DriversComponent } from './drivers/drivers.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'settings/stations', component: SupplyStationsComponent },
  { path: 'settings/equipments', component: EquipmentsComponent },
  { path: 'settings/equipments/new', component: EquipmentsNewComponent },
  { path: 'settings/drivers', component: DriversComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
