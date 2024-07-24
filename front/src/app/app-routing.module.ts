import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";
import {RequestComponent} from "./request/request.component";
import {ProfileComponent} from "./profile/profile.component";
import {UpdateProfileComponent} from "./update-profile/update-profile.component";
import {HistoryComponent} from "./history/history.component";
import {RequestsHistoryComponent} from "./requests-history/requests-history.component";
import {StockDemandsComponent} from "./stock-demands/stock-demands.component";
import {StocksComponent} from "./stocks/stocks.component";

const routes: Routes = [
  {
    path:'register',
    component: RegisterComponent,
  },
  {
    path:'login',
    component: LoginComponent,
  },
  {
    path:'history',
    component: HistoryComponent,
  },
  {
    path:'home',
    component: HomeComponent
  },

  {
    path:'',
    redirectTo:'home',
    pathMatch :'full'
  },

  {
    path:'request-history',
    component: RequestsHistoryComponent
  },
  {
    path:'request',
    component: RequestComponent
  },
  {
    path:'profile',
    component: ProfileComponent
  },
  {
    path:'stock-demands',
    component: StockDemandsComponent
  },
  {
    path:'stocks',
    component: StocksComponent
  },
  {
    path:'update-profile',
    component: UpdateProfileComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
