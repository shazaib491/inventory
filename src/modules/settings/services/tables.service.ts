import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, of } from 'rxjs';

@Injectable()
export class TablesService {
    constructor(private http:HttpClient) {}

    getTables$(): Observable<{}> {
        return of({});
    }



    getStoreDetail(){
        return this.http.get(`${environment.authUrl}auth/store/store`);
    }


    modifyStore(id:any,data:any){
        data.id=id;
        return this.http.post(`${environment.authUrl}auth/store/editStore`,data);
    }


    modifyMaster(){
        let userid=localStorage.getItem("userId");
        return this.http.get(`${environment.authUrl}auth/masterInformation/${userid}`);
    }

    modifyMasterDetail(userInfo:any){
        let userid=localStorage.getItem("userId");
        let user_type=localStorage.getItem("user_type");
        userInfo.user_type=user_type;
        userInfo.id=userid;
        return this.http.post(`${environment.authUrl}auth/forgotMasterPassword`,userInfo);

    }
}
