import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//import { SplashComponent } from './pages/splash/splash.component';// no debe ir
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { UserDataComponent } from './pages/user-data/user-data.component';
import { ContactComponent } from './pages/contact/contact.component';

import { FixedAssetsComponent } from './pages/fixed-assets/fixed-assets.component';

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


////
import {AssetDetailsComponent} from './pages/asset-details/asset-details.component';


//import { UsersService } from './services/user.service';
import { AuthGuard } from './auth.guard';
//import { MoveFixedassetComponent } from './dialogs/move-fixedasset/move-fixedasset.component';

const routes: Routes = [

 
  { path: '', component : LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: FixedAssetsComponent, canActivate: [AuthGuard] },
  { path: 'userData', component: UserDataComponent, canActivate: [AuthGuard]},
  //listado
  { path: 'fixedAssets', component: FixedAssetsComponent, canActivate: [AuthGuard] },
  
  
  //individual
  { path: 'fixedAsset/:id', component: AssetDetailsComponent },


  { path: 'fixedAssetMove/:id', component: FixedassetmoveComponent, canActivate: [AuthGuard] },
  
  { path: 'fixedAssetUpdate/:id', component: FixedassetupdateComponent, canActivate: [AuthGuard] },


//todo: aqui estoy
{ path: 'fixedAssetDelete/:id', component: FixedassetdeleteComponent, canActivate: [AuthGuard] },



  
 
  //FixedassetmoveComponent


  { path: 'create', component: CreateComponent, canActivate: [AuthGuard] },  
  { path: 'contact', component: ContactComponent },
  { path: 'request', component: RequestsComponent, canActivate: [AuthGuard] },
  { path: 'fixedAssetPending/:id', component: FixedAssetPendingComponent, canActivate: [AuthGuard] },
  { path: 'fixedAssetReject/:id', component: FixedAssetRejectedComponent, canActivate: [AuthGuard] },
  { path: 'fixedAssetApproved/:id', component: FixedAssetApprovedComponent, canActivate: [AuthGuard] },
  { path: 'fixedAssetClosed/:id', component: FixedAssetClosedComponent, canActivate: [AuthGuard] }
]

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})

export class AppRoutingModule { }

