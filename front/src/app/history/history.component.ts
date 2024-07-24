import {Component, OnInit} from '@angular/core';
import {User} from "../models/user.model";
import {Emitters} from "../emitters/emitters";
import {ApiService} from "../services/api.service";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent implements OnInit{
constructor(private apiservice: ApiService) {
}

  requests : any[] =[];
  searchQuery: string = '';
  filteredRequests: any[] = [];
ngOnInit() {
  this.apiservice.getUser().subscribe(
    (user: User) => {
      if(user.type==='Office'){
        Emitters.UserType.emit(true);
        this.apiservice.getHistOffice(user.id).subscribe(
          (res:any)=>{
            this.requests = res.sort((a: any, b: any) => {
              return new Date(b.submissionDate).getTime() - new Date(a.submissionDate).getTime();
            });
            this.filteredRequests = this.requests;
            },
          (err:any)=>{console.log(err);}
        )
      }
      else{Emitters.UserType.emit(false);}
      Emitters.authEmitter.emit(true);
    },(error: any) => {
      console.log(error);
      Emitters.authEmitter.emit(false);
    }
    )
}

  ngOnChanges() {
    this.filterRequests();
  }

  filterRequests() {
    if (this.searchQuery) {
      this.filteredRequests = this.requests.filter(request =>
        request.stock.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredRequests = this.requests;
    }
  }
}
