import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HighchartsChartModule } from 'highcharts-angular';
import { GraphPageComponent } from './graph-page/graph-page.component';
import { SettingsComponent } from './settings/settings.component';
import { MenuComponent } from './menu/menu.component';
import { UnitsComponent } from './units/units.component';
import { TypeComponent } from './type/type.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [
    AppComponent,
    GraphPageComponent,
    SettingsComponent,
    MenuComponent,
    UnitsComponent,
    TypeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    HighchartsChartModule,
    MatSidenavModule,
    LayoutModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
