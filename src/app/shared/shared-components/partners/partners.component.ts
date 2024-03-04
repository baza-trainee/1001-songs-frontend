import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FooterPartners} from "../../interfaces/footer";

@Component({
  selector: 'app-partners',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.scss']
})
export class PartnersComponent {
  @Input() partners: FooterPartners[] = [];
  @Input() itemWidth: number = 64;
  @Input() gap: number = 16;
  clonedPartners: FooterPartners[] = [];
  transformValue: string = 'translateX(-240px)';

  constructor() { }

  ngOnInit(): void {
    this.setupCarousel();
  }

  setupCarousel() {
    const numberOfVisibleItems = Math.ceil(225 / (this.itemWidth + this.gap));
    console.log(numberOfVisibleItems)
    this.clonedPartners = Array.from({ length: numberOfVisibleItems }, () => [...this.partners]).flat();

    setInterval(() => {
      this.moveCarousel();
    }, 2000);
  }

  moveCarousel() {
    const firstPartner = this.clonedPartners.shift();
    if (firstPartner !== undefined) {
      this.clonedPartners.push(firstPartner);
    }
  }
}
