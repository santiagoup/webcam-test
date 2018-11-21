import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import {Http} from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class WebcamService {

  private url = 'http://runningios.com/screamingbox/cameras.json';

  constructor(private http: Http) { }

  public getCameraList(): Observable<any> {
    return this.http.get(this.url)
    .pipe(map(res => {
      const body = res.json();
      return body || { };
    }),
    catchError(error => {
        let errMsg: string;
        const body = error.json() || '';
        const err = body || JSON.stringify(body);
        errMsg = err.msg;
        return Observable.throw(errMsg);
    }));
  }
}
