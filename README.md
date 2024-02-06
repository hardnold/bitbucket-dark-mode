# Dark Mode for Bitbucket Cloud

![dead eyes](https://github.com/hardnold/bitbucket-dark-mode/blob/main/bitbucket-light-spongebob-meme.png?raw=true)

It saves your eyes by adding a dark theme for bitbucket cloud. Because Bitbucket cloud doesn't have it.

## How to use

If you want to use this extenstion, please just install it from the chrome extension store
TODO: Add link

## Development

To make adjustments and use the extension in development mode, follow these steps:

1. clone the repo
2. run `npm i`
3. make necessary adjustments
4. run `npm run build` - this creates js files in public/js from the ts-files in src/
5. in Chrome go to [chrome://extensions](chrome://extensions)
6. At the top right, turn on Developer mode.
7. In the top left, click on "Load unpacked"
8. Select the `public`-folder
9. The extension should now be running

hint 1: Whenever you make changes to the files, you need to do step 4 again and reload the extension in chrome (with the reload button)

hint 2: To see the console.logs or outher output from the extension you need to right click on the open popup and click "Inspect" to open the dev tools for the extension (The dev tools for the active tab is NOT showing the output from the extensions)

hint 3: the extension uses `chrome.tabs.query`-API to query for the active tab. [There's a known bug](https://issues.chromium.org/issues/41160154), with which no active tab could be found, when the chrome developer tools are opened for the extension. Close the dev tools and it should work.

## Currently WIP:

- [ ] Optimize Dark Theme
- [ ] Find green/red color when whole file has been added/removed
- [ ] Submit Extension to chrome webstore

## Credits

dark theme based on [this gist](https://gist.github.com/peterk87/8463882) by peterk87, modified
