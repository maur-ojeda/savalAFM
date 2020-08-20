import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//import { FormsModule } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { SplashComponent } from './pages/splash/splash.component';
import { LoginComponent } from './pages/login/login.component';
import { UserDataComponent } from './pages/user-data/user-data.component';
import { FixedAssetsComponent } from './pages/fixed-assets/fixed-assets.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HomeComponent } from './pages/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { FixedassetdeleteComponent } from './pages/fixedassetdelete/fixedassetdelete.component';
import { FixedassetmoveComponent } from './pages/fixedassetmove/fixedassetmove.component';
import { FixedassetupdateComponent } from './pages/fixedassetupdate/fixedassetupdate.component';
import { FixedassetlistComponent } from './pages/fixedassetlist/fixedassetlist.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { FixedassetComponent } from './pages/fixedasset/fixedasset.component';
import { FixedAssetPendingComponent } from './pages/fixed-asset-pending/fixed-asset-pending.component';
import { FixedAssetRejectedComponent } from './pages/fixed-asset-rejected/fixed-asset-rejected.component';
import { UserDeatailsComponent } from './pages/user-deatails/user-deatails.component';
import { HttpClientModule } from '@angular/common/http';
//cookie
import { CookieService } from 'ngx-cookie-service';
//firebase
import{AngularFireModule} from 'angularfire2';
import{AngularFireDatabaseModule} from 'angularfire2/database';
//services
import { CreateComponent } from './pages/create/create.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FixedAssetApprovedComponent } from './pages/fixed-asset-approved/fixed-asset-approved.component';
import { FixedAssetClosedComponent } from './pages/fixed-asset-closed/fixed-asset-closed.component';
import { RequestsComponent } from './pages/requests/requests.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//Material
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTableModule} from '@angular/material/table';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';




import { OpenFixedassetComponent } from './dialogs/open-fixedasset/open-fixedasset.component';
import { MoveFixedassetComponent } from './dialogs/move-fixedasset/move-fixedasset.component';
import { DownFixedassetComponent } from './dialogs/down-fixedasset/down-fixedasset.component';
import { NoRegisterComponent } from './dialogs/no-register/no-register.component';

import { AuthGuard } from './auth.guard';
import { CreateErrorComponent } from './dialogs/create-error/create-error.component';
import { CreateOkComponent } from './dialogs/create-ok/create-ok.component';
import { UpdateOkComponent } from './dialogs/update-ok/update-ok.component';
import { UpdateErrorComponent } from './dialogs/update-error/update-error.component';
import { MoveErrorComponent } from './dialogs/move-error/move-error.component';
import { MoveOkComponent } from './dialogs/move-ok/move-ok.component';
import { DeleteOkComponent } from './dialogs/delete-ok/delete-ok.component';
import { DeleteErrorComponent } from './dialogs/delete-error/delete-error.component';
import { LogoutComponent } from './dialogs/logout/logout.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { DeleteConfirmationComponent } from './dialogs/delete-confirmation/delete-confirmation.component';
import { MoveConfirmationComponent } from './dialogs/move-confirmation/move-confirmation.component';
import { UpdateConfirmationComponent } from './dialogs/update-confirmation/update-confirmation.component';
import { CreateConfirmationComponent } from './dialogs/create-confirmation/create-confirmation.component';
import { LoginErrorComponent } from './dialogs/login-error/login-error.component';
import { WarningComponent } from './dialogs/warning/warning.component';


@NgModule({
  declarations: [
    AppComponent,
    SplashComponent,
    LoginComponent,
    UserDataComponent,
    FixedAssetsComponent,
    ContactComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    FixedassetdeleteComponent,
    FixedassetmoveComponent,
    FixedassetupdateComponent,
    FixedassetlistComponent,
    FixedassetComponent,
    FixedAssetPendingComponent,
    FixedAssetRejectedComponent,
    UserDeatailsComponent,
    CreateComponent,
    FixedAssetApprovedComponent,
    FixedAssetClosedComponent,
    RequestsComponent,
    OpenFixedassetComponent,
    MoveFixedassetComponent,
    DownFixedassetComponent,
    NoRegisterComponent,
    CreateErrorComponent,
    CreateOkComponent,
    UpdateOkComponent,
    UpdateErrorComponent,
    MoveErrorComponent,
    MoveOkComponent,
    DeleteOkComponent,
    DeleteErrorComponent,
    LogoutComponent,
    DeleteConfirmationComponent,
    MoveConfirmationComponent,
    UpdateConfirmationComponent,
    CreateConfirmationComponent,
    LoginErrorComponent,
    WarningComponent 
  ],
  imports: [
    MatSnackBarModule,
    BrowserModule,
    AppRoutingModule,
     FormsModule,
     ReactiveFormsModule,
      AngularFireModule.initializeApp(environment.firebase),
      AngularFireDatabaseModule,
      ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
      HttpClientModule,
      NgbModule,
      BrowserAnimationsModule,
      MatInputModule,
      MatFormFieldModule,
      MatButtonModule,
      MatCardModule,
      MatButtonToggleModule,
      MatDialogModule,
      MatProgressSpinnerModule,
      MatTableModule,
      MatExpansionModule,
      MatCheckboxModule,
      MatSelectModule,
      MatIconModule
      
  ],
  entryComponents:[ OpenFixedassetComponent],
  providers: [ CookieService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
