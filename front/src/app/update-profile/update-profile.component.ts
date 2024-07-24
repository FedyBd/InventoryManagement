import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {ApiService} from "../services/api.service";
import {switchMap, tap} from "rxjs";
import {User} from "../models/user.model";
import {Emitters} from "../emitters/emitters";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.css'
})
export class UpdateProfileComponent implements OnInit{

  form!: FormGroup;

  constructor(private http: HttpClient,
              private formBuilder: FormBuilder,
              private apiservice: ApiService,
              private router: Router,
              private snackBar: MatSnackBar,) {}
  magasins :any []=[];

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: [{ value: null, disabled: true }, [Validators.required]],
      name: [null, [Validators.required]],
      email: [null, [Validators.required]],
      phone: [null, [Validators.required]],
    });

    this.apiservice.getUser().subscribe(
      (user: User) => {
        if(user.type==='Office'){
          Emitters.UserType.emit(true);
        }else{Emitters.UserType.emit(false);}
        Emitters.authEmitter.emit(true);
        this.form.patchValue({
          id: user.id,
          name: user.name,
          email: user.email,
          phone:user.phone,
        });
      },
      (error: any) => {
        Emitters.authEmitter.emit(false);
        console.error('Error fetching user:', error); // Handle error response
      }

    );
    this.apiservice.getMagasinUsers().subscribe(
      (magasins: any) => {
        this.magasins = magasins;
      },
      (error) => {
        console.error('Error fetching magasins:', error);
      }
    );
  }

update(){
    console.log(this.form.getRawValue());
  const formValue = this.form.getRawValue();
  const userId = formValue.id;
  const updatedUser:{name:string,email:string, phone:string} = {
    name: formValue.name,
    phone:formValue.phone,
    email: formValue.email,
  };
    this.apiservice.updateUsername(updatedUser,userId).subscribe(
      () => {
        this.snackBar.open('User details successfully updated!', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
          panelClass: ['success-snackbar']
        });
        this.router.navigate(['/profile']);
      },
      (error) => {
        console.error('Error updating profile:', error);
        this.snackBar.open('Failed to update user details. Please try again.', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
          panelClass: ['error-snackbar']
        });
      }
    );
}

}
