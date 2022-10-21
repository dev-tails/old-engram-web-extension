import { createNote } from "./NoteApi";

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
  if (!selectionText) {
    return;
  }
  
  await createNote(selectionText);

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
