import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { HomeComponent } from './home.component';
import { ActivatedRoute } from '@angular/router';
import { GoogleMapsModule } from '@angular/google-maps';
import { google } from '../../../shared/shared-components/interactive-map/interactive-map.component.spec';
import { HttpClientModule } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
import { MapState } from '../../../store/map/map.state';

class googleMock {}
describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), HomeComponent, GoogleMapsModule, HttpClientModule, NgxsModule.forRoot([MapState])],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {}
            }
          }
        }
      ]
    });

    (window as unknown as { google: googleMock }).google = google;

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
