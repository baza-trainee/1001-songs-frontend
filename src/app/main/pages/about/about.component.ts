import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { Observable, Subscription } from 'rxjs';

import { AboutTeamComponent } from './about-team/about-team.component';
import { SliderComponent } from 'src/app/shared/shared-components/slider/slider.component';
import { AboutService } from '../../../shared/services/about/about.service';
import { AboutTeam, DataAboutContent } from '../../../shared/interfaces/about.interface';
import { FadeInCarouselComponent } from '../../../shared/shared-components/fade-in-carousel/fade-in-carousel.component';
import { SafeHtmlPipe } from '../../../shared/pipes/safe-html.pipe';
import { Slide } from '../../../shared/interfaces/slide.interface';
import { ProjectService } from '../../../shared/services/projects/project.service';
import { ContentTextComponent } from '../../../shared/shared-components/content-text/content-text.component';
import { AboutSliderComponent } from './about-slider/about-slider.component';
import { ProjectItem } from '../../../shared/interfaces/project.interface';
import { Router, RouterLink } from '@angular/router';
import { PartnersComponent } from '../../../shared/shared-components/partners/partners.component';
import { FooterPartners } from '../../../shared/interfaces/footer';
import { FooterService } from '../../../shared/services/footer/footer.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  standalone: true,
  imports: [
    TranslateModule,
    CommonModule,
    AboutTeamComponent,
    SliderComponent,
    FadeInCarouselComponent,
    SafeHtmlPipe,
    ContentTextComponent,
    AboutSliderComponent,
    RouterLink,
    PartnersComponent
  ]
})
export class AboutComponent implements OnInit, OnDestroy {
  readonly dataAboutContent$: Observable<DataAboutContent>;
  private subscriptions: Subscription[] = [];
  public partners$!: Observable<FooterPartners[]>;

  public aboutTeam$: Observable<AboutTeam[]>;
  public projectsSlides: Slide[] = [];
  public projectsSlidesDesktop: ProjectItem[] = [];

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    autoplaySpeed: 4500,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      570: {
        items: 3
      },
      780: {
        items: 4
      },
      940: {
        items: 5
      }
    },
    nav: false,
    autoplay: true,
    autoplayTimeout: 3000
  };

  constructor(
    private translateService: TranslateService,
    private aboutService: AboutService,
    private projectService: ProjectService,
    private router: Router,
    private footerService: FooterService,
    private meta: Meta
  ) {
    this.dataAboutContent$ = this.aboutService.fetchDataAboutContent();
    this.aboutTeam$ = this.aboutService.fetchAboutTeam();
    this.partners$ = this.footerService.fetchFooterPartners();
    this.meta.updateTag({
      name: 'title',
      content: 'Світ української музичної культури - 1000 і 1 пісня'
    }),
      this.meta.updateTag({
        name: 'description',
        content: 'Про проєкт: вивчення та освіта української музичної спадщини'
      });
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.projectService.fetchProjects().subscribe((projects) => {
        if (projects.items) {
          this.projectsSlidesDesktop = projects.items.slice(0, 7);
          this.projectsSlides = projects.items.map((project) => this.projectService.convertToSlide(project));
        }
      })
    );

    this.meta.addTags([
      { property: 'og:title', content: 'Education folklore' },
      {
        property: 'og:description',
        content:
          'Пріоритети сучасних – заповнення «білих плям» на фольклористичній карті України (східна Волинь, Наддніпрянщина, південна Чернігівщина, Сумщина,'
      },
      { property: 'og:image', content: 'assets/ogimage.png' }
    ]);
  }

  navigateTo(id: number) {
    this.router.navigate(['project/' + id]);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
