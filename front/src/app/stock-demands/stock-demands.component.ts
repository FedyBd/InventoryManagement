import {Component, OnInit} from '@angular/core';
import {ApiService} from "../services/api.service";
import {Emitters} from "../emitters/emitters";
import {log} from "node:util";

@Component({
  selector: 'app-stock-demands',
  templateUrl: './stock-demands.component.html',
  styleUrl: './stock-demands.component.css'
})
export class StockDemandsComponent implements OnInit{
  constructor(private apiservice: ApiService,) {
  }

  demands: any[] = []; // List of demands
  filteredDemands: any[] = [];
  filterStatus: string = 'NOT CHECKED';
ngOnInit() {
    this.apiservice.getUser().subscribe(
      (res:any)=>{
        Emitters.UserType.emit(false);
        Emitters.authEmitter.emit(true);
        this.loadDemands(res.id);
      },(err:any)=>{

        console.log(err);
      }
    )
}

  loadDemands(id:number) {
    // Load demands from API or service
    this.apiservice.getDemands(id).subscribe(
      (res: any) => {
        console.log(`response:  ${res}`);
        this.demands = res.sort((a: any, b: any) => {
          return new Date(b.submissionDate).getTime() - new Date(a.submissionDate).getTime();
        });
        this.filterDemands();
      },
      (err: any) => console.error(err)
    );

  }
  filterDemands(): void {
    if (this.filterStatus === 'ALL') {
      this.filteredDemands = this.demands;
    } else {
      console.log(this.demands);
      console.log(`filtering based ${this.filterStatus}`);
      this.filteredDemands = this.demands.filter(demand => demand.status === this.filterStatus);
    }
  }

  confirmUpdate(demand: any) {
  console.log(`sending ${demand.status.toUpperCase()}`);
    // Confirm the update and send it to the server
    this.apiservice.updateDemandStatus(demand.id, demand.status.toUpperCase()).subscribe(
      (res: any) => {
        // Optionally reload demands to reflect changes
        this.loadDemands(res.magazineId);
      },
      (err: any) => console.error(err)
    );

  }

}
