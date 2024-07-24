import {Component, OnInit} from '@angular/core';
import {ApiService} from "../services/api.service";
import {User} from "../models/user.model";
import {Emitters} from "../emitters/emitters";

@Component({
  selector: 'app-requests-history',
  templateUrl: './requests-history.component.html',
  styleUrl: './requests-history.component.css'
})
export class RequestsHistoryComponent implements OnInit{

  requests : any[]=[];
  filteredDemands: any[] = []; // List of demands after filtering
  selectedStatus: string = ''; // Selected status for filtering
  searchStockName: string = ''; // Stock name to filter by

  constructor(private apiservice: ApiService) {
  }

ngOnInit() {
    this.apiservice.getUser().subscribe(
      (user: User) => {
        this.apiservice.getRequests(user.id).subscribe(
          (res:any)=>{
            console.log(res);
            if(user.type==='Office'){
              Emitters.UserType.emit(true);
            }
            else{Emitters.UserType.emit(true);}

            this.requests = res.sort((a: any, b: any) => {
              return new Date(b.submissionDate).getTime() - new Date(a.submissionDate).getTime();
            });
            Emitters.authEmitter.emit(true);
            this.filteredDemands=this.requests;
          },(error:any)=>{
            Emitters.authEmitter.emit(false);
          }
        );
      }
    )
}
  filterDemands() {

    this.filteredDemands = this.requests.filter(demand => {
      const matchesStatus = this.selectedStatus ? demand.status === this.selectedStatus : true;
      const matchesStockName = this.searchStockName ? demand.stock.name.toLowerCase().includes(this.searchStockName.toLowerCase()) : true;
      return matchesStatus && matchesStockName;
    });
  }
}
