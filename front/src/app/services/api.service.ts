import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Stock} from "../models/stock.model";
import {User} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000'; // Replace with your API URL

  constructor(private http: HttpClient) {
  }


  getUser():any{
    return this.http.get(`${this.apiUrl}/auth/user`,{withCredentials:true});
  }
  updateUsername(update:any, id :number){
    return this.http.patch(`${this.apiUrl}/user/${id}`,update,{withCredentials:true});
  }
  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/user/register`+user.id, user);
  }

  getAllStocks(userId: number) {
    return this.http.get(`${this.apiUrl}/stocks/${userId}`, {withCredentials: true});
  }


  updateStock(id: number, update: Partial<Stock>): Observable<Stock> {
    return this.http.patch<Stock>(`${this.apiUrl}/stocks/${id}`, update, {withCredentials: true});
  }

  getMagasinUsers() {
    return this.http.get('http://localhost:3000/user/magazins');
  }

  getHistOffice(id:number) {
    return this.http.get(`${this.apiUrl}/requests/${id}`,{withCredentials:true});
  }

  getMagname(id:any) {
    return this.http.get(`http://localhost:3000/user/magname/${id}`);
  }

  sendDemand(formvalue:any) {
    const demandData = {
      stockId: formvalue.stockId,
      userId: formvalue.userId,
      magazineId: formvalue.magazineId,
      quantity: formvalue.quantity,
    };
    return this.http.post(`${this.apiUrl}/demands`, demandData);
  }

  getRequests(id:number) {
    return this.http.get(`${this.apiUrl}/demands/${id}`);
  }

  getDemands(id:number){
    return this.http.get(`${this.apiUrl}/demands/mag/${id}`);
  }

  updateDemandStatus(id:number, status:string) {
    const update={"status": status};
    return this.http.patch(`${this.apiUrl}/demands/${id}`, update,{withCredentials:true});
  }

  getRelatedUsers(id:number) {
    return this.http.get(`${this.apiUrl}/user/formag/${id}`,{withCredentials:true});
  }
}
