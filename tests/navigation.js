const { setUp, $ } = require('../utils')

setUp()

test('Impressum', async t => {

  const navigationButton = $('button').withAttribute('title', 'Navigation öffnen')
  const nav = $('#nav')
  const teamLink = $('a').withText('Team')

	await t
		.click(navigationButton)
		.expect(nav.visible).ok()
		.click(teamLink)
		.expect($('p').withText('Die Republik ist komplett werbefrei').visible).ok()
		.expect($('title').innerText).eql('Impressum – Republik')
})
