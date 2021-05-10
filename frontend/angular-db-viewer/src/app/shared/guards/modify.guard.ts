import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {StoreService} from "../services/store.service";

@Injectable({
  providedIn: 'root'
})
export class ModifyGuard implements CanActivate {

  constructor(private store: StoreService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  {
    if (this.store.isExist()) {
      return true;
    }

    this.router.navigate(['/data']);
    return false;
  }

}
