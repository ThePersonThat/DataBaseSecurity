import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Race, Tournament} from "../shared/interfaces/Data";
import {MatPaginator} from "@angular/material/paginator";
import {DataService} from "../shared/services/data.service";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../shared/services/auth.service";

@Component({
  selector: 'app-data',
  templateUrl: './data-page.component.html',
  styleUrls: ['./data-page.component.css']
})
export class DataPageComponent implements OnInit {

  finish = false;
  pageSize: number;

  races: MatTableDataSource<Race>;
  raceCount: number;
  raceColumns: string[] = ['id_race', 'id_tournament', 'stage_of_tournament', 'max_rank'];
  @ViewChild('racePaginator', {static: true}) racePaginator: MatPaginator;

  tournaments: MatTableDataSource<Tournament>;
  tournamentCount: number;
  tournamentColumns: string[] = ['id_tournament', 'location', 'count_stages', 'name'];
  @ViewChild('tournamentPaginator', {static: true}) tournamentPaginator: MatPaginator;

  constructor(private data: DataService, private route: ActivatedRoute, private auth: AuthService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      value => this.pageSize = +value['pagesize'] || 5
    )
  }

  logout(): void {
    this.auth.logout();
  }

  onPaginate(): void {
    this.getDataFromBackend();
  }

  getDataFromBackend(): void {
    this.data.getDataFromTwoTables({
        limit: this.racePaginator.pageSize,
        offset: this.racePaginator.pageIndex * this.racePaginator.pageSize
      }
    ).subscribe(
      value => {
        this.races = new MatTableDataSource<Race>(value.races);
        this.raceCount = value.raceCount;

        this.tournaments = new MatTableDataSource<Tournament>(value.tournaments);
        this.tournamentCount = value.tournamentCount;

        this.finish = true;
      }
    )
  }
}
