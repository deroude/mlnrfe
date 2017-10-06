import { FirebaseAuthService } from './../../services/auth.firebase.service';
import { Observable } from 'rxjs/Observable';
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
        _auth.getUser().subscribe(t => {
            if (t) {
                this.loggedIn.next(true);
            } else {
                this.loggedIn.next(false);
            }
        });
    }

    ngOnInit() { }

    login(): void {
        this.loading = true;
        this.loginFailed = false;
        this._auth.login(this.model.email, this.model.password).subscribe(tk => {
            console.log(tk);
            this.loading = false;
            this._router.navigate(['/articles']);
        }, err => {            
            this.loginFailed=true;
        });
    }

    logout(): void {
        this._auth.logout();
        this._router.navigate(['/']);
    }
}