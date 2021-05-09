import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../shared/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-change-password-page',
  templateUrl: './change-password-page.component.html',
  styleUrls: ['./change-password-page.component.css']
})
export class ChangePasswordPageComponent implements OnInit {

  form: FormGroup;
  error: string;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      login: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      newPassword: new FormControl(null, [Validators.required])
    });
  }

  submit(): void {
    this.auth.changePassword(this.form.value).subscribe(
      () => this.router.navigate(['/login']),
      error => this.error = error.error.message
    );
  }
}
