import { FirebaseAuthService } from './auth.firebase.service';
import { Configuration } from './../configuration';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class MailService {

    constructor(private _http: HttpClient, private _auth: FirebaseAuthService) { }

    public mail(to: string[], subject: string, text: string, sendDate: Date): Observable<boolean> {
        return this._auth.getToken().switchMap(to => {
            console.log(to);
            var headers:HttpHeaders=new HttpHeaders().set("Authorization","Bearer "+to);
            return this._http.get(Configuration.firebaseFunctionRoot + "/hello",{headers:headers}).map(t => {
                console.log(t);
                return true;
            }).catch(e => {
                console.log(e);
                return Observable.of(false);
            })
        });
    }
}