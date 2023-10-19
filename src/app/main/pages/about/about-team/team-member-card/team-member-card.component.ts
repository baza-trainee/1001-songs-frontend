import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Member } from 'src/app/shared/interfaces/member.interface';

@Component({
  selector: 'app-team-member-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './team-member-card.component.html',
  styleUrls: ['./team-member-card.component.scss']
})
export class TeamMemberCardComponent {
  @Input() member: Member = {} as Member;
}
