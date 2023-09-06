import { ComponentFixture, TestBed } from '@angular/core/testing';

import {HomeMapComponent} from './home-map.component';
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {GoogleMapsModule } from "@angular/google-maps";


describe('HomeMapComponent', () => {
  let component: HomeMapComponent;
  let fixture: ComponentFixture<HomeMapComponent>;
  let translateService: TranslateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), HomeMapComponent, GoogleMapsModule],
      providers: [TranslateService]
    });

    window.google = google;

    translateService = TestBed.inject(TranslateService);
    fixture = TestBed.createComponent(HomeMapComponent);
    component = new HomeMapComponent(translateService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
