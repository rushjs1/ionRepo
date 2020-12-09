import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreepPage } from './creep.page';

const routes: Routes = [
  {
    path: '',
    component: CreepPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreepPageRoutingModule {}
