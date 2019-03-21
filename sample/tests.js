import { Selector as $ } from 'testcafe'
import { waitForReact } from 'testcafe-react-selectors';
import { ReactSelector } from 'testcafe-react-selectors';

fixture`Republik`
  .page`./index.html`
  .beforeEach(async () => {
    await waitForReact();
  });

class Page {
  constructor() {
    this.name = $('input[name=name]')
    this.email = $('input[name=email]')
  }
}

test('Formular', async t => {

  const page = new Page()

  // nested form
  const main = $('.main')
  const mainEmail = main.find('input[name=email]')

  await t
    .typeText(page.name, 'Muster')
    .expect(page.name.value).eql('Muster')
    .typeText(page.email, 'hans.muster@example.org')
    .expect(page.email.value).eql('hans.muster@example.org')
    .typeText(mainEmail, 'h@muster.ch')
    .expect(mainEmail.value).eql('h@muster.ch')

})

test('React Selector', async t => {

  const form = ReactSelector('Form')

  await t
    .typeText(form.find('input[name=name]'), 'Muster')
    .expect(form.find('input[name=name]').value).eql('Muster')

})

test('Abschicken', async t => {

  const page = new Page()

  await t
    .click($('button').withText('Abschicken'))
    .expect(page.name.hasAttribute('disabled')).ok()

})
