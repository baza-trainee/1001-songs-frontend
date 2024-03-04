import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialogModule} from "@angular/material/dialog";

@Component({
  selector: 'app-team-popup',
  standalone: true,
    imports: [CommonModule, MatDialogModule],
  templateUrl: './team-popup.component.html',
  styleUrls: ['./team-popup.component.scss']
})
export class TeamPopupComponent {

}
