import { Article } from './../../domain/article';
import { Observable } from 'rxjs/Observable';
import { ResourceService } from './../../services/resource.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'articles',
    templateUrl: 'article-list.component.html'
})

export class ArticleListComponent implements OnInit {
    constructor(private _resource:ResourceService<Article>) { }

    articles:Observable<Article[]>;

    ngOnInit() { 
        this.articles=this._resource.getList("/articles_private",ref=>ref.orderBy("publishedDate","desc").limit(10));
    }
}