import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GraphPageComponent } from './graph-page/graph-page.component';
import { SettingsComponent } from './settings/MeasurementsSettings/settings.component';
import { TimeComponent } from './settings/time/time.component';
import { TypeComponent } from './type/type.component';
import { UnitsComponent } from './units/units.component';

const routes: Routes = [
  { path: '', component: GraphPageComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'type', component: TypeComponent },
  { path: 'units', component: UnitsComponent },
  { path: 'time', component: TimeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
