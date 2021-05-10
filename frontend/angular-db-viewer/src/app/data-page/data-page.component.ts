import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Data, Race, Tournament} from "../shared/interfaces/Data";
import {MatPaginator} from "@angular/material/paginator";
import {DataService} from "../shared/services/data.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../shared/services/auth.service";
import {StoreService} from "../shared/services/store.service";
import {FormControl, Validators} from "@angular/forms";

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
  raceColumns: string[] = ['id_race', 'id_tournament', 'stage_of_tournament', 'max_rank', 'actions'];
  @ViewChild('racePaginator', {static: true}) racePaginator: MatPaginator;

  tournaments: MatTableDataSource<Tournament>;
  tournamentCount: number;
  tournamentColumns: string[] = ['id_tournament', 'location', 'count_stages', 'name', 'actions'];
  @ViewChild('tournamentPaginator', {static: true}) tournamentPaginator: MatPaginator;

  constructor(private data: DataService,
              private route: ActivatedRoute,
              private auth: AuthService,
              private router: Router,
              private store: StoreService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      value => this.pageSize = +value['pagesize'] || 5
    )
  }

  edit(element: any, table: string): void {

    let data: Data[] = [];

    for (let key in element) {
      data.push({
        name: key,
        value: element[key]
      });
    }

    this.store.set({
      element: data,
      table: table
    });

    this.router.navigate(['/change-data']);
  }

  delete(): void {
    console.log('delete');
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
