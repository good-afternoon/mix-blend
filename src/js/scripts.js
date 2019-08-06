(function ($) {
    'use strict';

    /**
     * マウスポインタの座標を取得
     */    
    $(window).mousemove(function(){
        var x = event.clientX,
            y = event.clientY;
        $('#js-mouse').css({'top': y + 20, 'left': x + 20 });
    });

})(jQuery);    