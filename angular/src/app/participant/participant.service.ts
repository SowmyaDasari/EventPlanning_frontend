import { Injectable } from '@angular/core';
import { Headers, Http,Response } from "@angular/http";
import 'rxjs/add/operator/map';

@Injectable()
export class ParticipantService {
  private baseUrl:string ='http://localhost:3000/participant'
  constructor(private http:Http) { }


  display(eventname :String)
  {
    const headers = new Headers({'Content-Type': 'text/plain'});
         return this.http.get(this.baseUrl+'/eventdetail/?name='+eventname,{headers: headers})
        .map((res: Response) => res.json());

  }
 
  addparticipant(id:number,fee:number)
  {
    
    const headers = new Headers({'Content-Type': 'application/json'});
         return this.http.post(this.baseUrl+'/register',{userid:+sessionStorage.getItem('userid'),eventid:id,role:"participant",amountpaid:fee},{headers: headers})
        .map((res: Response) => res.text());

  }

  deleteparticipant(id:number)
  {
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(this.baseUrl+'/withdraw',{userid:+sessionStorage.getItem('userid'),eventid:id},{headers: headers})
   .map((res: Response) => res.text());
    
  }

  show(id:number)
  {
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(this.baseUrl+'/status',{userid:+sessionStorage.getItem('userid'),eventid:id},{headers: headers})
   .map((res: Response) => res.text());
  }
}
