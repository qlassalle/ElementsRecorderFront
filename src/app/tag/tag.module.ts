import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddTagComponent} from './add-tag/add-tag.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TagService} from './service/TagService';
import {tagServiceFactory} from './service/TagServiceFactory';
import {MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {HttpClient} from '@angular/common/http';


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
    ReactiveFormsModule,
    MatOptionModule,
    MatSelectModule,
    MatAutocompleteModule
  ],
  providers: [
    {
      provide: TagService,
      useFactory: tagServiceFactory,
      deps: [HttpClient]
    },
  ]
})
export class TagModule { }
