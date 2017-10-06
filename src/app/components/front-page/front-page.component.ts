import { Observable } from 'rxjs/Observable';
import { Article } from './../../domain/article';
import { ResourceService } from './../../services/resource.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'front-page',
    templateUrl: 'front-page.component.html'
})

export class FrontPageComponent implements OnInit {
    constructor(private _resource: ResourceService) { }

    articles:Observable<any>

    ngOnInit() { 
        this.articles=this._resource.getList("/articles_public",ref=>ref.orderBy("publishedDate","desc").limit(10));
    }
}