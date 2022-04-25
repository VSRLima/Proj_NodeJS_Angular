import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IOrders } from '../../model/Orders/IOrders';
import { Orders } from '../../model/Orders/Orders';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(
    private http: HttpClient
  ) { }

  public getOrders(): Observable<IOrders[]> {
    return this.http.get<Orders[]>(`${environment.baseAPI}/api/getOrders`);
  }

  public getOrderById(orderId: number): Observable<IOrders> {
    return this.http.get<Orders>(`${environment.baseAPI}/api/getOrderById/${orderId}`);
  }

  public saveOrder(order: IOrders): Observable<IOrders> {
    return this.http.post<Orders>(`${environment.baseAPI}/api/saveOrder`, order);
  }

  public deleteOrder(orderId: number): Observable<any> {
    return this.http.delete(`${environment.baseAPI}/api/deleteOrder/${orderId}`);
  }

  public updateOrder(orderId: number, orderMod: IOrders): Observable<any> {
    return this.http.put(`${environment.baseAPI}/api/updateOrder/${orderId}`, orderMod);
  }
}
