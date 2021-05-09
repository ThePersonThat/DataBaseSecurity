import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {DataPageComponent} from "../data-page/data-page.component";
import {NotFoundPageComponent} from "../not-found-page/not-found-page.component";
import {LoginPageComponent} from "../login-page/login-page.component";
import {AuthGuard} from "../shared/guards/auth.guard";
import {LoginGuard} from "../shared/guards/login.guard";
import {HeaderNotAuthLayoutComponent} from "../shared/layouts/header-not-auth-layout/header-not-auth-layout.component";
import {RegisterPageComponent} from "../register-page/register-page.component";
import {ChangePasswordPageComponent} from "../change-password-page/change-password-page.component";

const routes: Routes = [
  {path: '', redirectTo: '/auth/login', pathMatch: 'full'},
  {
    path: 'auth', component: HeaderNotAuthLayoutComponent, canActivate: [LoginGuard], children: [
      {path: 'login', component: LoginPageComponent},
      {path: 'register', component: RegisterPageComponent},
      {path: 'change', component: ChangePasswordPageComponent}
    ]
  },
  {path: 'data', canActivate: [AuthGuard], component: DataPageComponent},
  {path: '**', component: NotFoundPageComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled'
    })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
