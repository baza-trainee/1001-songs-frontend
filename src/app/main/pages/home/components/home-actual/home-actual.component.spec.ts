import { ComponentFixture, TestBed } from '@angular/core/testing';

import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {HomeActualComponent} from "./home-actual.component";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ProjectService} from "../../../../../shared/services/projects/project.service";

describe('HomeActualComponent', () => {
  let component: HomeActualComponent;
  let fixture: ComponentFixture<HomeActualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ TranslateModule.forRoot(), HomeActualComponent, HttpClientTestingModule ],
      providers: [ TranslateService, ProjectService ] // Подставьте ваш сервис здесь
    })
        .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeActualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
