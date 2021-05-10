import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {DataResponse, Pagination} from "../interfaces/Data";
import {HttpClient, HttpParams} from "@angular/common/http";
import {API_HOST} from "../interfaces/Http";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {}

  getDataFromTwoTables(pagination: Pagination): Observable<DataResponse> {
    let params: HttpParams = new HttpParams();
    params = params.append('offset', pagination.offset.toString());
    params = params.append('pagesize', pagination.limit.toString());

    return this.http.get<DataResponse>(API_HOST + 'data', {params: params});
  }

  update(updateDate: any): Observable<any> {
    return this.http.post(API_HOST + 'update', updateDate);
  }

  delete(deleted: any): Observable<any> {
    return this.http.post(API_HOST + 'delete', deleted);
  }

  insert(inserted: any): Observable<any> {
    return this.http.post(API_HOST + 'insert', inserted);
  }
}
