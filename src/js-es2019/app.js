/**
 * マウス移動時の座標を出力
 */   
const target = document.querySelector('#js-images');
const mouse = document.querySelector('#js-mouse');
target.addEventListener('mousemove', (event) => {
  mouse.style.top = event.clientY + 20 + 'px';
  mouse.style.left = event.clientX + 20 + 'px';
});