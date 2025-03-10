import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as jsonData from '../../../assets/Configs/Global.json';

@Injectable()

export class ApiService {
  data: any = jsonData;

  constructor(private http: HttpClient) { }

  public Post(body:any, url: string): Observable<any> {
    return this.http.post<any>(`${this.data.BaseURI}${url}`, body);
  }
}