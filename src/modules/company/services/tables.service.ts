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



    addCompany(company:any){
        company.user_type=localStorage.getItem("user_type");
        return this.http.post(`${environment.campanyUrl}/addCompany`,company);
    }

    getCompany(){
        return this.http.get(`${environment.campanyUrl}/allCompanies`);

    }

    getSingleCompany(id:any){
        return this.http.get(`${environment.campanyUrl}/singleCompany/${id}`);
    }

    editCompany(id:any,data:any){
        return this.http.put(`${environment.campanyUrl}/editCompany/${id}`,data);
    }

    changeCompanyStatus(id:any,status:any){
        let company={id:id,status:status};
        return this.http.put(`${environment.campanyUrl}/changeCompanyStatus/${id}`,company);
    }

    deleteCompany(id:any){
        return this.http.delete(`${environment.campanyUrl}/deleteCompany/${id}`);
    }
}
