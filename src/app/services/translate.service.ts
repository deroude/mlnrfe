import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';

@Injectable()
export class TranslateService {
    private _currentLang: string = this._cookie.check("lang") ? this._cookie.get("lang") : navigator.language.substring(0, 2);

    constructor(private _cookie: CookieService) { }

    public get currentLang() {
        return this._currentLang;
    }

    public use(lang: string): void {
        // set current language
        this._currentLang = lang;
        this._cookie.set("lang", lang);
    }

    private translate(key: string): string {
        // private perform translation
        let translation = key;

        if (translations[this.currentLang] && translations[this.currentLang][key]) {
            return translations[this.currentLang][key];
        }

        return translation;
    }

    public instant(key: string) {
        // call translation
        return this.translate(key);
    }
}

export const translations: any = {
    ro: {
        home: "Acasa",
        users: "Utilizatori",
        email: "Adresa de Email",
        password: "Parola",
        login: "Autentificare",
        logout: "Iesire",
        failedLogin: "Utilizator sau parola incorecte"
    },
    en: {
        home: "Home",
        users: "Users",
        email: "Email address",
        password: "Password",
        login: "Login",
        logout: "Logout",
        failedLogin: "Wrong user or password"
    }
}