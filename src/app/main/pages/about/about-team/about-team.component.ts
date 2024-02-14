import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { TeamMemberCardComponent } from './team-member-card/team-member-card.component';
import { Member } from 'src/app/shared/interfaces/member.interface';

@Component({
  selector: 'app-about-team',
  templateUrl: './about-team.component.html',
  styleUrls: ['./about-team.component.scss'],
  standalone: true,
  imports: [TranslateModule, CommonModule, TeamMemberCardComponent]
})
export class AboutTeamComponent {
  @Input() team!: Member[];
}
