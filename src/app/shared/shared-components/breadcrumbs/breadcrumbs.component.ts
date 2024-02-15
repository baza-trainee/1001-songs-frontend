import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { BreadcrumbsTrasnslateKeys } from '../../enums/breadcrumbs.emum';
import { crumbs } from '../../enums/breadcrumbs';

@Component({
  selector: 'app-breadcrumbs',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {
  crumbs: string[] = [];
  readonly Links = BreadcrumbsTrasnslateKeys;

  constructor(
    private router: Router,
    private _translate: TranslateService
  ) {
    const url = window.location.href;
    const path = url.split('#')[1];
    if (path) {
      this.setCrumbs(path);
    }
  }

  ngOnInit(): void {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((route: NavigationEnd | unknown) => {
      if (route instanceof NavigationEnd) {
        const path = route.urlAfterRedirects;
        this.setCrumbs(path);
      }
    });

  }

  setCrumbs(path: string) {
    const pathSegments = path.split('/').filter((segment: string) => segment !== '');
    // .map((segment: string) => this.Links[segment as keyof typeof this.Links]);
    const namedSegments: string[] = [];
    pathSegments.reduce((a, c) => {
      namedSegments.push(this.getSegmentName(a));
      return a + '/' + c;
    });
    pathSegments.pop();
    this.crumbs = [...namedSegments];
  }

  getSegmentName(key: string): string {
    const target = crumbs.find((el) => el.key === key);
    return target?.key ? target.name : key;
  }

  redirectToPath(segment: string) {
    if (segment === this.Links.home) {
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
    const routeKey = Object.entries(this.Links).find((link: string[]) => link[0] === '/' + url);
    return routeKey ? routeKey[1] : url;
  }

  getPathFromKey(key: string) {
    const path = Object.entries(this.Links).find((e) => e[1] === key);
    return path ? path[0] : key;
  }
}
