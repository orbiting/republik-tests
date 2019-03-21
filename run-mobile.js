const { exec } = require('child_process')
const os = require('os')

const createTestCafe = require('testcafe')
let runner = null
let testcafe = null

const run = platform => {
  createTestCafe(os.hostname())
    .then(tc => {
      testcafe = tc
      runner = testcafe.createRunner()

      return testcafe.createBrowserConnection()
    })
    .then(remoteConnection => {
      const testCommands = {
        ios: `/usr/bin/xcrun simctl boot "iPhone X"; /usr/bin/xcrun simctl openurl booted ${
          remoteConnection.url
        }`,
        android: `$ANDROID_HOME/platform-tools/adb shell am start -a "android.intent.action.VIEW" -d ${
          remoteConnection.url
        }`,
      }

      console.log('Starting browser', remoteConnection.url)
      exec(testCommands[platform])

      remoteConnection.once('ready', () => {
        runner
          .src('tests/**/*.js')
          .browsers(remoteConnection)
          .run()
          .then(() => {
            testcafe.close()
          })
      })
    })
}

const PLATFORMS = ['ios', 'android']
const platform = process.argv[2]

if (PLATFORMS.indexOf(platform) > -1) {
  run(platform)
} else {
  throw new Error(`Usage: node run.js ${PLATFORMS.join('|')} `)
}
