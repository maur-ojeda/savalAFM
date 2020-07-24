import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

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
import { FixedassetcreateComponent } from './pages/fixedassetcreate/fixedassetcreate.component';
import { FixedassetdeleteComponent } from './pages/fixedassetdelete/fixedassetdelete.component';
import { FixedassetmoveComponent } from './pages/fixedassetmove/fixedassetmove.component';
import { FixedassetupdateComponent } from './pages/fixedassetupdate/fixedassetupdate.component';
import { FixedassetlistComponent } from './pages/fixedassetlist/fixedassetlist.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { Fixedassetcreate2Component } from './pages/fixedassetcreate2/fixedassetcreate2.component';
import { Fixedassetcreate3Component } from './pages/fixedassetcreate3/fixedassetcreate3.component';
import { Fixedassetcreate4Component } from './pages/fixedassetcreate4/fixedassetcreate4.component';
import { Fixedassetcreate5Component } from './pages/fixedassetcreate5/fixedassetcreate5.component';
import { Fixedassetcreate6Component } from './pages/fixedassetcreate6/fixedassetcreate6.component';
import { FixedassetComponent } from './pages/fixedasset/fixedasset.component';
import { FixedAssetPendingComponent } from './pages/fixed-asset-pending/fixed-asset-pending.component';
import { FixedAssetRejectedComponent } from './pages/fixed-asset-rejected/fixed-asset-rejected.component';
import { UserDeatailsComponent } from './pages/user-deatails/user-deatails.component';
import { HttpClientModule } from '@angular/common/http';




//firebase
import{AngularFireModule} from 'angularfire2';
import{AngularFireDatabaseModule} from 'angularfire2/database';

//services
import{FixedassetsService} from '../app/services/fixedassets.service'
import{FixedAssetDataService} from '../app/services/fixed-asset-data.service';
import { CreateComponent } from './pages/create/create.component'




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
    FixedassetcreateComponent,
    FixedassetdeleteComponent,
    FixedassetmoveComponent,
    FixedassetupdateComponent,
    FixedassetlistComponent,
    Fixedassetcreate2Component,
    Fixedassetcreate3Component,
    Fixedassetcreate4Component,
    Fixedassetcreate5Component,
    Fixedassetcreate6Component,
    FixedassetComponent,
    FixedAssetPendingComponent,
    FixedAssetRejectedComponent,
    UserDeatailsComponent,
    CreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
     FormsModule,
      AngularFireModule.initializeApp(environment.firebase),
      AngularFireDatabaseModule,
      ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
      HttpClientModule
  ],
  providers: [FixedassetsService, FixedAssetDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
