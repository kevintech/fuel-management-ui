import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

/**
 * Routes
 */
import { AppRoutingModule } from './routes/app-routing.module'

/**
 * Components
 */
import { AppComponent } from './components/main/app.component'
import { LoginComponent } from './components/login/login.component'
import { HeaderComponent } from './components/header/header.component'
import { HomeComponent } from './components/home/home.component'
import { DriversComponent } from './components/drivers/drivers.component'
import { DriversNewComponent } from './components/drivers-new/drivers-new.component'
import { DriversEditComponent } from './components/drivers-edit/drivers-edit.component'
import { DriverBatchLoadComponent } from './components/driver-batch-load/driver-batch-load.component'
import { EquipmentsComponent } from './components/equipments/equipments.component'
import { EquipmentNewComponent } from './components/equipment-new/equipment-new.component'
import { EquipmentEditComponent } from './components/equipment-edit/equipment-edit.component'
import { SupplyStationsComponent } from './components/supply-stations/supply-stations.component'
import { SupplyStationsNewComponent } from './components/supply-stations-new/supply-stations-new.component'
import { SupplyStationsEditComponent } from './components/supply-stations-edit/supply-stations-edit.component'
import { FuelEntryComponent } from './components/fuel-entry/fuel-entry.component'
import { FuelEntryNewComponent } from './components/fuel-entry-new/fuel-entry-new.component'
import { FuelEntryEditComponent } from './components/fuel-entry-edit/fuel-entry-edit.component'
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component'

/**
 * Services
 */
import { AuthenticationService } from './services/authentication/authentication.service'
import { DriverService } from './services/driver/driver.service'
import { EquipmentService } from './services/equipment/equipment.service'
import { SupplyStationService } from './services/supply-station/supply-station.service'
import { UserService } from './services/user/user.service'
import { FuelEntryService } from './services/fuel-entry/fuel-entry.service'
import { ConfirmationDialogService } from './components/confirmation-dialog/confirmation-dialog.service'

/**
 * Guards
 */
import { AuthGuard } from './guards/auth.guard'

/**
 * App configuration
 */
import { AppConfig } from './config/app.config'

/**
 * Dependencies
 */
import { AngularFireModule } from 'angularfire2'
import { AngularFirestoreModule } from 'angularfire2/firestore'
import { AngularFireAuthModule } from 'angularfire2/auth'
import { NotifierModule } from 'angular-notifier'
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    HomeComponent,
    DriversComponent,
    DriversNewComponent,
    DriversEditComponent,
    DriverBatchLoadComponent,
    EquipmentsComponent,
    EquipmentNewComponent,
    EquipmentEditComponent,
    SupplyStationsComponent,
    SupplyStationsNewComponent,
    SupplyStationsEditComponent,
    ConfirmationDialogComponent,
    FuelEntryComponent,
    FuelEntryNewComponent,
    FuelEntryEditComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(AppConfig.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    NgxSpinnerModule,
    NotifierModule.withConfig({
      position: {
        horizontal: {
          position: 'left'
        }
      },
      behaviour: {
        autoHide: 3000,
        showDismissButton: false
      }
    }),
  ],
  providers: [
    AuthenticationService,
    DriverService,
    EquipmentService,
    SupplyStationService,
    UserService,
    FuelEntryService,
    ConfirmationDialogService,
    AuthGuard
  ],
  entryComponents: [
    ConfirmationDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
