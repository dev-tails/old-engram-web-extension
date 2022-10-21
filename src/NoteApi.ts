import { v4 as uuidv4 } from 'uuid';

export async function createNote(body: string) {
  const url = "https://engram.xyzdigital.com/api/notes";
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ body, date: formatDate(new Date()), localId: uuidv4() }),
  });
}

function formatDate(date) {
  const offset = date.getTimezoneOffset();
  const dateWithOffset = new Date(date.getTime() - offset * 60 * 1000);
  return dateWithOffset.toISOString().split("T")[0];
}
