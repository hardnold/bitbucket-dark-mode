"use strict";
function applyDarkMode() {
    console.log("checking for dark mode");
    chrome.storage.sync.get("bitbucketDarkModeEnabled", (data) => {
        console.log("bitbucketDarkModeEnabled: ", data.bitbucketDarkModeEnabled);
        if (data.bitbucketDarkModeEnabled) {
            console.log("dark mode is active, applying dark mode");
            injectDarkMode();
        }
        else {
            console.log("dark mode is not active, removing dark mode");
            removeDarkMode();
        }
    });
}
document.addEventListener("DOMContentLoaded", applyDarkMode);
//# sourceMappingURL=content.js.map