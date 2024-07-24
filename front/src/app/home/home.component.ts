import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Emitters} from "../emitters/emitters";
import {ApiService} from "../services/api.service";
import {NavigationEnd, Router} from "@angular/router";
import { MatSnackBar } from '@angular/material/snack-bar';
import {ViewportScroller} from "@angular/common";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
message='';
userId !: number;
magasinId!: number;
username='';
stocks: any;
protected authenticated!:boolean;
protected relatedUsers :any;
  type=false;
  begin_message='';
  isoffice!: boolean;
  constructor(private http: HttpClient, private apiservice: ApiService,private router: Router,
              private snackBar: MatSnackBar,
              private viewportScroller: ViewportScroller) {
  }

  async ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.viewportScroller.scrollToPosition([0, 0]);
      }
    });

  this.http.get('http://localhost:3000/auth/user', {withCredentials:true}).subscribe(
    (res:any) =>{
      console.log(res.name);
      this.authenticated = true;
      this.message=`Hi ${res.name}`;
      this.userId=res.id;
      this.magasinId=res.magasinId;
      if(res.type==='Office'){
        this.isoffice=true;
        Emitters.UserType.emit(true);
        this.begin_message='you can begin by visualizing your current stock levels by scrolling down to the next page';
        this.username=`office of ${res.name}`;
      }
      else if(res.type==='Store'){
        this.isoffice=false;
        Emitters.UserType.emit(false);
        this.username=`Magazine of ${res.name}`;
        this.begin_message='you can begin by visualizing your latest stock demands by navigating to the corresponding page';
        this.fetchRelatedUsers(res.id);
      }

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
    this.apiservice.getAllStocks(id).subscribe(
      (data) => {
        this.stocks = data;
      },
      (error) => {
        console.error('Error fetching stocks', error);
      }
    );
  }


  fetchRelatedUsers(id:number): void {
    this.apiservice.getRelatedUsers(id).subscribe(users => {
      this.relatedUsers = users;
      console.log(this.relatedUsers);
    });
  }


}
