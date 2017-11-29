import { Configuration } from './../configuration';
import { Resource } from './../domain/resource';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

@Injectable()
export class ResourceService<T> {

    constructor(private afs: AngularFirestore) { }

    public getList<T>(path: string,query?:any): Observable<T[]> {
        return this.afs.collection(path,query).valueChanges().map(a=>a as T[]);
    }

    public getOne(path:string):Observable<T>{
        return this.afs.doc(path).valueChanges().map(a=>a as T);
    }

    public update(path:string,data:T):void{
        this.afs.doc(path).update(data);
    }

    public add(path:string,data:T):void{
        this.afs.collection(path).add(data);
    }
}