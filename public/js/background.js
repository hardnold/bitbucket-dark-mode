"use strict";
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ bitbucketDarkModeEnabled: false });
});
// chrome.action.onClicked.addListener((tab) => {
//   chrome.scripting.executeScript({
//     target: { tabId: tab.id },
//     func: toggleDarkMode,
//   });
// });
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log("Message received: ", request);
    if (request.action === "toggleDarkMode") {
        chrome.storage.sync.get("bitbucketDarkModeEnabled", (data) => {
            console.log("bitbucketDarkModeEnabled: ", data.bitbucketDarkModeEnabled);
            const newDarkModeStatus = !data.bitbucketDarkModeEnabled;
            chrome.storage.sync.set({ darkMode: newDarkModeStatus }, () => {
                if (newDarkModeStatus) {
                    injectDarkMode();
                }
                else {
                    removeDarkMode();
                }
                sendResponse({
                    status: newDarkModeStatus ? "Dark mode on" : "Dark mode off",
                });
            });
        });
        return true; // Indicates that the response is asynchronous
    }
});
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (tab.url && new URL(tab.url).hostname === "bitbucket.org") {
        chrome.storage.sync.get("bitbucketDarkModeEnabled", (data) => {
            if (data.bitbucketDarkModeEnabled) {
                chrome.scripting.insertCSS({
                    target: { tabId: tabId },
                    files: ["theme-dark.css"],
                });
                chrome.scripting.executeScript({
                    target: { tabId: tabId },
                    func: () => document.body.classList.add("theme-dark"),
                });
            }
        });
    }
});
function injectDarkMode() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (tabs.length && tabs[0].id) {
            chrome.scripting.insertCSS({
                target: { tabId: tabs[0].id },
                files: ["theme-dark.css"],
            });
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                func: () => document.body.classList.add("theme-dark"),
            });
            chrome.storage.sync.set({ bitbucketDarkModeEnabled: true });
        }
        else {
            console.error("bitbucket-darkmode: No active tab found", tabs);
        }
    });
}
function removeDarkMode() {
    chrome.tabs.query({ active: true }, function (tabs) {
        if (tabs.length && tabs[0].id) {
            chrome.scripting.removeCSS({
                target: { tabId: tabs[0].id },
                files: ["theme-dark.css"],
            });
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                func: () => document.body.classList.remove("theme-dark"),
            });
            chrome.storage.sync.set({ bitbucketDarkModeEnabled: false });
        }
        else {
            console.error("bitbucket-darkmode: No active tab found", tabs);
        }
    });
}
//# sourceMappingURL=background.js.map