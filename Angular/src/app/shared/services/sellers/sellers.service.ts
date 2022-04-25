import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ISellers } from '../../model/Sellers/ISellers';
import { Sellers } from '../../model/Sellers/Sellers';

@Injectable({
  providedIn: 'root'
})
export class SellersService {

  constructor(
    private http: HttpClient
  ) { }

  public getSellers(): Observable<ISellers[]> {
    return this.http.get<Sellers[]>(`${environment.baseAPI}/api/getSellers`);
  }

  public getSellerById(sellerId: number): Observable<ISellers> {
    return this.http.get<Sellers>(`${environment.baseAPI}/api/getSellerById/${sellerId}`);
  }

  public saveSeller(seller: ISellers): Observable<any> {
    return this.http.post(`${environment.baseAPI}/api/saveSeller`, seller);
  }

  public deleteSeller(sellerId: number): Observable<any> {
    return this.http.delete(`${environment.baseAPI}/api/deleteSeller/${sellerId}`);
  }

  public updateSeller(sellerId: number, sellerMod: ISellers): Observable<any> {
    return this.http.put(`${environment.baseAPI}/api/updateSeller/${sellerId}`, sellerMod);
  }

  public topSellers(): Observable<any> {
    return this.http.get(`${environment.baseAPI}/api/topSellers`);
  }
}
