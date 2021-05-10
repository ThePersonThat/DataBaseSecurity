import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Data, Store} from "../shared/interfaces/Data";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DataService} from "../shared/services/data.service";
import {StoreService} from "../shared/services/store.service";

@Component({
  selector: 'app-change-data-page',
  templateUrl: './change-data-page.component.html',
  styleUrls: ['./change-data-page.component.css']
})
export class ChangeDataPageComponent implements OnInit {

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
      this.form.addControl(element.name, new FormControl(element.value, Validators.required));
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

    this.dataService.update(request).subscribe(
      () => this.router.navigate(['/data']),
      error => this.error = error.error.message
    )
  }
}
