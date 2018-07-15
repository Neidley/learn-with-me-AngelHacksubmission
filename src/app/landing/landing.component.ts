import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router, } from '@angular/router';
import { MatDialog } from '@angular/material';
import { VideoDialogComponent } from '../video-dialog/video-dialog.component';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  isCollapsed = false;
  triggerTemplate = null;
  subPage: string = 'courses';
  date = new Date(2012, 11, 21);
  mode = 'month';
  @ViewChild('trigger') customTrigger: TemplateRef<void>;
  courses = [{}, {}, {}, {}, {}, {}, {}, {}]

  constructor(
    public authService: AuthService,
    private router: Router,
    public dialog: MatDialog
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


  testScreenShare() {
    const dialogRef = this.dialog.open(VideoDialogComponent, {
      width: '90vw',
      height: '90vh'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
