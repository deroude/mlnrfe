import { FirebaseAuthService } from './auth.firebase.service';
import { Configuration } from './../configuration';
import { Resource } from './../domain/resource';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

@Injectable()
export class ResourceService {

    constructor(private afs: AngularFirestore,private _auth: FirebaseAuthService) { }

    public getList(path: string,query?:any): Observable<any> {
        return this.afs.collection(path,query).valueChanges();
    }
}