import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {DataResponse, Pagination} from "../interfaces/Data";
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  readonly API_HOST = 'http://localhost:5000/api/';

  constructor(private http: HttpClient) {}

  getDataFromTwoTables(pagination: Pagination): Observable<DataResponse> {
    let params: HttpParams = new HttpParams();
    params = params.append('offset', pagination.offset.toString());
    params = params.append('pagesize', pagination.limit.toString());

    return this.http.get<DataResponse>(this.API_HOST + 'data', {params: params});
  }
}
