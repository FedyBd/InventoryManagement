import {Component, OnInit} from '@angular/core';
import {Stock} from "../models/stock.model";
import {ApiService} from "../services/api.service";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Emitters} from "../emitters/emitters";

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrl: './stocks.component.css'
})
export class StocksComponent implements OnInit{

  constructor(private apiservice: ApiService , private http: HttpClient, private snackBar: MatSnackBar) {}

  userId !: number;
  magasinId!: number;
  username='';
  stocks: any= [];
  authenticated=false;
  type=false;
  message='';
ngOnInit() {
  console.log('hhhhhhhhh')
  this.http.get('http://localhost:3000/auth/user', {withCredentials:true}).subscribe(
    (res:any) =>{
      console.log(res.name);
      this.authenticated =true;
      this.message=`Hi ${res.name}`;
      this.userId=res.id;
      this.magasinId=res.magasinId;
      if(res.type==='Office'){
        Emitters.UserType.emit(true);
        this.username=`office of ${res.name}`;
      }
      else if(res.type==='Store'){Emitters.UserType.emit(false); this.username=`Magazine of ${res.name}`;}
      Emitters.authEmitter.emit(true);
      this.getStocks(res.id);
    },
    err=>{
      this.userId=-1;
      this.authenticated=false;
      console.log(err);
      this.message='You are not logged in ';
      Emitters.authEmitter.emit(false);
    }
  )
}

  getStocks(id:number) {
  console.log('get')
    this.apiservice.getAllStocks(id).subscribe(
      (data) => {
        this.stocks = data;
        console.log(this.stocks);
      },
      (error) => {
        console.error('Error fetching stocks', error);
      }
    );
  }



  editStock(stock: Stock): void {
    stock.editing = true;
  }

  cancelEdit(stock: Stock): void {
    stock.editing=false;
  }

  saveChanges(stock: Stock): void {
    const oldQuantity = stock.quantity;
    const newQuantity = stock.editedQuantity;

    this.apiservice.updateStock(stock.id, { quantity: newQuantity }).subscribe(
      (updatedStock: Stock) => {
        console.log('Stock updated successfully:', updatedStock);
        if (newQuantity != null) {
          stock.quantity = newQuantity;
        } // Update the displayed quantity
        stock.editing = false; // Hide edit form

        // Calculate the difference
        // @ts-ignore
        const difference = newQuantity - oldQuantity;

        // Show snackbar with success message and difference
        this.snackBar.open(`Stock modified successfully. Difference: ${difference}`, 'Close', {
          duration: 10000, // Duration in milliseconds
        });
        this.http.post('http://localhost:3000/requests', {
          userId: this.userId,
          stockId: stock.id,
          magazineId: this.magasinId,
          difference: difference
        }).subscribe();
      },
      (error) => {
        console.error('Error updating stock:', error);
        // Handle error scenario
      }
    );
  }
}
