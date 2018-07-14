import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router, } from '@angular/router';



@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  isCollapsed = false;
  triggerTemplate = null;
  @ViewChild('trigger') customTrigger: TemplateRef<void>;

  constructor(
    public authService: AuthService,
    private router: Router
  ) {
    this.authService.user.subscribe(user => {
      if (!user) this.router.navigateByUrl('auth'); // wont need this with route guard
    })
  }

  ngOnInit() {
  }

  /** custom trigger can be TemplateRef **/
  changeTrigger(): void {
    this.triggerTemplate = this.customTrigger;
  }

  signOut() {
    this.authService.signOut().then(response => {
      console.log(response);
      this.router.navigateByUrl('auth');
    })
  }

}
