import { CutText } from './cut-text.pipe';

describe('CutTextPipe', () => {
  let pipe!: CutText;

  beforeEach(() => {
    pipe = new CutText();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should cut a text length in an array to particular amount and add ... at the end', () => {
    const str = ['hello', 'sunny day'];
    expect(pipe.transform(str, 10)).toBe('hello sunny day...');
  });
});
