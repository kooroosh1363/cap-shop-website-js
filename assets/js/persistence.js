const KEY="caplab:state:v1";
export function loadState(storage=globalThis.localStorage){
  try { return JSON.parse(storage.getItem(KEY)||"null"); } catch { return null; }
}
export function saveState(state,storage=globalThis.localStorage){
  try { storage.setItem(KEY,JSON.stringify(state)); return true; } catch { return false; }
}
