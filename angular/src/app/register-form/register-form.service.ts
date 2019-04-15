import { Injectable } from '@angular/core';
import { Headers, Http, Response } from "@angular/http";
import {Register} from '../register';
import {Login} from '../login';
import 'rxjs/add/operator/map';
@Injectable()
export class RegisterFormService {

    private baseUrl:string ='http://localhost:3000';
    
    constructor(private http: Http) {}

    create(logins: Login, register: Register) {
      const headers = new Headers({'Content-Type': 'application/json'});
         return this.http.post(this.baseUrl + '/create', {login: logins, user: register}, {headers: headers})
        .map((res: Response) => res.text());
    }
}

