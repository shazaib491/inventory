import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, of } from 'rxjs';

interface User{
    user_name:string;
    user_status:string;
    user_type:string;

}


@Injectable()
export class TablesService {
    constructor(private http:HttpClient) {}

    getTables$(): Observable<{}> {
        return of({});
    }


    addUser(user:any){
        return this.http.post(`${environment.authUrl}auth/addUser`,user);
    }

    getUsers$(){
        return this.http.get(`${environment.authUrl}auth/allUser`);
    }

    getSingleUser(id:any){
        return this.http.get(`${environment.authUrl}auth/singleUser/${id}`);

    }


    updateSingleUser(id:any,data:any){
        console.log(`${environment.authUrl}auth/updatedUser/${id}`,data)
        data.id=id;
        return this.http.put(`${environment.authUrl}auth/updatedUser`,data);

    }

    changeUserStatus(id:any,status:any){
        let user={id:id,status:status};
        return this.http.post(`${environment.authUrl}auth/changeStaus`,user);
    }

    deleteUser(id:any){
        return this.http.delete(`${environment.authUrl}auth/deleteSingleUser/${id}`);
    }
}
