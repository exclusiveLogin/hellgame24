import { Injectable } from '@angular/core';
import { IUser } from '../models/user-interface';
import { ILogin } from './auth.service';

@Injectable({providedIn: 'root'})
export class LsService {

    constructor() {
        console.log('LS: ', this);
     }

    public setUserCredential( user: { login: string, password: string }) {
        this.setData( 'currentUser', user );
    }

    public getUserCredential( ): ILogin {
        return this.getData( 'currentUser' );
    }

    public unsetUserCredential(): void {
        this.removeItem( 'currentUser' );
    }


    public setData( key: string, data: any ) {
        if (!localStorage) { return; }

        localStorage.setItem( key, JSON.stringify(data));
    }

    public getData<T>( key: string ): T {
        if ( !localStorage ) { return null; }

        return JSON.parse(localStorage.getItem( key )) as T;
    }

    public removeItem( key: string ) {
        if (!localStorage) { return; }

        localStorage.removeItem( key );
    }

}

