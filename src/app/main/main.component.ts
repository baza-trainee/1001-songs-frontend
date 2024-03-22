import { Component } from '@angular/core';
import { FooterComponent } from '../shared/shared-components/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../shared/shared-components/header/header.component';
import { HomeTapeComponent } from '../shared/shared-components/home-tape/home-tape.component';
import { Meta } from '@angular/platform-browser';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  standalone: true,
  imports: [HeaderComponent, RouterOutlet, FooterComponent, HomeTapeComponent]
})
export class MainComponent {
  constructor(private meta: Meta) {
    this.meta.addTags([
      {
        name: 'description',
        content: 'Information about people who look after and preserve the cultural heritage of Ukrainian cultural heritage'
      }
    ]);
  }
}
