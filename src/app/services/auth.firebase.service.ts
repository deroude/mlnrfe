import { User } from './../domain/user';
import { AngularFirestore } from 'angularfire2/firestore';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, CanActivate, Router, Route } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class FirebaseAuthService implements CanActivate, CanLoad {

    constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private _router: Router) { }

    login(email: string, password: string): Observable<any> {
        return Observable.fromPromise(this.afAuth.auth.signInWithEmailAndPassword(email, password));
    }

    logout(): Observable<any> {
        return Observable.fromPromise(this.afAuth.auth.signOut());
    }

    getUser(): Observable<any> {
        return this.afAuth.authState;
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        return this.getUser().switchMap(u => {
            if (u !== null) return Observable.of(true);
            this._router.navigate(['/'], { queryParams: { returnUrl: state.url } });
            return Observable.of(false);
        });
    }

    canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
        return true;
    }
}