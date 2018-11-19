
// The onClicked callback function.
function onClickHandler(info, tab) {
  alert(tab.url);
	//console.log(info.menuItemId);
};

function onInstallHandler() {
  //chrome.alarms.create("myAlarm", {periodInMinutes: 0.1} );
}


chrome.runtime.onInstalled.addListener(onInstallHandler);
// chrome.contextMenus.onClicked.addListener(onClickHandler);

// Set up context menu tree at install time.
chrome.contextMenus.create({"title": "Buy this product", "contexts":["selection", "page"], onclick: onClickHandler});


