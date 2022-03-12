import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ResourcesComponent} from './resource/resources/resources.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {ResourceDetailComponent} from './resource/resource-detail/resource-detail.component';
import {AppRoutingModule} from './app-routing.module';
import {MenuNavbarComponent} from './menu-navbar/menu-navbar.component';
import {SaveResourceComponent} from './resource/save-resource/save-resource.component';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {AuthenticationModule} from './authentication/authentication.module';
import {JwtModule} from '@auth0/angular-jwt';
import {ReadOnlyResourceComponent} from './resource/read-only-resource/read-only-resource.component';
import {environment} from '../environments/environment';
import {ResourceService} from './resource/service/resource/ResourceService';
import {resourceServiceFactory} from './resource/service/resource/ResourceServiceFactory';
import {ResourceModule} from './resource/resource.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    ResourcesComponent,
    ResourceDetailComponent,
    MenuNavbarComponent,
    SaveResourceComponent,
    ReadOnlyResourceComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AuthenticationModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('access_token'),
        allowedDomains: [environment.allowedDomain],
        disallowedRoutes: ['https://ozxkf3w0u6.execute-api.eu-west-3.amazonaws.com/authenticate',
          'https://ozxkf3w0u6.execute-api.eu-west-3.amazonaws.com/authenticate/register',
          'https://ozxkf3w0u6.execute-api.eu-west-3.amazonaws.com/hello'
        ]
      }
    }),
    ResourceModule,
    BrowserAnimationsModule
  ],
  providers: [
    FormBuilder,
    {
      provide: ResourceService,
      useFactory: resourceServiceFactory,
      deps: [HttpClient]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
