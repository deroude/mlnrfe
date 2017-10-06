import { FirebaseAuthService } from './../../services/auth.firebase.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { User } from './../../domain/user';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
    selector: '[login]',
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    model: User = new User();
    loading: boolean = false;
    loginFailed = false;
    loggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);

    constructor(private _auth: FirebaseAuthService, private _router: Router) {
    }

    ngOnInit() { 
        this._auth.getUser().subscribe(u=>{if(u!==null) this.loggedIn.next(true)});
    }

    login(): void {
        this.loading = true;
        this.loginFailed = false;
        this._auth.login(this.model.email, this.model.password).subscribe(tk => {
            this.loading = false;
            this.loggedIn.next(true);
            this._router.navigate(['/articles']);
        }, err => {
            this.loginFailed = true;
        });
    }

    logout(): void {
        this._auth.logout().subscribe(x => this.loggedIn.next(false));
        this._router.navigate(['/']);
    }
}