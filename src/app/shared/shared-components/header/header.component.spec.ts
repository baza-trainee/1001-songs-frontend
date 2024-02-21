import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { PopUpMenuComponent } from './pop-up-menu/pop-up-menu.component';
import { ActivatedRoute } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { AppState } from 'src/app/store/app/app.state';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let translateService: TranslateService;
  let dialogComponent: MatDialog;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
        HeaderComponent,
        BrowserAnimationsModule,
        PopUpMenuComponent,
        NgxsModule.forRoot([AppState]),
        MatDialogModule,
        HttpClientTestingModule
      ],
      providers: [
        TranslateService,
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
    translateService = TestBed.inject(TranslateService);
    dialogComponent = TestBed.inject(MatDialog);
    fixture = TestBed.createComponent(HeaderComponent);
    component = new HeaderComponent(translateService, dialogComponent);
    fixture.detectChanges();
  });

  it('should be false', (done) => {
    component.isLoading$?.subscribe((isLoading) => {
      expect(isLoading).toBe(0);
      done();
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle language and change translation', () => {
    const initialLang = 'Eng';
    expect(component.changeLang).toBeTrue();
    expect(component.lang).toEqual(initialLang);
    component.selectLang();
    expect(component.changeLang).toBeFalse();
    expect(component.lang).toEqual('Укр');
    expect(translateService.currentLang).toEqual('en');
  });

  it('should switch language between "Укр" and "Eng" on each click', () => {
    expect(component.lang).toEqual('Eng');
    component.selectLang();
    fixture.detectChanges();
    expect(component.lang).toEqual('Укр');
    component.selectLang();
    fixture.detectChanges();
    expect(component.lang).toEqual('Eng');
  });

  it('should set changeLang to true if currentLang is not "en"', () => {
    spyOnProperty(translateService, 'currentLang').and.returnValue('ua');
    component.checkLang();
    expect(component.changeLang).toEqual(true);
  });

  it('should change language to "Eng" when value is "true"', () => {
    const value = true;
    spyOn(translateService, 'use');
    component.receivedData(value);
    expect(component.changeLang).toBeFalse();
    expect(component.lang).toEqual('Укр');
    expect(translateService.use).toHaveBeenCalledWith('en');
  });

  it('should change language to "Укр" when value is "false"', () => {
    const value = false;
    spyOn(translateService, 'use');
    component.receivedData(value);
    expect(component.changeLang).toBeTruthy();
    expect(component.lang).toEqual('Eng');
    expect(translateService.use).toHaveBeenCalledWith('ua');
  });

  it('should toggle isPopupOpen from false to true', () => {
    component.isPopupOpen = false;
    component.togglePopUp();
    expect(component.isPopupOpen).toBeTrue();
  });
});
