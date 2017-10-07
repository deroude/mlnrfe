import { Pipe, PipeTransform, ElementRef } from '@angular/core';
import { TranslateService } from 'app/services/translate.service';


@Pipe({ name: 'translate' ,pure:false})
export class TranslatePipe implements PipeTransform {
    constructor(private _translate: TranslateService) { }
    transform(value: string, args: any[]): any {
        if (!value) return;
        return this._translate.instant(value);
    }
}
