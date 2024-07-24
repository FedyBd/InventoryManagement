import {Component, OnInit} from '@angular/core';
import {Form, FormBuilder, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  form !: FormGroup;
  constructor(private formBuilder : FormBuilder,
  private http: HttpClient,
  private router: Router) {
  }
  errorMessage: string = '';

  ngOnInit() {
    this.form = this.formBuilder.group({
      email:'',
      password:''
    })
  }

  submit() {
    this.http.post('http://localhost:3000/auth/login', this.form.getRawValue(), {withCredentials: true}).subscribe(
      () => {
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Login error:', error);
        this.errorMessage = 'Invalid credentials';
      }
    );
  }
}
