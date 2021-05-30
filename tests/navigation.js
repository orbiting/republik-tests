const { setUp, $ } = require('../utils')

setUp()

test('Impressum', async t => {
	await t
		.click($('a').withText('Impressum'))
		.expect($('p').withText('Die Republik ist komplett werbefrei').visible).ok()
		.expect($('title').innerText).eql('Impressum – Republik')
})
