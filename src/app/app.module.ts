import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/**
 * Routes
 */
import { AppRoutingModule } from './routes/app-routing.module';

/**
 * Components
 */
import { AppComponent } from './components/main/app.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { DriversComponent } from './components/drivers/drivers.component';
import { DriverBatchLoadComponent } from './components/driver-batch-load/driver-batch-load.component';
import { DriversNewComponent } from './components/drivers-new/drivers-new.component';
import { DriversEditComponent } from './components/drivers-edit/drivers-edit.component'
import { EquipmentsComponent } from './components/equipments/equipments.component';
import { EquipmentBatchLoadComponent } from './components/equipment-batch-load/equipment-batch-load.component';
import { EquipmentNewComponent } from './components/equipment-new/equipment-new.component';
import { EquipmentEditComponent } from './components/equipment-edit/equipment-edit.component';
import { SupplyStationBatchLoadComponent } from './components/supply-station-batch-load/supply-station-batch-load.component';
import { SupplyStationsComponent } from './components/supply-stations/supply-stations.component';
import { SupplyStationsNewComponent } from './components/supply-stations-new/supply-stations-new.component';
import { SupplyStationsEditComponent } from './components/supply-stations-edit/supply-stations-edit.component';
import { FuelEntryComponent } from './components/fuel-entry/fuel-entry.component';
import { FuelEntryNewComponent } from './components/fuel-entry-new/fuel-entry-new.component';
import { FuelEntryEditComponent } from './components/fuel-entry-edit/fuel-entry-edit.component';
import { FuelEntryDetailComponent } from './components/fuel-entry-detail/fuel-entry-detail.component';
import { FuelEntryDetailNewComponent } from './components/fuel-entry-detail-new/fuel-entry-detail-new.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { OilEntryComponent } from './components/oil-entry/oil-entry.component';
import { OilEntryNewComponent } from './components/oil-entry-new/oil-entry-new.component';
import { OilEntryEditComponent } from './components/oil-entry-edit/oil-entry-edit.component';
import { FuelEntryReportComponent } from './components/fuel-entry-report/fuel-entry-report.component';

/**
 * Services
 */
import { AuthenticationService } from './services/authentication/authentication.service';
import { DriverService } from './services/driver/driver.service';
import { EquipmentService } from './services/equipment/equipment.service';
import { SupplyStationService } from './services/supply-station/supply-station.service';
import { UserService } from './services/user/user.service';
import { FuelEntryService } from './services/fuel-entry/fuel-entry.service';
import { ConfirmationDialogService } from './components/confirmation-dialog/confirmation-dialog.service';
import { ExcelDataReaderService } from './services/excel-data-reader/excel-data-reader.service';
import { OilEntryService } from './services/oil-entry/oil-service.service';

/**
 * Guards
 */
import { AuthGuard } from './guards/auth.guard';

/**
 * App configuration
 */
import { AppConfig } from './config/app.config';

/**
 * Dependencies
 */
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { NotifierModule } from 'angular-notifier';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

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
    DriversEditComponent,
    DriverBatchLoadComponent,
    EquipmentBatchLoadComponent,
    SupplyStationBatchLoadComponent,
    FuelEntryComponent,
    FuelEntryNewComponent,
    FuelEntryEditComponent,
    FuelEntryDetailComponent,
    FuelEntryDetailNewComponent,
    OilEntryComponent,
    OilEntryNewComponent,
    OilEntryEditComponent,
    FuelEntryReportComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(AppConfig.firebase),
    AngularFirestoreModule.enablePersistence(),
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
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    AuthenticationService,
    DriverService,
    EquipmentService,
    SupplyStationService,
    UserService,
    FuelEntryService,
    ConfirmationDialogService,
    ExcelDataReaderService,
    OilEntryService,
    AuthGuard
  ],
  entryComponents: [
    ConfirmationDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
