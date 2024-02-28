import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateService, TranslateStore } from '@ngx-translate/core';
import { PopUpMenuComponent } from './pop-up-menu.component';
import { ActivatedRoute } from '@angular/router';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('PopUpMenuComponent', () => {
  let component: PopUpMenuComponent;
  let fixture: ComponentFixture<PopUpMenuComponent>;
  let translateService: TranslateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [TranslateModule.forChild(), PopUpMenuComponent, HttpClientTestingModule, BrowserAnimationsModule],
    providers: [TranslateService, TranslateStore,{
      provide: ActivatedRoute,
      useValue: {
        snapshot: {
          data: {}
        }
      }
    }]
});
    translateService = TestBed.inject(TranslateService);
    fixture = TestBed.createComponent(PopUpMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set lang to true if currentLang is "en"', () => {
    spyOnProperty(translateService, 'currentLang', 'get').and.returnValue('en');

    component.checkLang();

    expect(component.lang).toBeTrue();
  });

    it('should set lang to false if currentLang is not "en"', () => {

    spyOnProperty(translateService, 'currentLang', 'get').and.returnValue('ua');

    component.checkLang();

    expect(component.lang).toBeFalse();
  });

  it('should select "ua" and emit lang as "false" when value is "true"', () => {
    const value = true;
    spyOn(translateService, 'use');
    spyOn(component, 'checkLang');
    spyOn(component.changeLangDetection, 'emit');

    component.selectLang(value);

    expect(translateService.use).toHaveBeenCalledWith('ua');
    expect(component.lang).toBeFalse();
    expect(component.checkLang).toHaveBeenCalled();
    expect(component.changeLangDetection.emit).toHaveBeenCalledWith(component.lang);
  });

  it('should select "en" and emit lang as "true" when value is "false"', () => {
    const value = false;
    spyOn(translateService, 'use');
    spyOn(component, 'checkLang');
    spyOn(component.changeLangDetection, 'emit');

    component.selectLang(value);

    expect(translateService.use).toHaveBeenCalledWith('en');
    expect(component.lang).toBeTrue();
    expect(component.checkLang).toHaveBeenCalled();
    expect(component.changeLangDetection.emit).toHaveBeenCalledWith(component.lang);
  });

  it('should select "ua" and emit lang as "false" when value is "true"', () => {
    const value = true;
    spyOn(translateService, 'use');
    spyOn(component, 'checkLang');
    spyOn(component.changeLangDetection, 'emit');

    component.selectLang(value);

    expect(translateService.use).toHaveBeenCalledWith('ua');
    expect(component.lang).toBeFalse();
    expect(component.checkLang).toHaveBeenCalled();
    expect(component.changeLangDetection.emit).toHaveBeenCalledWith(component.lang);
  });
});
