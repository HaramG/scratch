import { CommunitybotPage } from './app.po';

describe('communitybot App', function() {
  let page: CommunitybotPage;

  beforeEach(() => {
    page = new CommunitybotPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
