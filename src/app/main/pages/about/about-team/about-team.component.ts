import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { TeamMemberCardComponent } from 'src/app/shared/shared-components/team-member-card/team-member-card.component';
import { Member } from 'src/app/shared/interfaces/member.interface';

@Component({
  selector: 'app-about-team',
  templateUrl: './about-team.component.html',
  styleUrls: ['./about-team.component.scss'],
  standalone: true,
  imports: [TranslateModule, CommonModule, TeamMemberCardComponent]
})
export class AboutTeamComponent {
  members: Member[] = [
    {
      photo: './assets/img/about/members-photo/member-photo-1.jpg',
      name: 'Елеонора Хачатрян',
      description: 'Lorem ipsum dolor sit amet consectetur. Tempus quis augue pretium sed morbi sit pulvinar est.'
    },
    {
      photo: './assets/img/about/members-photo/member-photo-2.jpg',
      name: 'Олег Коробов',
      description: 'Lorem ipsum dolor sit amet consectetur. Tempus quis augue pretium sed morbi sit pulvinar est.'
    },
    {
      photo: './assets/img/about/members-photo/member-photo-3.jpg',
      name: 'Маргарита Скаженик',
      description: 'Lorem ipsum dolor sit amet consectetur. Tempus quis augue pretium sed morbi sit pulvinar est.'
    },
    {
      photo: './assets/img/about/members-photo/member-photo-2.jpg',
      name: 'Олег Коробов',
      description: 'Lorem ipsum dolor sit amet consectetur. Tempus quis augue pretium sed morbi sit pulvinar est.'
    },
    {
      photo: './assets/img/about/members-photo/member-photo-3.jpg',
      name: 'Маргарита Скаженик',
      description: 'Lorem ipsum dolor sit amet consectetur. Tempus quis augue pretium sed morbi sit pulvinar est.'
    },
    {
      photo: './assets/img/about/members-photo/member-photo-1.jpg',
      name: 'Елеонора Хачатрян',
      description: 'Lorem ipsum dolor sit amet consectetur. Tempus quis augue pretium sed morbi sit pulvinar est.'
    }
  ];
}
