function formatDate(date) {
  const offset = date.getTimezoneOffset();
  const dateWithOffset = new Date(date.getTime() - offset * 60 * 1000);
  return dateWithOffset.toISOString().split("T")[0];
}

function setUpContextMenus() {
  chrome.contextMenus.create({
    title: "Save selection to engram",
    id: "selection",
    contexts: ["all"],
  });
}

chrome.runtime.onInstalled.addListener(function () {
  // When the app gets installed, set up the context menus
  setUpContextMenus();
});

chrome.contextMenus.onClicked.addListener(async function (itemData, tab) {
  const selectionText = itemData.selectionText;
  
  const url = "https://engram.xyzdigital.com/api/notes";
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ body: selectionText, date: formatDate(new Date()) }),
  });

  const notificationId = 'success';
  chrome.notifications.create(notificationId, {
    title: 'Success!',
    message: 'Selection saved to engram',
    iconUrl: '/images/logo192.png',
    type: 'basic'
  });

  setTimeout(() => {
    chrome.notifications.clear(notificationId);
  }, 2000)
});
