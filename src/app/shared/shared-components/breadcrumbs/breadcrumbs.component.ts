import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
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
  crumbs: any = '';
  constructor(
    private router: Router,
    private _translate: TranslateService
  ) {

    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((route: any) => {
      const location = route.urlAfterRedirects;
      console.log(route)
      const url = links.navLinksHeader.find((link: any) => link.route === location);
      if (url) {
        this.crumbs = url.name;
      }
    });
  }
  ngOnInit(): void {
  
  }
}
