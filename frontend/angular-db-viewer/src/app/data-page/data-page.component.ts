import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Data, Race, Tournament} from "../shared/interfaces/Data";
import {MatPaginator} from "@angular/material/paginator";
import {DataService} from "../shared/services/data.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../shared/services/auth.service";
import {StoreService} from "../shared/services/store.service";

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
  raceColumns: string[] = ['id_race', 'id_tournament', 'stage_of_tournament', 'max_rank', 'actions', 'insert'];
  @ViewChild('racePaginator', {static: true}) racePaginator: MatPaginator;

  tournaments: MatTableDataSource<Tournament>;
  tournamentCount: number;
  tournamentColumns: string[] = ['id_tournament', 'location', 'count_stages', 'name', 'actions', 'insert'];
  @ViewChild('tournamentPaginator', {static: true}) tournamentPaginator: MatPaginator;

  constructor(private data: DataService,
              private route: ActivatedRoute,
              private auth: AuthService,
              private router: Router,
              private store: StoreService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      value => {
        this.pageSize = +value['pagesize'] || 5;
        this.racePaginator.pageSize = this.pageSize;
        this.getDataFromBackend();
      }
    );
  }

  edit(element: any, table: string): void {
    this.store.set({
      element: this.objectToArrayData(element),
      table: table
    });

    this.router.navigate(['/change-data']);
  }

  delete(element: any, table: string): void {
    const data = this.objectToArrayData(element);

    this.data.delete({
      element: data.slice(0, 1),
      table: table
    })
      .subscribe(
      () => this.getDataFromBackend()
    );
  }

  insert(element: any, table: string): void {
    this.store.set({
      element: this.objectToArrayData(element),
      table: table
    });

    this.router.navigate(['/insert']);
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

  private objectToArrayData(element: any): Data[] {
    let data: Data[] = [];

    for (let key in element) {
      data.push({
        name: key,
        value: element[key]
      });
    }

    return data;
  }
}
