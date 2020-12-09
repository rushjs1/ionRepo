import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateBlogPageRoutingModule } from './create-blog-routing.module';

import { CreateBlogPage } from './create-blog.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateBlogPageRoutingModule
  ],
  declarations: [CreateBlogPage]
})
export class CreateBlogPageModule {}
