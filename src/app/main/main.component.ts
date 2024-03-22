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
    this.meta.updateTag({
      name: 'title',
      content: 'Світ української музичної культури - 1000 і 1 пісня'
    });

    this.meta.updateTag({
      name: 'description',
      content:
        'Дізнайтесь про українські пісні у традиційному виконанні з закритого і таємничого світу державних і приватних архівів та колекцій'
    });
  }
}
