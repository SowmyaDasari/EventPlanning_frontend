import { Injectable } from "@angular/core";
import { Headers, Http,Response } from "@angular/http";
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class EventService{
    
    private baseUrl:string ='http://localhost:3000';

    constructor(private http:Http){}

    getList()
    {      
        return this.http.get(this.baseUrl+'/events')
        .map((res:Response) => res.json()).catch(this.errorHandler);
    }
    saveEvent(event:any)
   {
    const headers = new Headers({'Content-Type': 'application/json'});
         return this.http.post(this.baseUrl + '/saveEvent',event, {headers: headers})
        .map((res: Response) => res.text());
   }
    errorHandler(error:Response){

        return Observable.throw(error||"SERVER ERROR");
   }

}