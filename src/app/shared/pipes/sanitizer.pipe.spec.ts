import { TestBed } from '@angular/core/testing';
import { SanitizePipe } from './sanitizer.pipe';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';

describe('SanitizerPipe', () => {

  TestBed.configureTestingModule({
    imports: [BrowserModule]
  });
  let sanitizer: DomSanitizer;

  it('create an instance', () => {
    const pipe = new SanitizePipe(sanitizer);
    expect(pipe).toBeTruthy();
  });
});
