import { createNote } from "./NoteApi";

window.onload = async function () {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  const noteBody = "[" + tab.title + "]" + "(" + tab.url + ")";

  await createNote(noteBody);

  const saveMsg = document.getElementById("save-msg");
  if (!saveMsg) {
    console.error("Could not find save-msg");
    return;
  }
  saveMsg.innerText = "Successfully saved to engram!";

  setTimeout(() => {
    window.close();
  }, 1000);
};
