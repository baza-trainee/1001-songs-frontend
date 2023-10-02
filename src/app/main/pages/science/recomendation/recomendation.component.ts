import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { ArrowDownComponent } from 'src/app/icons/arrow-down/arrow-down.component';
import { NavigationNextComponent } from 'src/app/icons/navigation-next/navigation-next.component';
import { recomendations } from '../category-link/recomendations';

@Component({
  selector: 'app-recomendation',
  standalone: true,
  imports: [CommonModule, MatExpansionModule, ArrowDownComponent, NavigationNextComponent],
  templateUrl: './recomendation.component.html',
  styleUrls: ['./recomendation.component.scss']
})
export class RecomendationComponent implements OnInit {
  expansionRecomendationArrow = 'bottom';
  recomendations? = recomendations;
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  rotateRecomendationArrow() {
    this.expansionRecomendationArrow = this.expansionRecomendationArrow === 'bottom' ? 'top' : 'bottom';
  }
}
