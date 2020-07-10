import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreatePage } from './create.page';

import { CreatePageRoutingModule } from './create-routing.module';
import { OnlyNumberDirective } from '../../directives/onlyNumer.directive';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CreatePageRoutingModule
  ],
  declarations: [CreatePage, OnlyNumberDirective]
})
export class CreatePageModule {}
