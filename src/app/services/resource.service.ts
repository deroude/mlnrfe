import { Configuration } from './../configuration';
import { Resource } from './../domain/resource';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

@Injectable()
export class ResourceService {

    constructor(private afs: AngularFirestore) { }

    public getList(path: string,query?:any): Observable<any> {
        return this.afs.collection(path,query).valueChanges();
    }

    public getOne(path:string):Observable<any>{
        return this.afs.doc(path).valueChanges();
    }
}