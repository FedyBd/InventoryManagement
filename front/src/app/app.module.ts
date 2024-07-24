import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import {HttpClientModule} from "@angular/common/http";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LoginComponent } from './login/login.component';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardModule,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import { ProfileComponent } from './profile/profile.component';
import { RequestComponent } from './request/request.component';
import {CookieService} from "ngx-cookie-service";
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/core";
import {MatSelect} from "@angular/material/select";
import {MatIcon} from "@angular/material/icon";
import {MatDivider} from "@angular/material/divider";
import {MatButton} from "@angular/material/button";
import { HistoryComponent } from './history/history.component';
import { RequestsHistoryComponent } from './requests-history/requests-history.component';
import { StockDemandsComponent } from './stock-demands/stock-demands.component';
import { StocksComponent } from './stocks/stocks.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    HomeComponent,
    NavComponent,
    LoginComponent,
    ProfileComponent,
    RequestComponent,
    UpdateProfileComponent,
    HistoryComponent,
    RequestsHistoryComponent,
    StockDemandsComponent,
    StocksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatCardModule,
    MatCardHeader,
    MatCardContent,
    MatCardSubtitle,
    FormsModule,
    MatFormField,
    MatInput,
    MatOption,
    MatSelect,
    MatIcon,
    MatDivider,
    MatButton,
    MatLabel
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    CookieService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
