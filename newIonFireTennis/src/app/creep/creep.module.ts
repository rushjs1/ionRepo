import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreepPageRoutingModule } from './creep-routing.module';

import { CreepPage } from './creep.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreepPageRoutingModule
  ],
  declarations: [CreepPage]
})
export class CreepPageModule {}
