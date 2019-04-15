import { Response } from '@angular/http';
import { Headers } from '@angular/http';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
@Injectable()
export class UndercreationeventService {

  private baseUrl:string ='http://localhost:3000'
  constructor(private http:Http) { }
 
  
  showDetails(eventname :String)
  {
    const headers = new Headers({'Content-Type': 'text/plain'});
         return this.http.get(this.baseUrl+'/undercreationevents?name='+eventname,{headers: headers})
        .map((res: Response) => res.json());

  }

  
 
  organizerEvent(id:number,eid:number)
  {
    const headers = new Headers({'Content-Type': 'text/plain'});
         return this.http.get(this.baseUrl+'/organizerEvents',{params:{orgid:id,eventid:eid},headers: headers})
        .map((res: Response) => res.json());

  }
  
  updatephase(id:number)
{
 
  const headers = new Headers({'Content-Type': 'text/plain'});
         return this.http.post(this.baseUrl+'/updatePhase',id.toString(),{headers: headers})
        .map((res: Response) => res.text());

}

}