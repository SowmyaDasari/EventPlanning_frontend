import { Injectable } from '@angular/core';
import { Headers, Http,Response } from "@angular/http";
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class DashboardService {

  private baseUrl:string ='http://localhost:3000/notification'
  constructor(private http:Http) { }

  displayNotification()
  {
    var userid=sessionStorage.getItem('userid')
    return this.http.get(this.baseUrl+'/'+userid)
    .map((res: Response) => res.json()).catch(this.errorHandler);
  }

  errorHandler(error:Response)
  {
    return Observable.throw(error||"SERVER ERROR");
  }

  }