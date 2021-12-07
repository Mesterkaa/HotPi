import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HighchartsChartModule } from 'highcharts-angular';
import { GraphPageComponent } from './graph-page/graph-page.component';
import { SettingsComponent } from './settings/MeasurementsSettings/settings.component';
import { MenuComponent } from './menu/menu.component';
import { UnitsComponent } from './units/units.component';
import { TypeComponent } from './type/type.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatRadioModule } from '@angular/material/radio';
import { TimeComponent } from './settings/time/time.component';

@NgModule({
  declarations: [
    AppComponent,
    GraphPageComponent,
    SettingsComponent,
    MenuComponent,
    UnitsComponent,
    TypeComponent,
    TimeComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    HighchartsChartModule,
    MatSidenavModule,
    LayoutModule,
    MatListModule,
    MatCheckboxModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatSnackBarModule,
    MatRadioModule
  ],
  providers: [/*{ provide: HTTP_INTERCEPTORS, useClass: UrlInterceptor, multi: true }*/],
  bootstrap: [AppComponent]
})
export class AppModule { }
