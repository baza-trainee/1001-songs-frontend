import { SafeHtmlPipe } from './safe-html.pipe';
import {DomSanitizer} from "@angular/platform-browser";

describe('SafeHtmlPipe', () => {
  it('create an instance', () => {
    const sanitizerStub: DomSanitizer = jasmine.createSpyObj('DomSanitizer', ['bypassSecurityTrustHtml']);
    const pipe = new SafeHtmlPipe(sanitizerStub);
    expect(pipe).toBeTruthy();
  });
});
