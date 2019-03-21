# republik-tests
End-to-end testing of the Republik web presence

## Getting started

  1. Install dependencies  
     `npm install`
 
 2. Run headless Chrome test  
    `TARGET_URL="http://target.url" npm test` (default is `localhost:3010`)

### All platforms

Execute `npm run test:remote` and direct the browser manually to the address displayed

![Test remote](images/test-remote.png)

### Platform-specific tests

#### Mac

    npm run test:mac

#### Windows

    npm run test:win

### iOS simulator

    npm run test:ios

### Android emulator

1. Start Android emulator

2. `npm run test:android`

## Writing tests

Run the [sample](sample) in Chrome: `npm run test:sample`