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



    addCategory(category:any){
        category.user_type=localStorage.getItem("user_type");
        return this.http.post(`${environment.categoryUrl}/addCategory`,category);
    }

    getCategory(){
        return this.http.get(`${environment.categoryUrl}/allCategories`);

    }

    getSingleCategory(id:any){
        return this.http.get(`${environment.categoryUrl}/singleCategory/${id}`);
    }

    editCategory(id:any,data:any){
        return this.http.put(`${environment.categoryUrl}/editCategory/${id}`,data);
    }

    changeCategoryStatus(id:any,status:any){
        let category={id:id,status:status};
        return this.http.put(`${environment.categoryUrl}/changeCategoryStatus/${id}`,category);
    }

    deleteCategory(id:any){
        return this.http.delete(`${environment.categoryUrl}/deleteCategory/${id}`);
    }
}
