import { TestBed } from '@angular/core/testing';
import { PreviewFromUrlPipe } from './preview-from-url.pipe';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';

describe('PreviewFromUrlPipe', () => {
  // let sanitizer: DomSanitizer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserModule]
    });
  });

  it('create an instance', () => {
    const domSanitizer = TestBed.get(DomSanitizer);
    const pipe = new PreviewFromUrlPipe(domSanitizer);
    expect(pipe).toBeTruthy();
  });

  it('string should be changed', () => {
    const url = 'https://youtu.be/T_vrh-QXLik';
    const domSanitizer = TestBed.get(DomSanitizer);
    const pipe = new PreviewFromUrlPipe(domSanitizer);

    const transformed = pipe.transform(url) as string;
    const previewUrl = transformed.toString().split(' ')[4];
    expect(previewUrl).toBe('http://img.youtube.com/vi/T_vrh-QXLik/0.jpg');
  });
});
