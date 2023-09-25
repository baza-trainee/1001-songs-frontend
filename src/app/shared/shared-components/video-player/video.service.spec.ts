import { TestBed } from '@angular/core/testing';

import { VideoService } from './video.service';

describe('VideoService', () => {
  let service: VideoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideoService);
  });

  it('string should be changed', () => {
    const url = 'https://youtu.be/T_vrh-QXLik';
    // const domSanitizer = TestBed.get(DomSanitizer);
    // const pipe = new PreviewFromUrlPipe(domSanitizer);
    const transformed = service.previewFromUrl(url)
    //const previewUrl = transformed.toString().split(' ')[4];
    expect(transformed).toBe('http://img.youtube.com/vi/T_vrh-QXLik/0.jpg');
  });

  it('string should be changed', () => {
    const url = 'https://youtu.be/T_vrh-QXLik';
    // const domSanitizer = TestBed.get(DomSanitizer);
    // const pipe = new SafeMediaUrlPipe(domSanitizer);
    const transformed = service.getEmbeddedUrl(url) ;
    //const previewUrl = transformed.toString().split(' ')[4];
    expect(transformed).toBe('https://www.youtube.com/embed/T_vrh-QXLik?rel=0&autohide=I');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
