import jQuery from 'jquery';

// ドルマークに参照を代入(慣習的な $ を使うため)
const $ = jQuery;

/**
 * マウスポインタの座標を取得
 */    
$(window).mousemove(function(){
  var x = event.clientX,
      y = event.clientY;
  $('#js-mouse').css({'top': y + 20, 'left': x + 20 });
});
