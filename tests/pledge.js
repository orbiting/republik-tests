const { setUp, $ } = require('../utils')
import { ReactSelector } from 'testcafe-react-selectors';

setUp()

test('Abo kaufen', async t => {

  const main = ReactSelector('NarrowContainer')
  const getInput = (name) => {
    return main.find(`input[name="${name}"]`)
  }
  const contactValues = {
    firstName: 'Hans',
    lastName: 'Muster',
    email: `hans.muster+${Date.now()}@republik.ch`
  }
  
  await t.navigateTo('/angebote?package=ABO')


  for (const [key, value] of Object.entries(contactValues)) {
    await t.typeText(getInput(key), value)
    await t.expect(getInput(key).value).eql(value)
  }

  // load stripe
  await t.click($('label').withText('Kreditkartennummer'))
  
  for (const { fieldKey, value } of [
    {
      fieldKey: 'cardNumber',
      value: '4242 4242 4242 4242'
    },
    {
      fieldKey: 'expiry',
      value: '04 / 44'
    },
    {
      fieldKey: 'cvc',
      value: '123'
    }
  ]) {
    await t.switchToIframe($(`.StripeElement-${fieldKey} iframe`))
      .typeText($('input[aria-label]'), value, { paste: true })
      .expect($('input[aria-label]').value).eql(value)
      .switchToMainWindow()

  }

  await t.click($('span').withText(/einverstanden/).sibling(0))
  await t.click($('button').withText(/bezahlen/))
  await t.expect($('*', {timeout: 1e5}).withText(/Zugriff via E-Mail bestätigen/).visible).ok()
})
