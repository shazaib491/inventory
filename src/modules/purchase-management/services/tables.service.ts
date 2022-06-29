import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, of } from 'rxjs';

@Injectable()
export class TablesService {
    constructor(private http: HttpClient) {}

    getTables$(): Observable<{}> {
        return of({});
    }

    allProduct() {
        return this.http.get(`${environment.productUrl}/allProduct`);
    }

    addProduct(product:any){
        return this.http.post(`${environment.productUrl}/addProduct`,product);
    }

    getTableProduct(){
        return this.http.get(`${environment.productUrl}/getProducts`);
    }


    getSingleProduct(id:any){
        return this.http.get(`${environment.productUrl}/editProduct/${id}`);
    }

    editProduct(id:any,data:any){
        return this.http.put(`${environment.productUrl}/updateProduct/${id}`,data);
    }

    changeProductStatus(id:any,status:any){
        let product={status:status};
        return this.http.put(`${environment.productUrl}/changeProductStatus/${id}`,product);
    }

    deleteProduct(id:any){
        return this.http.delete(`${environment.productUrl}/deleteProduct/${id}`);
    }
}
