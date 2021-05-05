import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {DataResponse} from "../interfaces/Data";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  readonly API_HOST = 'http://localhost:5000/api/';

  constructor(private http: HttpClient) {
  }

  getDataFromTwoTables(): Observable<DataResponse> {
    return this.http.get<DataResponse>(this.API_HOST + 'data');
  }
}
