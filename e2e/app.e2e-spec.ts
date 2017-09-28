import { MlnrfePage } from './app.po';

describe('mlnrfe App', () => {
  let page: MlnrfePage;

  beforeEach(() => {
    page = new MlnrfePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
