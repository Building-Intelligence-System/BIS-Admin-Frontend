import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  protected loginForm = new FormGroup({
    login: new FormControl('', [Validators.required, Validators.minLength(1)]),
    password: new FormControl('', [Validators.required, Validators.minLength(1)])
    }
  )

  constructor(private authService: AuthService, private router: Router) {
  }

  protected handleSubmit() {
    if(!this.loginForm.controls.login.value || !this.loginForm.controls.password.value) return;
    console.log('auth submit')
    this.authService.authByPassword(this.loginForm.controls.login.value, this.loginForm.controls.password.value);
    this.router.navigate(['']);
  }
}
