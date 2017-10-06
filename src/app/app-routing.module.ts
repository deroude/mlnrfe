import { FirebaseAuthService } from './services/auth.firebase.service';
import { FrontPageComponent } from './components/front-page/front-page.component';
import { ArticleListComponent } from './components/article/article-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagenNotFoundComponent } from './components/pagenotfound/pagenotfound.component';
import { UserListComponent } from './components/user/user-list.component';

const appRoutes: Routes = [
  { path: 'users', component: UserListComponent, canActivate: [FirebaseAuthService] },
  { path: 'articles', component: ArticleListComponent, canActivate: [FirebaseAuthService] },
  { path: '', component: FrontPageComponent },
  { path: '**', component: PagenNotFoundComponent }
];

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ]
})
export class AppRoutingModule { }
