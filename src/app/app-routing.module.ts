import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SplashComponent } from './pages/splash/splash.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { UserDataComponent } from './pages/user-data/user-data.component';
import { ContactComponent } from './pages/contact/contact.component';
import { FixedAssetsComponent } from './pages/fixed-assets/fixed-assets.component';
import { FixedassetcreateComponent } from './pages/fixedassetcreate/fixedassetcreate.component';

import { Fixedassetcreate2Component } from './pages/fixedassetcreate2/fixedassetcreate2.component';
import { Fixedassetcreate3Component } from './pages/fixedassetcreate3/fixedassetcreate3.component';
import { Fixedassetcreate4Component } from './pages/fixedassetcreate4/fixedassetcreate4.component';
import { Fixedassetcreate5Component } from './pages/fixedassetcreate5/fixedassetcreate5.component';
import { Fixedassetcreate6Component } from './pages/fixedassetcreate6/fixedassetcreate6.component';

import { FixedassetmoveComponent } from './pages/fixedassetmove/fixedassetmove.component';
import { FixedassetdeleteComponent } from './pages/fixedassetdelete/fixedassetdelete.component';
import { FixedassetupdateComponent } from './pages/fixedassetupdate/fixedassetupdate.component';

const routes: Routes = [
  { path: '', component: SplashComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'userData', component: UserDataComponent },
  { path: 'fixedAssets', component: FixedAssetsComponent },
  { path: 'fixedAssetCreate', component: FixedassetcreateComponent },
  { path: 'fixedAssetCreate2', component: Fixedassetcreate2Component },
  { path: 'fixedAssetCreate3', component: Fixedassetcreate3Component },
  { path: 'fixedAssetCreate4', component: Fixedassetcreate4Component },
  { path: 'fixedAssetCreate5', component: Fixedassetcreate5Component },
  { path: 'fixedAssetCreate6', component: Fixedassetcreate6Component },
  { path: 'fixedAssetMove', component: FixedassetmoveComponent },
  { path: 'fixedAssetDelete', component: FixedassetdeleteComponent },
  { path: 'fixedAssetUpdate', component: FixedassetupdateComponent },
  { path: 'contact', component: ContactComponent }
  
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

