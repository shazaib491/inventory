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

    addLocationRk(locationRk:any){
        locationRk.user_type=localStorage.getItem("user_type");
        console.log(locationRk);
        return this.http.post(`${environment.locationRkUrl}/addLocationRk`,locationRk);
    }

    getLocationRk(){
        return this.http.get(`${environment.locationRkUrl}/allLocationRk`);

    }

    getSinglelLocationRk(id:any){
        return this.http.get(`${environment.locationRkUrl}/singleLocationRk/${id}`);
    }

    editLocationRk(id:any,data:any){
        return this.http.put(`${environment.locationRkUrl}/editLocationRk/${id}`,data);
    }

    changeLocationRkStatus(id:any,status:any){
        let locationRk={id:id,status:status};
        return this.http.put(`${environment.locationRkUrl}/changeLocationRkStatus/${id}`,locationRk);
    }

    deleteLocationRk(id:any){
        return this.http.delete(`${environment.locationRkUrl}/deleteLocationRk/${id}`);
    }
}
