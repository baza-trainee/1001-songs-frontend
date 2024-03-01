import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink} from "@angular/router";
import {ProjectItem} from "../../../../shared/interfaces/project.interface";
import {MatCardModule} from "@angular/material/card";

@Component({
  selector: 'app-about-slider',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule],
  templateUrl: './about-slider.component.html',
  styleUrls: ['./about-slider.component.scss']
})
export class AboutSliderComponent {
  @Input() item: ProjectItem = {} as ProjectItem;

    constructor() {}
}
