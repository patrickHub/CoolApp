import { CoolappPage } from './app.po';

describe('coolapp App', function() {
  let page: CoolappPage;

  beforeEach(() => {
    page = new CoolappPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
