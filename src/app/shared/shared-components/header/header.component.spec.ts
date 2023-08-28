import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { PopUpMenuComponent } from './pop-up-menu/pop-up-menu.component';
import { ActivatedRoute } from '@angular/router';


describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let translateService: TranslateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [TranslateModule.forRoot(), HeaderComponent, PopUpMenuComponent],
    providers: [TranslateService,
      {
        provide: ActivatedRoute,
        useValue: {
          snapshot: {
            data: {
            }
          }
        }
      }
    ]
});
    translateService = TestBed.inject(TranslateService);
    fixture = TestBed.createComponent(HeaderComponent);
    component = new HeaderComponent(translateService);
    fixture.detectChanges();
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

  it('should toggle changeLang variable on each click', () => {
    expect(component.changeLang).toEqual(true);

    component.selectLang();
    fixture.detectChanges();
    expect(component.changeLang).toEqual(false);
 
    component.selectLang();
    fixture.detectChanges();
    expect(component.changeLang).toEqual(true); 
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

  it('should isPopupOpen = true', () => {
    expect(component.isPopupOpen ).toEqual(false);
    component.togglePopUp();
    expect(component.isPopupOpen ).toEqual(true);
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
