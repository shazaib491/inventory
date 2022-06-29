import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { async } from '@angular/core/testing';
import { environment } from 'environments/environment';
import moment from "moment-timezone";
import { Observable, ReplaySubject } from 'rxjs';
import { Store } from '../models';
import { currency_list } from './currency/currency';
import { aryIannaTimeZones } from './currency/timezone';

const userSubject: ReplaySubject<any> = new ReplaySubject(1);

@Injectable()
export class UserService {
    constructor(private http: HttpClient) {
        this.user = {
            id: '123',
            firstName: 'Start',
            lastName: 'Bootstrap',
            email: 'no-reply@startbootstrap.com',
        };
    }

    set user(user: any) {
        userSubject.next(user);
    }

    get user$(): Observable<any> {
        return userSubject.asObservable();
    }

    addStore(billingAddress: Store) {
        return this.http.post(`${environment.authUrl}auth/store/addStore`,billingAddress);
    }

    getRequest(){
        var time =aryIannaTimeZones;
        let timezone=time.map((zone:any)=>{
            return {
                time:moment().tz(zone).format(),
                timezone:zone
            }
        })
       return timezone;

    }


    getCurrency(){
        return currency_list;
    }

    IsmasterExist(){
        return this.http.get(`${environment.authUrl}auth/checkForMaster`);
    }


    forgotUserPassword(info:any){
        return this.http.post(`${environment.authUrl}auth/forgotUserPassword`,info) ;
    }
}
