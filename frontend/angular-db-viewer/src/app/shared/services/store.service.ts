import { Injectable } from '@angular/core';
import {Store} from "../interfaces/Data";

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  store: Store;

  constructor() {}

  set(store: Store): void {
    this.store = store;
  }

  get(): Store {
    return this.store;
  }

  isExist(): boolean {
    return !!this.store;
  }
}
