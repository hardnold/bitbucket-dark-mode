document.addEventListener("DOMContentLoaded", function () {
  var toggleButton = document.getElementById(
    "bitbucket-toggle-dark-mode"
  ) as HTMLButtonElement;

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var currentTab = tabs[0];

    if (
      currentTab?.url &&
      new URL(currentTab.url).hostname === "bitbucket.org"
    ) {
      toggleButton.disabled = false;
      toggleButton.addEventListener("click", function () {
        toggleDarkMode();
      });
    } else {
      toggleButton.disabled = true;
    }
  });
});

function toggleDarkMode() {
  chrome.runtime.sendMessage({ action: "toggleDarkMode" }, function (response) {
    console.log("Dark mode toggled:", response.status);
  });
}
