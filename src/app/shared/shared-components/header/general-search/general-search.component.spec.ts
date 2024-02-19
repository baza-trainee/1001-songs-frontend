import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralSearchComponent } from './general-search.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('GeneralSearchComponent', () => {
  let component: GeneralSearchComponent;
  let fixture: ComponentFixture<GeneralSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [GeneralSearchComponent, HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(GeneralSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
