import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GraphComponent } from './pages/graph/graph.component';
import { FrequencyComponent } from './pages/frequency/frequency.component';
import { TimeComponent } from './pages/time/time.component';
import { TypeComponent } from './pages/type/type.component';
import { DevicesComponent } from './pages/devices/devices.component';
import { EmailComponent } from './pages/email/email.component';
import { MinMaxComponent } from './pages/min-max/min-max.component';

const routes: Routes = [
  { path: '', component: GraphComponent },
  { path: 'frequency', component: FrequencyComponent },
  { path: 'type', component: TypeComponent },
  { path: 'devices', component: DevicesComponent },
  { path: 'time', component: TimeComponent },
  { path: 'email', component: EmailComponent },
  { path: 'min-max', component: MinMaxComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
