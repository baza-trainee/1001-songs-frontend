import { Component } from '@angular/core';
import { FooterComponent } from '../shared/shared-components/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../shared/shared-components/header/header.component';
import { HomeTapeComponent } from '../shared/shared-components/home-tape/home-tape.component';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  standalone: true,
  imports: [HeaderComponent, RouterOutlet, FooterComponent, HomeTapeComponent]
})
export class MainComponent {}
