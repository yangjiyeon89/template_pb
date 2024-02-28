$(function () {
  //layer pop

  let layerBtn = $('.ui-layer-btn');
  let layerCnt = $('.ui-layer-pop');
  let layerClose = $('.ui-close');

  layerBtn.on('focus', function(){
    layerCnt.removeClass('on');
    $(this).closest('.block-layer').find(layerCnt).addClass('on');

  });

  layerClose.on('click', function(){
    $(this).closest(layerCnt).removeClass('on');
  })

  //선 잇기
  $(document).ready(function() {
    $(".block-line-connect").each(function() {
      const wrapper = $(this);
      const svgScene = wrapper.find("svg");
      const content = wrapper.find(".line-connect-content");
      let sources = [];
      let currentLine = null;
      let firstHook = null;

      wrapper.on("click", ".line-connect-hook", handleClick);

      function handleClick(e) {
        const clickedHook = $(this);

        if (!firstHook) {
          firstHook = clickedHook;
        } else {
          if (firstHook[0] !== clickedHook[0]) { // Make sure it's not the same hook
            createLine(firstHook, clickedHook);
          }
          firstHook = null;
        }
      }

      function createLine(startHook, endHook) {
        const startOffset = startHook.offset();
        const endOffset = endHook.offset();

        const startX = startOffset.left - svgScene.offset().left + startHook.width() / 2;
        const startY = startOffset.top - svgScene.offset().top + startHook.height() / 2;
        const endX = endOffset.left - svgScene.offset().left + endHook.width() / 2;
        const endY = endOffset.top - svgScene.offset().top + endHook.height() / 2;

        const lineEl = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        const line = $(lineEl);
        line.attr("x1", startX);
        line.attr("y1", startY);
        line.attr("x2", endX);
        line.attr("y2", endY);
        line.attr("stroke", "black");
        line.attr("stroke-width", "2");

        svgScene.append(line);
        sources.push({ line: line, start: startHook, end: endHook });

        // Attach delete buttons and click event
        const deleteElem = $("<div class='line-connect-delete'></div>");
        const deleteElemCopy = deleteElem.clone();
        deleteElem.data("position", sources.length - 1);
        deleteElemCopy.data("position", sources.length - 1);
        deleteElem.on("click", deleteLine);
        deleteElemCopy.on("click", deleteLine);
        startHook.append(deleteElem);
        endHook.append(deleteElemCopy);
      }

      function deleteLine() {
        const position = $(this).data("position");
        sources[position].line.remove();
        sources[position].start.find(".line-connect-delete").remove();
        sources[position].end.find(".line-connect-delete").remove();
        sources[position] = null;

        sources.forEach(source => {
          if (source != null) {
            if (source.start.data("accept").trim().toLowerCase() == source.end.data("value").trim().toLowerCase() && source.end.data("accept").trim().toLowerCase() == source.start.data("value").trim().toLowerCase()) {
              source.line.css("stroke", "green");
            } else {
              source.line.css("stroke", "red");
            }
          }
        });
      }
    });
  });
})