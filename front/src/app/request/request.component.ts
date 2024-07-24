import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../services/api.service";
import {User} from "../models/user.model";
import {Emitters} from "../emitters/emitters";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrl: './request.component.css'
})
export class RequestComponent implements OnInit{
  stockRequestForm: FormGroup;
  stocks : any[] = [];
  magname:string='';
  magid:number=0;
  username:string='';
  userid:number=0;
  constructor(private fb: FormBuilder,private apiservice: ApiService,private snackBar: MatSnackBar,private router:Router) {
    this.stockRequestForm = this.fb.group({
      stockId: ['', Validators.required],
      userId: [{ value: '', disabled: true }, Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
      magazineId: [{ value: '', disabled: true }, Validators.required],
    });
  }
  ngOnInit() {
    this.apiservice.getUser().subscribe(
      (user: User) => {
        if(user.type==='Office'){
          Emitters.UserType.emit(true);}
        else{Emitters.UserType.emit(false);}
        this.username=user.name;
        this.userid=user.id;
        this.apiservice.getAllStocks(user.id).subscribe(
          (res:any)=>{
            this.stocks = res;
            this.apiservice.getMagname(user.magasinId).subscribe(
              (res:any)=>{
                this.magname=res.name;
                this.magid=res.id;
                this.stockRequestForm.patchValue({
                  magazineId: res.id,
                });
              }
            )

          })
        this.stockRequestForm.patchValue({
          userId: this.userid,
        });
        Emitters.authEmitter.emit(true);
      },(err:any)=> {
        Emitters.authEmitter.emit(false);
        console.log(err);
      }
    );

  }

  onSubmit() {
    if (this.stockRequestForm.valid) {
      this.apiservice.sendDemand(this.stockRequestForm.getRawValue()).subscribe(
        (response: any) => {
          // Display snackbar message on success
          this.snackBar.open('Demand sent successfully!', 'Close', {
            duration: 3000, // Duration in milliseconds
          });
          // Reset the form after successful submission
          this.stockRequestForm.reset();
        },
        (error:any) => {
          // Handle error if needed
          console.error('Error sending demand:', error);
          this.snackBar.open('Failed to send demand. Please try again.', 'Close', {
            duration: 3000,
          });
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }

  onReset() {
    this.stockRequestForm.reset();
  }

  visualizeDemands() {
    this.router.navigateByUrl('/request-history')
  }
}
