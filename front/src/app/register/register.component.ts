import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ApiService} from "../services/api.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm !: FormGroup ;
  magasins: any[] = []; // Replace with your magasin model if available
  isOffice = true;
  constructor(private fb: FormBuilder, private apiservice: ApiService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      type: ['Office', Validators.required],
      magasinId: [null]
    });
    this.loadMagasins();
    this.onTypeChange();
  }

  loadMagasins() {
    // Load magasin users from the backend
    // @ts-ignore
    this.apiservice.getMagasinUsers().subscribe((data: any[]) => {
      this.magasins = data;
    });
  }

  onTypeChange() {
    // @ts-ignore
    this.isOffice = this.registerForm.get('type').value === 'Office';
    const magasinControl = this.registerForm.get('magasinId');
    if (this.isOffice) {
      // @ts-ignore
      magasinControl.setValidators(Validators.required);
    } else {
      // @ts-ignore
      magasinControl.clearValidators();
    }
    // @ts-ignore
    magasinControl.updateValueAndValidity();
  }

  onSubmit(): void {
    console.log(this.registerForm);
    // @ts-ignore
    if (this.registerForm.valid) {
      // @ts-ignore
      this.apiservice.register(this.registerForm.value).subscribe(
          (response: any) => {
          console.log('User registered successfully', response);
            this.snackBar.open('User registered successfully!', 'Close', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
            this.registerForm.reset(); // Clear the form fields
        },
          (error: any) => {
          console.error('Error registering user', error.error.message);
            this.snackBar.open(error.error.message, 'Close', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
        }
      );
    }
  }
}
