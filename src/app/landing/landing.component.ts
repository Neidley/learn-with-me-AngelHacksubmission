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
  subPage: string = 'courses';
  date = new Date(2012, 11, 21);
  mode = 'month';
  @ViewChild('trigger') customTrigger: TemplateRef<void>;
  courses = [{
    url: "https://udemy-images.udemy.com/course/480x270/625204_436a_2.jpg",
    title: "JavaScript 101",
    description: "An Introduction",
    avatar: "https://camo.githubusercontent.com/eb464a60a4a47f8b600aa71bfbc6aff3fe5c5392/68747470733a2f2f7261772e6769746875622e636f6d2f766f6f646f6f74696b69676f642f6c6f676f2e6a732f6d61737465722f6a732e706e67"
    }, {
    url: "https://udemy-images.udemy.com/course/480x270/818990_57c0_3.jpg",
    title: "Git and Git Workflow",
    description: "Version Control For Your Projects",
    avatar: "https://git-scm.com/images/logos/logomark-black@2x.png"
    }, {
    url: "https://udemy-images.udemy.com/course/480x270/1613828_fd1d_3.jpg",
    title: "Data Structures",
    description: "The Building Blocks for Handling Data",
    avatar: "https://youstartlabs.in/wp-content/uploads/2015/01/dsa.png"
    }, {
      url: "https://udemy-images.udemy.com/course/480x270/1631686_c2cf_2.jpg",
      title: "React.js and Redux",
      description: "The Most Popular JS Front-End Framework",
      avatar: "https://www.shareicon.net/data/128x128/2016/07/08/117367_logo_512x512.png"
    }, {
      url: "https://udemy-images.udemy.com/course/480x270/1594184_9502.jpg",
      title: "Node.js and Express",
      description: "Servers and their Services",
      avatar: "http://www.alex-arriaga.com/wp-content/uploads/2015/10/nodejs-logo.png"
    }, {
      url: "https://udemy-images.udemy.com/course/480x270/743174_8046_5.jpg",
      title: "Dominate Databases",
      description: "SQL, MongoDB, Schemas and RDMS",
      avatar: "http://beyondplm.com/wp-content/uploads/2012/07/plm-internet-web-database.png"
    }, {
      url: "https://udemy-images.udemy.com/course/480x270/927208_f52d_3.jpg",
      title: "UI & UX",
      description: "How to Utilize Sketches and UI Libraries",
      avatar: "https://127156-369349-1-raikfcquaxqncofqfm.stackpathdns.com/wp-content/uploads/2017/06/Assembling-wireframes.svg"
    }, {
      url: "https://udemy-images.udemy.com/course/480x270/1105102_4bce.jpg",
      title: "Deploying to a PaaS",
      description: "Deploying Your New Apps to the Cloud!",
      avatar: "http://www.axxys.com/wp-content/uploads/2016/03/Cloud.png"
    }];
    listDataMap = {
      eight : [
        { type: 'warning', content: 'Tutor Meetup!' },
        { type: 'success', content: 'Code Review' }
      ],
      eleven: [
        { type: 'warning', content: 'AMA w/ Mentor' },
        { type: 'success', content: 'Critical Assessment' },
        { type: 'error', content: 'Townhall Webinar' },
        { type: 'error', content: 'SQL Workshop' },
      ]};
      isVisible = false;

    getMonthData(date: Date): number | null {
        if (date.getMonth() === 8 ) {
          return 1394;
        }
        return null;
      };

  constructor(
    public authService: AuthService,
    private router: Router
  ) {
    this.authService.user.subscribe(user => {
      if (!user) this.router.navigateByUrl('auth'); // wont need this with route guard
    })
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
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
