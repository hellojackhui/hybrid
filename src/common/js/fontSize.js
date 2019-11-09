const MAX_FONT_SIZE = 42;

document.addEventListener('DOMContentLoaded', () => {
  const html = document.querySelector('html');
  let size = window.innerWidth / 10;
  size = size > MAX_FONT_SIZE ? MAX_FONT_SIZE : size;
  html.style.fontSize = `${size}px`;
});
