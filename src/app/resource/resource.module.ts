import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ResourceService} from './service/resource/ResourceService';
import {resourceServiceFactory} from './service/resource/ResourceServiceFactory';
import {HttpClient} from '@angular/common/http';
import {DeleteResourceComponent} from './delete-resource/delete-resource.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule} from '@angular/material/snack-bar';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [
    DeleteResourceComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatButtonModule
  ],
  exports: [
    DeleteResourceComponent
  ],
  providers: [
    {
      provide: ResourceService,
      useFactory: resourceServiceFactory,
      deps: [HttpClient]
    },
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 3000}}
  ]
})
export class ResourceModule {
}
