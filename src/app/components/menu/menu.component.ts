import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { FirebaseAuthService } from './../../services/auth.firebase.service';
import { MenuItem } from './menu-item';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: '[menu]',
    templateUrl: 'menu.component.html'
})

export class MenuComponent implements OnInit {
    constructor(private _auth: FirebaseAuthService) { }

    menuItems: MenuItem[];

    ngOnInit() {
        this._auth.getUser().subscribe(
            is => {
                if (is !== null) {
                    this.menuItems = [{ title: "home", link: "/articles" }, { title: "users", link: "/users" }];
                } else {
                    this.menuItems = [];
                }
            }
        );
    }

}