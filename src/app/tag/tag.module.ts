import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddTagComponent} from './add-tag/add-tag.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    AddTagComponent
  ],
  exports: [
    AddTagComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TagModule { }
