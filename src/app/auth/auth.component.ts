import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLogin: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.authService.user.subscribe(user => {
      if (user) this.router.navigateByUrl('home');
    })
  }

  ngOnInit() {
  }


  login(email: string, password: string) {
    this.authService.emailPasswordLogin(email, password).then(response => {
      console.log(response);
      this.router.navigateByUrl('home');
    });
  }

  signup() {
    this.authService.emailPasswordSignUp('', '').then(response => console.log(response))
  }

}
