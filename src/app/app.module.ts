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
import { HomeComponent } from './components/home/home.component'
import { HeaderComponent } from './components/header/header.component'
import { SupplyStationsComponent } from './components/supply-stations/supply-stations.component'
import { EquipmentsComponent } from './components/equipments/equipments.component'
import { DriversComponent } from './components/drivers/drivers.component'
import { EquipmentsNewComponent } from './components/equipments-new/equipments-new.component'

/**
 * Services
 */
import { AuthenticationService } from './services/authentication/authentication.service'
import { UserService } from './services/user/user.service'

/**
 * Guards
 */
import { AuthGuard } from './guards/auth.guard'

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
    AuthenticationService,
    UserService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
