import { MailService } from './services/mail.service';
import { TranslatePipe } from './directives/translate.pipe';
import { FirebaseAuthService } from './services/auth.firebase.service';
import { MenuComponent } from './components/menu/menu.component';
import { FrontPageComponent } from './components/front-page/front-page.component';
import { PagenNotFoundComponent } from './components/pagenotfound/pagenotfound.component';
import { ArticleListComponent } from './components/article/article-list.component';
import { UserListComponent } from './components/user/user-list.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { ResourceService } from './services/resource.service';
import { TranslateService } from './services/translate.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import {CookieService} from 'ngx-cookie-service';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    UserListComponent,
    ArticleListComponent,
    PagenNotFoundComponent,
    FrontPageComponent,
    TranslatePipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [CookieService,FirebaseAuthService,ResourceService,TranslateService,MailService],
  bootstrap: [AppComponent]
})
export class AppModule { }
