import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { Supplier } from '@modules/tables/models';
import { environment } from 'environments/environment';
import { Observable, of, Subject } from 'rxjs';
import * as rxjs from 'rxjs'
import * as rxops from 'rxjs/operators';
import { Suppliers } from '../models';
@Injectable()
export class TablesService {
    constructor(private http: HttpClient) {}
    suppliers!:Suppliers[];
    callForParent = new Subject<string>();
    getTables$(): Observable<{}> {
        return of({});
    }

    addSupplier(supplier: any): Observable<any> {
        return this.http.post(`${environment.supplierUrl}/addSupplier`, supplier);
    }

    getSupplier(){
        return this.http.get(`${environment.supplierUrl}/allSuppliers`).subscribe((res: any) => {
            this.suppliers = res.supplers;
        });
    }

    getSingleRecord(id: string) {
        return this.http.get(`${environment.supplierUrl}/singleSupplier/${id}`)
    }

    editSupplier(id: string, supplier: any) {
        return this.http.put(`${environment.supplierUrl}/editSupplier/${id}`,supplier)

    }

    changeStaus(id:string,status:any){
        let user_type=localStorage.getItem("user_type");
        let data={
            status:status,
            user_type:user_type
        }
        return this.http.put(`${environment.supplierUrl}/changeSupplierStatus/${id}`,data)
    }

    deleteSupplier(id:string){
        return this.http.delete(`${environment.supplierUrl}/deleteSupplier/${id}`);

    }
}
