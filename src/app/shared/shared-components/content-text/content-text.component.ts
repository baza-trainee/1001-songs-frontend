import {Component, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FadeInCarouselComponent} from "../fade-in-carousel/fade-in-carousel.component";
import {SafeHtmlPipe} from "../../pipes/safe-html.pipe";
import {FormattingTextService} from "../../services/formatting-text/formating-text.service";
import {Content} from "../../interfaces/about.interface";

@Component({
  selector: 'app-content-text',
  standalone: true,
  imports: [CommonModule, FadeInCarouselComponent, SafeHtmlPipe],
  templateUrl: './content-text.component.html',
  styleUrls: ['./content-text.component.scss']
})
export class ContentTextComponent implements OnInit {
  @Input({required: true}) content: string = "";
  public renderedText!: Content[];

  constructor(private formattingService: FormattingTextService) {}

  ngOnInit() {
      this.renderedText = this.formattingService.splitText(this.content);
  }
}
