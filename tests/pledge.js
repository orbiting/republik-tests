const { setUp, $ } = require('../utils')
import { ReactSelector } from 'testcafe-react-selectors';

setUp()

test('Abo kaufen', async t => {

  const main = ReactSelector('NarrowContainer')
  const getInput = (name) => {
    return main.find(`input[name=${name}]`)
  }
  const values = {
    firstName: 'Hans',
    lastName: 'Muster',
    email: `hans.muster+${Date.now()}@republik.ch`,
    'cc-number': '4242 4242 4242 4242',
    'cc-exp-month': '3',
    'cc-exp-year': '22',
    'cc-csc': '123'
  }
  
  await t.navigateTo('/angebote?package=ABO')

  for (const [key, value] of Object.entries(values)) {
    await t.typeText(getInput(key), value)
  }

  for (const [key, value] of Object.entries(values)) {
    await t.expect(getInput(key).value).eql(value)
  }

  await t.click($('span').withText(/einverstanden/).sibling(0))
  await t.click($('button').withText(/bezahlen/))
  await t.expect($('*', {timeout: 1e5}).withText(/Zugriff via E-Mail bestätigen/).visible).ok()
})
