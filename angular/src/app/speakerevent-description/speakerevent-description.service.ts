import { Injectable } from '@angular/core';
import { Headers, Http, Response } from "@angular/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { HttpRequest} from '@angular/common/http';

@Injectable()
export class SpeakereventDescriptionService {
    private baseUrl: string = 'http://localhost:3000/speakersponsor';
    constructor(private http: Http,private https:HttpClient) {
      //this.https=https;
     }

  selectedevent(eventid:number) {
      const headers = new Headers({'Content-Type': 'application/json'});
      return this.http.post(this.baseUrl + '/eventdetails', {"eventid":eventid}, { headers: headers})
      .map((res: Response) => res.json());
  }

  checkevent(eventid:number){
    console.log(eventid);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(this.baseUrl+'/checkevent',{userid:+sessionStorage.getItem('userid'),eventid:eventid},{headers: headers})
    .map((res: Response) => res.text());


  }

  setRoleforEvent(formdata:FormData):Observable<string>{
    console.log(formdata)
    //const headers = new Headers({'Content-Type': 'application/json'});
         return this.https.post('http://localhost:3000/speakersponsor/setRole',formdata,{responseType: 'text'});
        //.map((res: Response) => res.text());
  }


}