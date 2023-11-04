import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { filter, skip } from 'rxjs';
import * as links from '../../enums/navLinks.enum';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-breadcrumbs',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {
  HOME = 'header.nav-menu.home';
  crumbs: string[] = [];
  constructor(
    private router: Router,
    private _translate: TranslateService
  ) {
    this.router.events
      .pipe(
        // skip(1),
        filter((event) => event instanceof NavigationEnd)
      )
      .subscribe((route: any) => {
        const path = route.urlAfterRedirects;
        const pathSegments = path.split('/').filter((el: string) => el !== '');     
        this.crumbs = [...pathSegments.map((el: string) => this.getTranslateKey(el))];
      });
  }
  ngOnInit(): void {
    console.log(this.router.url);
  }

  getTranslateKey(url: string): string {
    const routeKey = links.navLinksHeader.find((link: any) => link.route === '/' + url);
    return routeKey ? routeKey.name : url;
  }

  redirectToPath(event: any){
    console.log(event)
  }
}

export interface crumb {
  url: string;
}
