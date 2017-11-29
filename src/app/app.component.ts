import { Lodge } from './domain/lodge';
import { User } from './domain/user';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { FirebaseAuthService } from './services/auth.firebase.service';
import { ResourceService } from './services/resource.service';
import { TranslateService } from './services/translate.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  user$: Observable<User>;
  lodge$: Observable<Lodge>;
  progress: number = 0;

  constructor(private _resource: ResourceService<any>, private _auth: FirebaseAuthService, private _translate: TranslateService) {
  }

  ngOnInit(): void {
    this.progress = 0;
    this.user$ = this._auth.getUser().switchMap(u => u ? this._resource.getOne("/users/" + u.email) : Observable.of({ fullname: "" }));
    this.lodge$ = this.user$.switchMap(u => u.lodge ? this._resource.getOne("/lodges/" + u.lodge) : Observable.of({ name: "RLTF" }));
    this.user$.subscribe(u => this.progress = 100);
    this.lodge$.subscribe(l => this.progress = 0);
  }

  switchLang(lang: string) {
    this._translate.use(lang);
  }

}
