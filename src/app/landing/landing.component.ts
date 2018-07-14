import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.authService.user.subscribe(user => {
      if (!user) this.router.navigateByUrl('auth'); // wont need this with route guard
    })
  }

  ngOnInit() {
  }

  signOut() {
    this.authService.signOut().then(response => {
      console.log(response);
      this.router.navigateByUrl('auth');
    })
  }

}
