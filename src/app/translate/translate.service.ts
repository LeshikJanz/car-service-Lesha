import {Injectable, Inject, EventEmitter } from '@angular/core';
import { TRANSLATIONS } from './translation'; // import our opaque token
import { OpaqueToken } from '@angular/core'

@Injectable()
export class TranslateService {
    private _currentLang: string;
    private PLACEHOLDER = '%'
    public onLangChanged: EventEmitter<string> = new EventEmitter<string>();

    private _defaultLang: string;
    private _fallback: boolean;


    // inject our translations
    constructor(@Inject(TRANSLATIONS) private _translations: any) {
    }

     public get currentLang() {
        return this._currentLang || this._defaultLang;
    }

    public setDefaultLang(lang: string) {
        this._defaultLang = lang;
    }

    public enableFallback(enable: boolean) {
        this._fallback = enable;
    }

    public use(lang: string): void {
        // set current language
        this._currentLang = lang;
        this.onLangChanged.emit(lang);
    }

    public replace(word: string = '', words: string | string[] = '') {
        let translation: string = word;

        const values: string[] = [].concat(words);
        values.forEach((e, i) => {
            translation = translation.replace(this.PLACEHOLDER.concat(<any>i), e);
        });

         return translation;
    }

    public translate(key: string): string {
        let translation = key;

        if (this._translations[this.currentLang] && this._translations[this.currentLang][key]) {
            return this._translations[this.currentLang][key];
        }

        if (!this._fallback) { 
            return translation;
        }

        if (this._translations[this._defaultLang] && this._translations[this._defaultLang][key]) {
            return this._translations[this._defaultLang][key];
        }

        return translation;
    }

    public instant(key: string,  words?: string | string[]) {
        const translation: string = this.translate(key);

        if (!words) return translation;
        return this.replace(translation, words);
    }
}