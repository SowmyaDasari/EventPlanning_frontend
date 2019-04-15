import { Injectable } from '@angular/core';
import { Headers, Http, Response } from "@angular/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ReviewsService {

  private baseUrl: string = 'http://localhost:3000';
  constructor(private http: Http,private https:HttpClient) { }

  checkreview(eventid:number){
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(this.baseUrl+'/checkReview',{userid:+sessionStorage.getItem('userid'),eventid:eventid},{headers: headers})
    .map((res: Response) => res.text());

  }

  getReviews(eventid:number){
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(this.baseUrl+'/getReview',{userid:+sessionStorage.getItem('userid'),eventid:eventid},{headers: headers})
    .map((res: Response) => res.json()).catch(this.errorHandler);
  }

  getSuggestions(eventid:number){
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(this.baseUrl+'/getSuggestion',{userid:+sessionStorage.getItem('userid'),eventid:eventid},{headers: headers})
    .map((res: Response) => res.json()).catch(this.errorHandler);
  }

  setReviewforEvent(formdata:FormData):Observable<string>{
    //const headers = new Headers({'Content-Type': 'application/json'});
         return this.https.post('http://localhost:3000/setReview',formdata,{responseType: 'text'});
        //.map((res: Response) => res.text());
  }

  errorHandler(error:Response){

    return Observable.throw(error||"SERVER ERROR");
}


}
