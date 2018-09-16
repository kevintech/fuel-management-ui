import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

/**
 * Components
 */
import { AppComponent } from './app.component'
import { LoginComponent } from './login/login.component'
import { AppRoutingModule } from './/app-routing.module'
import { HomeComponent } from './home/home.component'
import { HeaderComponent } from './header/header.component'
import { SupplyStationsComponent } from './supply-stations/supply-stations.component'
import { EquipmentsComponent } from './equipments/equipments.component'
import { DriversComponent } from './drivers/drivers.component'
import { EquipmentsNewComponent } from './equipments-new/equipments-new.component'

/**
 * Services
 */
import { AuthenticationService } from './services/authentication/authentication.service'

/**
 * App configuration
 */
import { AppConfig } from './app-config/app.config'

/**
 * Dependencies
 */
import { AngularFireModule } from 'angularfire2'
import { AngularFirestoreModule } from 'angularfire2/firestore'
import { AngularFireAuthModule } from 'angularfire2/auth'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    SupplyStationsComponent,
    EquipmentsComponent,
    DriversComponent,
    EquipmentsNewComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(AppConfig.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
