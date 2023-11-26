import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Route, Router} from "@angular/router";

@Component({
  selector: 'app-add',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {

    this.loginForm = new FormGroup({
      'username': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required)
    })
  }

  onSubmit() {
    console.log(this.loginForm.value);
    this.authService.login(this.loginForm.value).subscribe(responseData => {
        if (Object.keys(responseData).length <= 1) {
          alert("Contraseña o usuario incorrecto")
        } else {
          localStorage.setItem('session', JSON.stringify(responseData));
          this.router.navigateByUrl("/tasks");

        }


      }
    );


  }

}
