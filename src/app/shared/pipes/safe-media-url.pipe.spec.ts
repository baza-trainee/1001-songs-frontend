import { SafeMediaUrlPipe } from './safe-media-url.pipe';

describe('SafeMediaUrlPipe', () => {
  it('create an instance', () => {
    const pipe = new SafeMediaUrlPipe();
    expect(pipe).toBeTruthy();
  });
});
