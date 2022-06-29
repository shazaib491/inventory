import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, of } from 'rxjs';

@Injectable()
export class TablesService {
    constructor(private http:HttpClient) {}

    addTax(tax:any){
        return this.http.post(`${environment.taxUrl}/addTax`,tax);
    }

    getTax(){
        return this.http.get(`${environment.taxUrl}/allTax`);

    }

    getSingleTax(id:any){
        return this.http.get(`${environment.taxUrl}/singleTax/${id}`);
    }

    editTax(id:any,data:any){
        return this.http.put(`${environment.taxUrl}/editTax/${id}`,data);
    }

    changeTaxStatus(id:any,status:any){
        let company={id:id,status:status};
        return this.http.put(`${environment.taxUrl}/changeTaxStatus/${id}`,company);
    }

    deleteTax(id:any){
        return this.http.delete(`${environment.taxUrl}/deleteTax/${id}`);
    }

}
