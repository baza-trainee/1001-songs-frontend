import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, skip, switchMap } from 'rxjs';
import * as links from '../../enums/navLinks.enum';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

enum LinkKeys {
  about = 'header.nav-menu.about',
  map = 'header.nav-menu.map',
  education = 'header.nav-menu.educational-section',
  news = 'header.nav-menu.news',
  expedition = 'header.nav-menu.expedition'
}

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
  isVisible: boolean = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _translate: TranslateService
  ) {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((route: any) => {
      const path = route.urlAfterRedirects;
      console.log(route);
      if (path === '/') {
        this.isVisible = false;
      } else {this.isVisible = true}
      const pathSegments = path
        .split('/')
        .filter((el: string) => el !== '')
        .map((el: string) => LinkKeys[el as keyof typeof LinkKeys]);
      pathSegments.pop();
      this.crumbs = [...pathSegments];
    });
  }
  ngOnInit(): void {}

  redirectToPath(segment: string) {
    if (segment === this.HOME) {
      this.router.navigateByUrl('/');
      return;
    }

    const clearedPath = window.location.href.split('#');
    const targetPath = this.getPathFromKey(segment);
    const basePath = clearedPath[1].split(targetPath);
    const targetUrl = basePath[0] + targetPath;
    this.router.navigateByUrl(targetUrl);
  }

  getTranslateKey(url: string): string {
    const routeKey = links.navLinksHeader.find((link: any) => link.route === '/' + url);
    return routeKey ? routeKey.name : url;
  }
  getPathFromKey(key: string) {
    const path = Object.entries(LinkKeys).find((e) => e[1] === key);
    return path ? path[0] : key;
  }
}

export interface crumb {
  url: string;
}
