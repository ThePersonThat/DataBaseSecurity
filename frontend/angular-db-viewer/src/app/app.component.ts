import {Component, ViewChild} from '@angular/core';
import {DataService} from "./shared/services/data.service";
import {Race, Tournament} from "./shared/interfaces/Data";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DataService]
})
export class AppComponent {
  finish = false;

  races: MatTableDataSource<Race>;
  raceCount: number;
  raceColumns: string[] = ['id_race', 'id_tournament', 'stage_of_tournament', 'max_rank'];
  @ViewChild(MatPaginator) racePaginator: MatPaginator;

  tournaments: MatTableDataSource<Tournament>;
  tournamentCount: number;
  tournamentColumns: string[] = ['id_tournament', 'location', 'count_stages', 'name'];
  @ViewChild(MatPaginator) tournamentPaginator: MatPaginator;

  COUNT_PER_PAGE = 5;

  constructor(private data: DataService) {}

  getDataFromBackend(): void {
    this.data.getDataFromTwoTables().subscribe(
      value => {
        this.races = new MatTableDataSource<Race>(value.races)
        this.races.paginator = this.racePaginator;
        this.raceCount = value.races.length;


        this.tournaments = new MatTableDataSource<Tournament>(value.tournaments);
        this.tournaments.paginator = this.tournamentPaginator;
        this.tournamentCount = value.tournaments.length;

        this.finish = true;
      }
    )
  }
}
