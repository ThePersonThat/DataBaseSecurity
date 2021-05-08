import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {DataPageComponent} from "../data-page/data-page.component";
import {NotFoundPageComponent} from "../not-found-page/not-found-page.component";
import {LoginPageComponent} from "../login-page/login-page.component";
import {AuthGuard} from "../shared/guards/auth.guard";
import {LoginGuard} from "../shared/guards/login.guard";

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', canActivate: [LoginGuard], component: LoginPageComponent},
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
export class AppRoutingModule { }
