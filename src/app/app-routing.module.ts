import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SplashComponent } from './pages/splash/splash.component';// no debe ir
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
import { FixedassetComponent } from './pages/fixedasset/fixedasset.component';
import { FixedAssetPendingComponent } from './pages/fixed-asset-pending/fixed-asset-pending.component';
import { FixedAssetRejectedComponent } from './pages/fixed-asset-rejected/fixed-asset-rejected.component';
import { CreateComponent } from './pages/create/create.component';
import { FixedAssetApprovedComponent } from './pages/fixed-asset-approved/fixed-asset-approved.component';
import { FixedAssetClosedComponent } from './pages/fixed-asset-closed/fixed-asset-closed.component';
import { RequestsComponent } from './pages/requests/requests.component';

//import { UsersService } from './services/user.service';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', component : LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'userData', component: UserDataComponent, canActivate: [AuthGuard]},
  //listado
  { path: 'fixedAssets', component: FixedAssetsComponent, canActivate: [AuthGuard] },
  //individual
  { path: 'fixedAsset/:id', component: FixedassetComponent, canActivate: [AuthGuard] },
  { path: 'fixedAssetMove/:id', component: FixedassetComponent, canActivate: [AuthGuard] },
  { path: 'fixedAssetDelete/:id', component: FixedassetComponent, canActivate: [AuthGuard] },
  { path: 'fixedAssetUpdate/:id', component: FixedassetComponent, canActivate: [AuthGuard] },
  
  { path: 'create', component: CreateComponent, canActivate: [AuthGuard] },
  { path: 'fixedAssetCreate', component: FixedassetcreateComponent },
  { path: 'fixedAssetCreate2', component: Fixedassetcreate2Component },
  { path: 'fixedAssetCreate3', component: Fixedassetcreate3Component },
  { path: 'fixedAssetCreate4', component: Fixedassetcreate4Component },
  { path: 'fixedAssetCreate5', component: Fixedassetcreate5Component },
  { path: 'fixedAssetCreate6', component: Fixedassetcreate6Component },
  
  { path: 'contact', component: ContactComponent },

  { path: 'request', component: RequestsComponent, canActivate: [AuthGuard] },
  
  { path: 'fixedAssetPending/:id', component: FixedAssetPendingComponent, canActivate: [AuthGuard] },
  { path: 'fixedAssetReject/:id', component: FixedAssetRejectedComponent, canActivate: [AuthGuard] },
  { path: 'fixedAssetApproved/:id', component: FixedAssetApprovedComponent, canActivate: [AuthGuard] },
  { path: 'fixedAssetClosed/:id', component: FixedAssetClosedComponent, canActivate: [AuthGuard] }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

