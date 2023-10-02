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
  recomendationPages: number[] = [1];
  ngOnInit(): void {
    this.recomendationPages = Array.from(Array(Math.floor(recomendations!.length / 5) + (recomendations.length % 5)).keys()).map(
      (el) => el + 1
    );
  }
  rotateRecomendationArrow() {
    this.expansionRecomendationArrow = this.expansionRecomendationArrow === 'bottom' ? 'top' : 'bottom';
  }
}
