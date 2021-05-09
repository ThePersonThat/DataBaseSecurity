import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {AppRoutingModule} from "./app-routing/app-routing.module";
import { DataPageComponent } from './data-page/data-page.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {ReactiveFormsModule} from "@angular/forms";
import { TokenInterceptorService } from './shared/services/token-interceptor.service';
import { HeaderNotAuthLayoutComponent } from './shared/layouts/header-not-auth-layout/header-not-auth-layout.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { ChangePasswordPageComponent } from './change-password-page/change-password-page.component';

@NgModule({
  declarations: [
    AppComponent,
    DataPageComponent,
    NotFoundPageComponent,
    LoginPageComponent,
    HeaderNotAuthLayoutComponent,
    RegisterPageComponent,
    ChangePasswordPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptorService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
