import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GraphPageComponent } from './graph-page/graph-page.component';
import { SettingsComponent } from './settings/MeasurementsSettings/settings.component';
import { TimeComponent } from './settings/time/time.component';
import { TypeComponent } from './pages/type/type.component';
import { UnitsComponent } from './units/units.component';
import { EmailComponent } from './alarm/email/email.component';
import { MinMaxComponent } from './alarm/min-max/min-max.component';

const routes: Routes = [
  { path: '', component: GraphPageComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'type', component: TypeComponent },
  { path: 'units', component: UnitsComponent },
  { path: 'time', component: TimeComponent },
  { path: 'email', component: EmailComponent },
  { path: 'MinMax', component: MinMaxComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
