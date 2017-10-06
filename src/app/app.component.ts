import { Lodge } from './domain/lodge';
import { User } from './domain/user';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { FirebaseAuthService } from './services/auth.firebase.service';
import { ResourceService } from './services/resource.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  user$: Observable<User> ;
  lodge$: Observable<Lodge> ;

  constructor(private _resource: ResourceService, private _auth: FirebaseAuthService) {

  }

  ngOnInit(): void {
    this.user$ = this._auth.getUser().switchMap(u => u ? this._resource.getOne("/users/" + u.email) : Observable.of({ fullname: "" }));
    this.lodge$ = this.user$.switchMap(u => u.lodge ? this._resource.getOne("/lodges/" + u.lodge) : Observable.of({ name: "RLTF" }));
  }

}
