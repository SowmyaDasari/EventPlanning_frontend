import { Injectable } from '@angular/core';
import { Headers, Http,Response } from "@angular/http";
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class OrganizerService {

  private baseUrl:string ='http://localhost:3000/organizer';

  constructor(private http:Http) { }
  getEventList()
  {      
      return this.http.get(this.baseUrl+'/eventslist')
      .map((res:Response) => res.json()).catch(this.errorHandler);
  }

  organizerDetails(organizer_id:number)
  {
    const headers = new Headers({'Content-Type': 'text/plain'});
         return this.http.get(this.baseUrl+'/organizerDetail?organizer='+organizer_id,{headers: headers})
        .map((res: Response) => res.json());
  }

  sendToOrganizer(id:any,eventId:number)
  {
    const headers = new Headers({'Content-Type': 'application/json'});
         return this.http.post(this.baseUrl+'/requestToOrganizer',{userid:id,eventid:eventId},{headers: headers})
        .map((res: Response) => res.text());

  }
  errorHandler(error:Response){

      return Observable.throw(error||"SERVER ERROR");
 }
}
