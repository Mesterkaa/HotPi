import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HighchartsChartModule } from 'highcharts-angular';
import { GraphComponent } from './pages/graph/graph.component';
import { SettingsComponent } from './pages/MeasurementsSettings/settings.component';
import { MenuComponent } from './layout/menu/menu.component';
import { DevicesComponent } from './pages/devices/devices.component';
import { TypeComponent } from './pages/type/type.component';
import { TimeComponent } from './pages/time/time.component';
import { EmailComponent } from './pages/email/email.component';
import { MinMaxComponent } from './pages/min-max/min-max.component';

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
import { MatTreeModule } from '@angular/material/tree';
import { MatDialogModule } from '@angular/material/dialog';
import { EditdialogComponent } from './pages/devices/editdialog/editdialog.component';

@NgModule({
  declarations: [
    AppComponent,
    GraphComponent,
    SettingsComponent,
    MenuComponent,
    DevicesComponent,
    TypeComponent,
    TimeComponent,
    EmailComponent,
    MinMaxComponent,
    EditdialogComponent
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
    MatRadioModule,
    MatTreeModule,
    MatDialogModule
  ],
  providers: [/*{ provide: HTTP_INTERCEPTORS, useClass: UrlInterceptor, multi: true }*/],
  bootstrap: [AppComponent]
})
export class AppModule { }
