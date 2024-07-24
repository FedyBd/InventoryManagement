import {Component, OnInit} from '@angular/core';
import {Emitters} from "../emitters/emitters";
import {HttpClient} from "@angular/common/http";
import {User} from '../models/user.model'
import {ApiService} from "../services/api.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  constructor(private http: HttpClient, private apiservice: ApiService) {
  }
  name='';
  email='';
  phone='';
  magasin='';
  magasinID!:number;
  is_magazine !: boolean;
  message='';
  not_auth = true;
  userId=-1;
ngOnInit() {
  this.http.get('http://localhost:3000/auth/user', {withCredentials:true}).subscribe(
    (res:any) =>{
      if(res.type==='Office'){
        Emitters.UserType.emit(true);
        this.magasinID=res.magasinId;
        this.http.get(`http://localhost:3000/user/magname/${res.magasinId}`).subscribe(
          (res:any) =>{this.magasin=res.name;}
        )
      }
      else{
        Emitters.UserType.emit(false);
      }
      Emitters.authEmitter.emit(true);
      this.userId=res.id;
      this.not_auth=false;
      this.name=res.name;
      this.email=res.email;
      this.phone=res.phone;
      this.is_magazine = res.type !== 'Office';
    },

    err=>{
      Emitters.authEmitter.emit(false);
      this.not_auth=true;
      this.message='ACCESS DENIED Please Log in first';
    }
  )
}

}
