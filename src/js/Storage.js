export function loadFromStorage() {
  try {
    return JSON.parse(localStorage.getItem('state'));
  } catch (e) {
    console.log(e);
    throw new Error('Error to load');
  }
}

export function saveToStorage() {
  const body = document.querySelector('body');
  const bodyHTML = body.innerHTML;
  window.localStorage.setItem('state', JSON.stringify(bodyHTML));
}
