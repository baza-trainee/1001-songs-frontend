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
      photo: 'https://drive.google.com/uc?export=view&id=1rErEFcUN__armqupV-KbSUY_MJpFrCH6',
      name: 'Елеонора Хачатрян',
      description: 'Lorem ipsum dolor sit amet consectetur. Tempus quis augue pretium sed morbi sit pulvinar est.'
    },
    {
      photo: 'https://drive.google.com/uc?export=view&id=1A73TAgBfq68HY_xl2tTt2BFKb5NB4KsS',
      name: 'Олег Коробов',
      description: 'Lorem ipsum dolor sit amet consectetur. Tempus quis augue pretium sed morbi sit pulvinar est.'
    },
    {
      photo: 'https://drive.google.com/uc?export=view&id=1SAqT0DF9tmVY7rHNsjlXjCPrvsD0X0D2',
      name: 'Маргарита Скаженик',
      description: 'Lorem ipsum dolor sit amet consectetur. Tempus quis augue pretium sed morbi sit pulvinar est.'
    }
  ];
}
