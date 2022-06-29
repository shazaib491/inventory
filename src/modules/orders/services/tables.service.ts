import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';

@Injectable()
export class TablesService {
    private messageSource = new BehaviorSubject<string>("default message");

    currentMessage = this.messageSource.asObservable();


    constructor(private http:HttpClient) {}
    // print button observer

   allPurchaseProducts(){
    return this.http.get(`${environment.ordersUrl}/allPurchaseProducts`);
   }


   addOrders(orders:any){
    return this.http.post(`${environment.ordersUrl}/addOrders`,orders);
   }

   getOrders(){
    return this.http.get(`${environment.ordersUrl}/allOrders`);
   }

   editOrder(id:string){
    return this.http.get(`${environment.ordersUrl}/singleOrder/${id}`);
   }

   updateOrder(id:string,orders:any){
    return this.http.put(`${environment.ordersUrl}/updateOrders/${id}`,orders);
   }

   deleteOrders(id:string){
    return this.http.delete(`${environment.ordersUrl}/deleteOrder/${id}`)
   }


   changeMessage(message: string) {
    this.messageSource.next(message)
  }
}
