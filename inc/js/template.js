$(function () {
  //layer pop

  let layerBtn = $('.ui-layer-btn');
  let layerCnt = $('.ui-layer-pop');
  let layerClose = $('.ui-close');

  layerBtn.on('focus', function(){
    layerCnt.removeClass('on');
    $(this).closest('.question-component-layer').find(layerCnt).addClass('on');

  });

  layerClose.on('click', function(){
    $(this).closest(layerCnt).removeClass('on');
  })
})