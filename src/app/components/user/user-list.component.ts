import { ResourceService } from './../../services/resource.service';
import { User } from './../../domain/user';

import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'user-list',
    templateUrl: 'user-list.component.html'
})

export class UserListComponent implements OnInit {
    constructor(private _res:ResourceService) { }

    users:Observable<User[]>

    ngOnInit() { }

    refresh(){
        this.users=this._res.getList("/api/user");
    }
}