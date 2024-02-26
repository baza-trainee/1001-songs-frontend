import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from "@angular/router";
import {Breadcrumbs} from "../../interfaces/breadcrumbs.interface";

@Component({
  selector: 'app-breadcrumbs',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent {
  @Input({required: true}) breadcrumbs: Breadcrumbs[] = [];
  public homeLink: Breadcrumbs = { path: '', name: 'Головна' };

  constructor(private router: Router) {}

  redirectToPath(path: string) {
    this.router.navigateByUrl(path);
  }
}
