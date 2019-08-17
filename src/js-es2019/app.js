import _ from 'lodash';

/**
 * マウス移動時の座標を出力
 */
const target = document.querySelector('#js-wrapper');
const mouse = document.querySelector('#js-mouse');

// 座標の初期値
mouse.style.top = 'calc(50% - 100px)';
mouse.style.left = 'calc(50% - 100px)';

// mouse event
target.addEventListener('mousemove', _.throttle((event) => {
  mouse.style.top = event.clientY - 100 + 'px';
  mouse.style.left = event.clientX - 100 + 'px';
}, 50)); //実行を間引く

// touch event
target.addEventListener('touchstart', _.throttle(event => TouchEventFunc(event), 20));

target.addEventListener('touchmove', _.throttle(event => TouchEventFunc(event), 20));

function TouchEventFunc(event) {
  event.preventDefault(); //スクロールを無効

  const touch = event.changedTouches;
  mouse.style.top = touch[0].pageY.toFixed(2) - 100 + 'px';
  mouse.style.left = touch[0].pageX.toFixed(2) - 100 + 'px';
  passive: false;
}