import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { crumbs } from '../../enums/breadcrumbs';

@Component({
  selector: 'app-breadcrumbs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {
  homeLink = { key: 'home', name: 'Головна' };
  breadcrumbs: { path: string; name: string }[] = [];

  constructor(private router: Router) {
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
    const crumbs: { path: string; name: string }[] = [];
    pathSegments.reduce((a, c) => {
      crumbs.push({ path: a, name: this.getSegmentName(a) });
      return a + '/' + c;
    });
    pathSegments.pop();
    this.breadcrumbs = [...crumbs];
  }

  getSegmentName(key: string): string {
    const target = crumbs.find((el) => el.key === key);
    return target?.key ? target.name : key;
  }

  redirectToPath(segment: string) {
    if (segment === this.homeLink.key) {
      this.router.navigateByUrl('/');
      return;
    }

    const clearedPath = window.location.href.split('#');
    const targetPath = segment;
    const basePath = clearedPath[1].split(targetPath);
    const targetUrl = basePath[0] + targetPath;
    this.router.navigateByUrl(targetUrl);
  }
}
