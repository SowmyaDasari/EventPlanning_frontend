import { Injectable } from '@angular/core';
import { Headers, Http,Response,ResponseContentType } from "@angular/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class SpeakerSponsorService {
  private baseUrl:string ='http://localhost:3000/speakersponsor'
  constructor(private http:Http) { }

  displaySpeaker(eventid:number)
  {
  const headers = new Headers({'Content-Type': 'text/plain'});
   return this.http.get(this.baseUrl+'/speakerdetail/'+eventid,{headers: headers})
        .map((res: Response) => res.json());

  }

  displaySponsor(eventid:number)
  {
  const headers = new Headers({'Content-Type': 'text/plain'});
   return this.http.get(this.baseUrl+'/sponsordetail/'+eventid,{headers: headers})
        .map((res: Response) => res.json());

  }
  
  sendToSpeaker(speakerid:number,event_id:number)
  {
    const headers = new Headers({'Content-Type': 'application/json'});
   return this.http.post(this.baseUrl+'/requesttospeaker',{userid:speakerid,eventid:event_id},{headers: headers})
        .map((res: Response) => res.text());

  }

sendToSponsor(sponsorid:number,event_id:number)
{
  const headers = new Headers({'Content-Type': 'application/json'});
   return this.http.post(this.baseUrl+'/requesttosponsor',{userid:sponsorid,eventid:event_id},{headers: headers})
        .map((res: Response) => res.text());

}

downloadFile(filename:String): Observable<any>
{
  /*const headers = new Headers({'Content-Type': 'text/plain'});
   return this.http.get('http://localhost:3000/speakersponsor/downloadResume/'+filename,{headers: headers})
        .map((res: Response) => res.text());*/
        let headers = new Headers();
        headers.append('Accept', 'text/plain');
        return this.http.get('http://localhost:3000/speakersponsor/downloadResume/'+filename,{headers: headers, responseType: ResponseContentType.Blob })
        .map((res:Response) => {
          return {
            fileName: filename+'.pdf',
            data: res.blob()
          };
        } )   
        
}

errorHandler(error:Response)
    {
      return Observable.throw(error||"SERVER ERROR");
    }




}