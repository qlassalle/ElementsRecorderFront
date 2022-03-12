import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ResourceDetailComponent} from './resource/resource-detail/resource-detail.component';
import {ResourcesComponent} from './resource/resources/resources.component';
import {SaveResourceComponent} from './resource/save-resource/save-resource.component';
import {AuthenticationComponent} from './authentication/authentication/authentication.component';

const routes: Routes = [
  {path: '', redirectTo: '/resources', pathMatch: 'full'},
  {path: 'resources', component: ResourcesComponent},
  {path: 'resources/:id', component: ResourceDetailComponent},
  {path: 'resource/create', component: SaveResourceComponent},
  {path: 'register', component: AuthenticationComponent}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
