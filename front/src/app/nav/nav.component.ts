import {Component, OnInit} from '@angular/core';
import {Emitters} from "../emitters/emitters";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import { ViewportScroller } from '@angular/common';
import {filter} from "rxjs";


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {

 isAuthenticated!: boolean;
 type !: boolean;
 isHomeRoute: boolean = false;
 constructor(private http: HttpClient,
             private router: Router,
             private viewportScroller: ViewportScroller,
             private activatedRoute: ActivatedRoute) {
 }
 ngOnInit() {

   Emitters.authEmitter.subscribe(
     (auth: boolean)=>{
       this.isAuthenticated=auth;
     }
   )
   Emitters.UserType.subscribe(
     (type: boolean)=>{
       this.type=type;
     }
   )
   this.router.events.pipe(
     filter(event => event instanceof NavigationEnd)
   ).subscribe(() => {
     this.checkIfHomeRoute();
   });

   this.checkIfHomeRoute();
 }
  checkIfHomeRoute(): void {
    const currentRoute = this.activatedRoute.root.firstChild?.snapshot.url[0]?.path;
    this.isHomeRoute = currentRoute === 'home';
  }

 Logout(){
   this.http.post('http://localhost:3000/auth/logout',{},{withCredentials:true}
   ).subscribe(()=>{
     this.isAuthenticated=false;
     this.router.navigateByUrl('/home')
   })
 }

  scrollToSection(sectionId: string) {
    this.viewportScroller.scrollToAnchor(sectionId);
  }
}
