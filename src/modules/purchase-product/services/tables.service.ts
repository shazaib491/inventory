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


    getPurchaseProduct(){
        return this.http.get(`${environment.purchaseProductUrl}/allPurchaseProduct`);
    }

    addProduct(purchaseProduct:any){
        return this.http.post(
            `${environment.purchaseProductUrl}/addPurchaseProduct`,
            purchaseProduct
        );
    }

    getPurchaseProducts(){
        return this.http.get(`${environment.purchaseProductUrl}/getPurchaseProducts`)
    }

    getSinglePurchaseProduct(id:any){
        return this.http.get(`${environment.purchaseProductUrl}/editPurchaseProduct/${id}`);
    }


    editPurchaseProduct(id:any,data:any){
        return this.http.put(`${environment.purchaseProductUrl}/updatedPurchaseProductStatus/${id}`,data);
    }


    changePurchaseProductStatus(id:any,status:any){
        let pruchaseProduct={status:status};
        return this.http.put(`${environment.purchaseProductUrl}/changePurchaseProductStatus/${id}`,pruchaseProduct);

    }


    deletePurchaseProduct(id:any){
        return this.http.delete(`${environment.purchaseProductUrl}/deletePurchaseProduct/${id}`);

    }
}
