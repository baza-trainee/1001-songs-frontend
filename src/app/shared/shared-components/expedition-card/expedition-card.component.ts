import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IExpediton } from '../../services/expeditions/expeditions.service';
import { SafeMediaUrlPipe } from "../../pipes/safe-media-url.pipe";

@Component({
    selector: 'app-expedition-card',
    standalone: true,
    templateUrl: './expedition-card.component.html',
    styleUrls: ['./expedition-card.component.scss'],
    imports: [CommonModule, SafeMediaUrlPipe]
})
export class ExpeditionCardComponent {
  @Input() event: IExpediton = {} as IExpediton;

  validDate: Date = new Date();
}
