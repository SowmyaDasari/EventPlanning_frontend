import { Injectable } from "@angular/core";
import { Headers, Http,Response } from "@angular/http";
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpRequest, HttpEvent} from '@angular/common/http';
@Injectable()
export class SpeakerSponsor1Service {

  private baseUrl: string = 'http://localhost:3000/speakersponsor';
  constructor(private http: Http,private https:HttpClient) { }

  geteventnames() {
      return this.http.get(this.baseUrl + '/speaker')
      .map((res:Response) => res.json()).catch(this.errorHandler);
  }

  checkuser(){
    let userid=+sessionStorage.getItem('userid')
    const headers = new Headers({'Content-Type': 'application/text'});
    return this.http.get(this.baseUrl+'/checkuser/'+userid,{headers: headers})
    .map((res: Response) => res.text());
  }
  errorHandler(error:Response){

      return Observable.throw(error||"SERVER ERROR");
 }

 setRoleforEvent(formdata:FormData):Observable<string>{
  //const headers = new Headers({'Content-Type': 'application/json'});
       return this.https.post('http://localhost:3000/speakersponsor/setRole',formdata,{responseType: 'text'});
      //.map((res: Response) => res.text());
}
}