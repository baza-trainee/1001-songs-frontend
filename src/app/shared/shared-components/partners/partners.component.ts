import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterPartners } from "../../interfaces/footer";
import {CarouselModule, OwlOptions} from "ngx-owl-carousel-o";

@Component({
  selector: 'app-partners',
  standalone: true,
  imports: [CommonModule, CarouselModule],
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.scss']
})
export class PartnersComponent {
  @Input() partners: FooterPartners[] = [];
  @Input() cardWidth: number = 200;
  @Input() customOptions: OwlOptions = {} as OwlOptions;
  @Input() classContainer: string = '';

}
