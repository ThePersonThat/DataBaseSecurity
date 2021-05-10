import { Component, OnInit } from '@angular/core';
import {Data, Store} from "../shared/interfaces/Data";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DataService} from "../shared/services/data.service";
import {StoreService} from "../shared/services/store.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-insert-page',
  templateUrl: './insert-page.component.html',
  styleUrls: ['./insert-page.component.css']
})
export class InsertPageComponent implements OnInit {

  data: Store;
  form: FormGroup;
  error: string;

  constructor(private dataService: DataService,
              private store: StoreService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({});
    this.data = this.store.get();

    for(let element of this.data.element) {
      this.form.addControl(element.name, new FormControl(null, Validators.required));
    }
  }

  submit(): void {
    let data: Data[] = [];

    for (let key in this.form.value) {
      data.push({
        name: key,
        value: this.form.value[key]
      });
    }

    const request = {
      id: this.data.element[0],
      element: data,
      table: this.data.table
    };

    this.dataService.insert(request).subscribe(
      () => this.router.navigate(['/data']),
      error => this.error = error.error.message
    )
  }
}
