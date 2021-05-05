import { Component } from '@angular/core';
import {DataService} from "./shared/services/data.service";
import {Race, Tournament} from "./shared/interfaces/Data";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DataService]
})
export class AppComponent {
  finish = false;
  races: Race[];
  tournaments: Tournament[];

  constructor(private data: DataService) {
  }

  getDataFromBackend(): void {
    this.data.getDataFromTwoTables().subscribe(
      value => {
        this.races = value.races;
        this.tournaments = value.tournaments;
        this.finish = true;
      }
    )
  }
}
