import { Configuration } from './../configuration';
import { AuthToken } from './auth.token';
import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, ActivatedRouteSnapshot, RouterStateSnapshot, Route, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

export class AuthService implements CanActivate, CanLoad {

    private authenticated: BehaviorSubject<boolean> = new BehaviorSubject(false);
    private authToken:string;
    private refreshToken:string;

    constructor(
        private _http: HttpClient, private _router: Router) {
    }

    public obtainAccessToken(username: string, password: string): Observable<string> {
        let params = new URLSearchParams();
        params.append('username', username);
        params.append('password', password);
        params.append('grant_type', 'password');
        let headers = new HttpHeaders()
            .set('Content-type', 'application/x-www-form-urlencoded')
            .set('Authorization', 'Basic ' + btoa(Configuration.oauthClientId + ":" + Configuration.oauthClientSecret));
        return this._http.post<AuthToken>(Configuration.rootPath + Configuration.oauthTokenPath, params.toString(), { headers: headers })
            .map(re => {
                console.log("Obtained token " + re.access_token);
                this.saveToken(re);
                this.authenticated.next(true);
                return re.access_token;
            }).catch(this.handleError);
    }

    private refreshAccessToken(): Observable<string> {
        if (!this.refreshToken) {
            return;
        }
        let params = new URLSearchParams();
        params.append('refresh_token', this.refreshToken);
        params.append('grant_type', 'refresh_token');
        let headers = new HttpHeaders()
            .set('Content-type', 'application/x-www-form-urlencoded')
            .set('Authorization', 'Basic ' + btoa(Configuration.oauthClientId + ":" + Configuration.oauthClientSecret));
        return this._http.post<AuthToken>(Configuration.rootPath + Configuration.oauthTokenPath, params.toString(), { headers: headers })
            .map(re => {
                console.log("Refreshed token " + re.access_token);
                this.saveToken(re);
                return re.access_token;
            });
    }

    private saveToken(token: AuthToken): void {
        var expireDate = new Date().getTime() + (1000 * token.expires_in);
        this.authToken=token.access_token;
        this.refreshToken=token.refresh_token;
    }

    public checkCredentials(): Observable<string> {
        if (this.authToken) {
            console.log("Found token " + this.authToken);
            return Observable.of(this.authToken);
        } else {
            if (this.refreshToken) {
                return this.refreshAccessToken();
            } else {
                return Observable.throw("No refresh token found");
            }
        }
    }

    public isAuthenticated(): BehaviorSubject<boolean> {
        return this.authenticated;
    }

    public logout() {
        this.authToken=null;
        this.refreshToken=null;
        this.authenticated.next(false);
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        if (this.isAuthenticated()) {
            return true;
        }
        this._router.navigate(['/'], { queryParams: { returnUrl: state.url } });
        return false;
    }

    canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
        return true;
    }

    public handleError(error: Response) {
        return Observable.throw(error.json()['error'] || 'Server error');
    }
}