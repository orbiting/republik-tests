import { Selector as $ } from 'testcafe'
import { waitForReact } from 'testcafe-react-selectors';

const setUp = () => {
  fixture`Republik`
    .page`${process.env.TARGET_URL || 'http://localhost:3010/feed'}`
    .beforeEach(async () => {
      await waitForReact();
    });
}

module.exports = {
  setUp,
  $,
}
