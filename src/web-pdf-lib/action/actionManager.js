// antionManager.js
/*
import UiController from '../../../commonFrame/js/uiFramework/uiController.js';
import EventActionGenerator from '../../../commonFrame/js/uiFramework/eventActionGenerator.js';
import UIDefine from '../../../commonFrame/js/uiFramework/uiDefine.js';
*/
/*
import UiManager from '../../uiFrame/uiManager.js';
*/

import AnnotationManager from '../annotation/annotationManager.js';
import AnnotationExecutor from './annotationActionExecutor.js';
import DefineTypes from '../define/defineTypes.js';
import DefineActions from '../define/defineActions.js';
import Util from '../utils/util.js';
import webPdfLib from '../webPdfLib.js';

export default (function () {
  let _isAllSelected = false;
  let _isFindOpened = false;

  function save(_evtAction) {
    console.group(`function save(_evtAction)`);
    AnnotationManager.save(webPdfLib.PDFViewerApplication.baseUrl, webPdfLib.PDFViewerApplication.pdfDocument, false);
    console.groupEnd();
  }

  function download(evtAction) {
    // 임시코드
    evtAction.value = 'off';

    // webPdfLib.PDFViewerApplication.toolbar.eventBus.dispatch("download", {
    // 	source: webPdfLib.PDFViewerApplication.toolbar
    // });

    AnnotationManager.download(webPdfLib.PDFViewerApplication.baseUrl, webPdfLib.PDFViewerApplication.pdfDocument);
  }

  function d_open(evtAction) {
    // 임시코드
    evtAction.value = 'off';

    // webPdfLib.PDFViewerApplication.toolbar.eventBus.dispatch('openfile', {
    //   source:  webPdfLib.PDFViewerApplication.toolbar,
    // });
  
    webPdfLib.PDFViewerApplication.toolbar.eventBus.dispatch('openfile', {
      source:  webPdfLib.PDFViewerApplication.toolbar,
    });
    
  }

  function d_print(evtAction) {
    // 임시코드
    evtAction.value = 'off';

    AnnotationManager.print(webPdfLib.PDFViewerApplication.baseUrl, webPdfLib.PDFViewerApplication.pdfDocument);
  }

  function e_dialog_print(evtAction) {}

  function d_info(evtAction) {
    // 임시코드
    evtAction.value = 'off';

    webPdfLib.PDFViewerApplication.secondaryToolbar.eventBus.dispatch('documentproperties', {
      source: webPdfLib.PDFViewerApplication.secondaryToolbar,
    });
    webPdfLib.PDFViewerApplication.secondaryToolbar.close();
  }

  function zoom(evtAction) {
    let UI_VALUE = DefineActions.uiValue;

    if (evtAction.value === UI_VALUE.zoomFit) {
      // 쪽맞춤
      if (evtAction.name == 'e_status_zoom') {
        evtAction.value = 'off';
      }

      webPdfLib.PDFViewerApplication.eventBus.dispatch('scalechanged', {
        source: webPdfLib.PDFViewerApplication.scaleSelect,
        value: 'page-height',
      });
      /*	  
      let pubAction = EventActionGenerator.makeUpdateEventAction('e_view_scale', UI_VALUE.zoomFit);
      $.publish('/ui/update', pubAction);
*/
    } else if (evtAction.value === UI_VALUE.zoomFixWidth) {
      // 폭맞춤
      if (evtAction.name == 'e_status_zoom') {
        evtAction.value = 'off';
      }

      webPdfLib.PDFViewerApplication.eventBus.dispatch('scalechanged', {
        source: webPdfLib.PDFViewerApplication.scaleSelect,
        value: 'page-width',
      });
      /*	  
      let pubAction = EventActionGenerator.makeUpdateEventAction('e_view_scale', UI_VALUE.zoomFixWidth);
      $.publish('/ui/update', pubAction);
*/
    } else if (evtAction.value === UI_VALUE.zoomIn || evtAction.value === UI_VALUE.zoomOut) {
      let value = evtAction.target.dataset.value,
        ratio = webPdfLib.PDFViewerApplication.pdfViewer._currentScale,
        scaleArray = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0, 3.0],
        index = scaleArray.indexOf(ratio),
        DEFINE_VARIABLE = DefineTypes.editorVariable;
      /*		
    let isZoomInEnable = UIDefine.EVENT_ACTION_TYPE.ENABLE,
        isZoomOutEnable = UIDefine.EVENT_ACTION_TYPE.ENABLE;

      evtAction.value = 'off';

      if (index == -1) {
        if (value === UI_VALUE.zoomIn) {
          let scales = scaleArray.filter(function (scale) {
            return scale >= ratio;
          });
          ratio = Math.min.apply(null, scales);
        } else {
          let scales = scaleArray.filter(function (scale) {
            return scale <= ratio;
          });
          ratio = Math.max.apply(null, scales);
        }
      } else {
        if (value === UI_VALUE.zoomIn) {
          ratio = index < scaleArray.length - 1 ? scaleArray[index + 1] : scaleArray[index];
        } else {
          ratio = index > 0 ? scaleArray[index - 1] : scaleArray[index];
        }
      }

      if (ratio == DEFINE_VARIABLE.maxZoom && value === 'zoom_in') {
        isZoomInEnable = UIDefine.EVENT_ACTION_TYPE.DISABLE;
      }

      if (ratio == DEFINE_VARIABLE.minZoom && value === 'zoom_out') {
        isZoomOutEnable = UIDefine.EVENT_ACTION_TYPE.DISABLE;
      }
*/
      webPdfLib.PDFViewerApplication.eventBus.dispatch('scalechanged', {
        source: webPdfLib.PDFViewerApplication.scaleSelect,
        value: ratio,
      });
      /*
      let pubAction = EventActionGenerator.makeUpdateEventAction('e_view_scale', Number(ratio).toFixed(2));
      pubAction = EventActionGenerator.addEventAction(pubAction, EventActionGenerator.makeEventActionObj(UIDefine.UPDATE_CMD, isZoomInEnable, 'e_zoom', 'zoom_in'));
      pubAction = EventActionGenerator.addEventAction(pubAction, EventActionGenerator.makeEventActionObj(UIDefine.UPDATE_CMD, isZoomOutEnable, 'e_zoom', 'zoom_out'));
      $.publish('/ui/update', pubAction);
*/
    } else if (evtAction.value === UI_VALUE.zoomFix) {
      // 100%
      evtAction.value = 'off';
      webPdfLib.PDFViewerApplication.eventBus.dispatch('scalechanged', {
        source: webPdfLib.PDFViewerApplication.scaleSelect,
        value: '1.0',
      });
      /*
      let pubAction = EventActionGenerator.makeUpdateEventAction('e_view_scale', '1.00');
      pubAction = EventActionGenerator.addEventAction(pubAction, EventActionGenerator.makeEventActionObj(UIDefine.UPDATE_CMD, UIDefine.EVENT_ACTION_TYPE.ENABLE, 'e_zoom', 'zoom_in'));
      pubAction = EventActionGenerator.addEventAction(pubAction, EventActionGenerator.makeEventActionObj(UIDefine.UPDATE_CMD, UIDefine.EVENT_ACTION_TYPE.ENABLE, 'e_zoom', 'zoom_out'));
      $.publish('/ui/update', pubAction);
*/
    } else if (evtAction.value === 'off') {
      console.log('{evtAction.name} : ' + evtAction.name + ', {evtAction.value} : ' + evtAction.value);
    } else {
      /*		
      let isZoomInEnable = UIDefine.EVENT_ACTION_TYPE.ENABLE,
        isZoomOutEnable = UIDefine.EVENT_ACTION_TYPE.ENABLE;

      if (evtAction.value == DefineTypes.editorVariable.minScale) {
        isZoomOutEnable = UIDefine.EVENT_ACTION_TYPE.DISABLE;
      }

      if (evtAction.value == DefineTypes.editorVariable.maxScale) {
        isZoomInEnable = UIDefine.EVENT_ACTION_TYPE.DISABLE;
      }
*/
      webPdfLib.PDFViewerApplication.eventBus.dispatch('scalechanged', {
        source: webPdfLib.PDFViewerApplication.scaleSelect,
        value: evtAction.value,
      });
      /*
      let pubAction = EventActionGenerator.makeEventActionObj(UIDefine.UPDATE_CMD, isZoomInEnable, 'e_zoom', 'zoom_in');
      pubAction = EventActionGenerator.addEventAction(pubAction, EventActionGenerator.makeEventActionObj(UIDefine.UPDATE_CMD, isZoomOutEnable, 'e_zoom', 'zoom_out'));
      $.publish('/ui/update', pubAction);
*/
    }
  }

  function slideshow(evtAction) {
    // 임시코드
    evtAction.value = 'off';

    if (evtAction.name == 'e_show_mode_start') {
      webPdfLib.PDFViewerApplication.secondaryToolbar.eventBus.dispatch('firstpage', {
        source: webPdfLib.PDFViewerApplication.secondaryToolbar,
      });
      webPdfLib.PDFViewerApplication.secondaryToolbar.close();
    }

    webPdfLib.PDFViewerApplication.toolbar.eventBus.dispatch('presentationmode', {
      source: webPdfLib.PDFViewerApplication.toolbar,
    });
  }

  function document_window(evtAction) {
    evtAction.value === 'on' ? webPdfLib.PDFViewerApplication.pdfSidebar.open() : webPdfLib.PDFViewerApplication.pdfSidebar.close();
  }

  function e_find_close(evtAction) {
    if (!_isFindOpened) {
      return;
    }

    if (webPdfLib.PDFViewerApplication) {
      webPdfLib.PDFViewerApplication.findBar.eventBus.dispatch('findbarclose', {
        source: webPdfLib.PDFViewerApplication.findBar,
      });

      _isFindOpened = false;
    }
  }

  function e_find_replace(evtAction) {
    if (!_isFindOpened) {
      _isFindOpened = true;
    }

    if (evtAction.value.execute === 'find_next') {
      webPdfLib.PDFViewerApplication.findBar.eventBus.dispatch('find', {
        source: webPdfLib.PDFViewerApplication.findBar,
        type: 'again',
        query: evtAction.value.find_input,
        phraseSearch: true,
        caseSensitive: evtAction.value.find_case_sensitive == 'false' ? 0 : 1,
        entireWord: evtAction.value.find_entire_word == 'false' ? 0 : 1,
        highlightAll: evtAction.value.find_highlight_all == 'false' ? 0 : 1,
        findPrevious: evtAction.value.direction_forward == 'down' ? 0 : 1,
        matchDiacritics: false,
      });
/*
      let addAction = EventActionGenerator.addFocusProperty(evtAction, 'find_input');
      evtAction = EventActionGenerator.addEventAction(evtAction, addAction);
      $.publish('/ui/update', evtAction);
*/	  
    }
  }

  function switchcursortool(evtAction) {
    const details = {
      source: webPdfLib.PDFViewerApplication.secondaryToolbar,
      tool: evtAction.name === 't_select' ? 0 : 1,
    };
    webPdfLib.PDFViewerApplication.secondaryToolbar.eventBus.dispatch('switchcursortool', details);
    webPdfLib.PDFViewerApplication.secondaryToolbar.close();
    if (evtAction.value === 'on') {
/*		
      $.publish('/ui/update', EventActionGenerator.makeUpdateEventAction(evtAction.name === 't_select' ? 't_hand' : 't_select', 'off'));
*/	  
      // 손도구가 클릭되어 있을 경우 주석관련 액션 비활성화
      AnnotationManager.switchUI(evtAction.name === 't_hand' ? 'none' : 'cursor');
/*	  
      if (!Util.isViewMode()) {
        UiManager.setEnableAnnotate(evtAction.name === 't_hand' ? false : true);
      }
*/	  
    }
  }

  function e_select_all(evtAction) {
    // 임시코드
    evtAction.value = 'off';
    _isAllSelected = true;

    let elements = document.querySelectorAll('.page');
    var selection = window.getSelection();
    var range = document.createRange();
    range.setStartBefore(elements[0]);
    range.setEndAfter(elements[elements.length - 1]);
    selection.removeAllRanges();
    selection.addRange(range);

    // 모두 선택 전에 툴바 밑줄, 취소선, 형광펜이 선택되어 있으면 해제해준다.
/*	
    let pubAction = EventActionGenerator.makeEventActionObj(UIDefine.UPDATE_CMD, UIDefine.EVENT_ACTION_TYPE.ENABLE, UIDefine.EVENT_ACTION_NAMES.E_COPY, '');
    pubAction = EventActionGenerator.addEventAction(pubAction, EventActionGenerator.makeEventActionObj(UIDefine.UPDATE_CMD, UIDefine.EVENT_ACTION_TYPE.UI, UIDefine.EVENT_ACTION_NAMES.A_HIGHLIGHT, 'off'));
    pubAction = EventActionGenerator.addEventAction(pubAction, EventActionGenerator.makeEventActionObj(UIDefine.UPDATE_CMD, UIDefine.EVENT_ACTION_TYPE.UI, UIDefine.EVENT_ACTION_NAMES.A_STRIKOUT, 'off'));
    pubAction = EventActionGenerator.addEventAction(pubAction, EventActionGenerator.makeEventActionObj(UIDefine.UPDATE_CMD, UIDefine.EVENT_ACTION_TYPE.UI, UIDefine.EVENT_ACTION_NAMES.A_UNDERLINE, 'off'));
    $.publish('/ui/update', pubAction);
*/
    AnnotationManager.switchUI('none');
  }

  function e_copy(evtAction) {
    // 임시코드
    evtAction.value = 'off';

    document.execCommand('copy'); //복사
  }

  function e_viewsidebar_tab(evtAction) {
/*	
    if (evtAction.value === 'viewOutline') {
      webPdfLib.PDFViewerApplication.pdfSidebar.switchView(2, true);
      UiController.updateUi(EventActionGenerator.makeEventActionObj(UIDefine.UPDATE_CMD, UIDefine.EVENT_ACTION_TYPE.VISIBLE, 'sidebar_area', ''));
      UiController.updateUi(EventActionGenerator.makeEventActionObj(UIDefine.UPDATE_CMD, UIDefine.EVENT_ACTION_TYPE.HIDDEN, 'shape_sidebar_area', ''));
    } else if (evtAction.value === 'viewAttachments') {
      webPdfLib.PDFViewerApplication.pdfSidebar.switchView(3, true);
      UiController.updateUi(EventActionGenerator.makeEventActionObj(UIDefine.UPDATE_CMD, UIDefine.EVENT_ACTION_TYPE.VISIBLE, 'sidebar_area', ''));
      UiController.updateUi(EventActionGenerator.makeEventActionObj(UIDefine.UPDATE_CMD, UIDefine.EVENT_ACTION_TYPE.HIDDEN, 'shape_sidebar_area', ''));
    } else if (evtAction.value === 'viewLayers') {
      webPdfLib.PDFViewerApplication.pdfSidebar.switchView(4, true);
      UiController.updateUi(EventActionGenerator.makeEventActionObj(UIDefine.UPDATE_CMD, UIDefine.EVENT_ACTION_TYPE.VISIBLE, 'sidebar_area', ''));
      UiController.updateUi(EventActionGenerator.makeEventActionObj(UIDefine.UPDATE_CMD, UIDefine.EVENT_ACTION_TYPE.HIDDEN, 'shape_sidebar_area', ''));
    } else if (evtAction.value === 'drawn') {
      UiController.updateUi(EventActionGenerator.makeEventActionObj(UIDefine.UPDATE_CMD, UIDefine.EVENT_ACTION_TYPE.HIDDEN, 'sidebar_area', ''));

      hiddenSidebarArea();

      UiController.updateUi(EventActionGenerator.makeEventActionObj(UIDefine.UPDATE_CMD, UIDefine.EVENT_ACTION_TYPE.VISIBLE, 'shape_sidebar_area', ''));
      UiController.updateUi(EventActionGenerator.makeEventActionObj(UIDefine.UPDATE_CMD, UIDefine.EVENT_ACTION_TYPE.VISIBLE, 'shape_fill_properties', ''));
      UiController.updateUi(EventActionGenerator.makeEventActionObj(UIDefine.UPDATE_CMD, UIDefine.EVENT_ACTION_TYPE.VISIBLE, 'shape_line_properties', ''));
      UiController.updateUi(EventActionGenerator.makeEventActionObj(UIDefine.UPDATE_CMD, UIDefine.EVENT_ACTION_TYPE.VISIBLE, 'shape_opacity_properties', ''));
    }
*/	
  }

  function hiddenSidebarArea() {
/*	
    let pubAction = EventActionGenerator.makeEventActionObj(UIDefine.UPDATE_CMD, UIDefine.EVENT_ACTION_TYPE.HIDDEN, 'shape_sidebar_area', '');

    pubAction = EventActionGenerator.addEventAction(pubAction, EventActionGenerator.makeEventActionObj(UIDefine.UPDATE_CMD, UIDefine.EVENT_ACTION_TYPE.HIDDEN, 'shape_fill_properties', ''));
    pubAction = EventActionGenerator.addEventAction(pubAction, EventActionGenerator.makeEventActionObj(UIDefine.UPDATE_CMD, UIDefine.EVENT_ACTION_TYPE.HIDDEN, 'shape_line_properties', ''));
    pubAction = EventActionGenerator.addEventAction(pubAction, EventActionGenerator.makeEventActionObj(UIDefine.UPDATE_CMD, UIDefine.EVENT_ACTION_TYPE.HIDDEN, 'shape_opacity_properties', ''));

    UiController.updateUi(pubAction);
*/	
  }

  function e_first_slide(evtAction) {
    // 임시코드
    evtAction.value = 'off';

    webPdfLib.PDFViewerApplication.secondaryToolbar.eventBus.dispatch('firstpage', {
      source: webPdfLib.PDFViewerApplication.toolbar,
    });
  }

  function e_previous_slide(evtAction) {
    // 임시코드
    evtAction.value = 'off';

    webPdfLib.PDFViewerApplication.secondaryToolbar.eventBus.dispatch('previouspage', {
      source: webPdfLib.PDFViewerApplication.toolbar,
    });
  }

  function e_next_slide(evtAction) {
    // 임시코드
    evtAction.value = 'off';

    webPdfLib.PDFViewerApplication.secondaryToolbar.eventBus.dispatch('nextpage', {
      source: webPdfLib.PDFViewerApplication.toolbar,
    });
  }

  function e_last_slide(evtAction) {
    // 임시코드
    evtAction.value = 'off';

    webPdfLib.PDFViewerApplication.secondaryToolbar.eventBus.dispatch('lastpage', {
      source: webPdfLib.PDFViewerApplication.toolbar,
    });
  }

  function page_number(evtAction) {
    if (evtAction.value.pageNumber <= webPdfLib.PDFViewerApplication.pdfLinkService.pagesCount) {
		webPdfLib.PDFViewerApplication.toolbar.eventBus.dispatch('pagenumberchanged', {
        source: webPdfLib.PDFViewerApplication.toolbar,
        value: evtAction.value.pageNumber,
      });
    }
  }

  function e_undo(evtAction) {
    // 임시코드
    evtAction.value = 'off';

    webPdfLib.gUndoRedoManager.Undo();
  }

  function e_redo(evtAction) {
    // 임시코드
    evtAction.value = 'off';

    webPdfLib.gUndoRedoManager.Redo();
  }

  function a_delete_annotation(evtAction) {
    // 임시코드
    evtAction.value = 'off';

    AnnotationManager.deleteAnnotation();
    var selection = window.getSelection();
    selection.removeAllRanges();
/*	
    UiManager.setSelection(selection);
*/	
  }

  function a_quick_underline(evtAction) {
    // 임시코드
    evtAction.value = 'off';
/*
	// let selection = UiManager.getSelection();
    // let range = selection.getRangeAt(0);
    let range = UiManager.getRange();

    let rects = range.getClientRects();
    AnnotationManager.saveRect('underline', rects);
*/	
  }

  function a_quick_strikeout(evtAction) {
    // 임시코드
    evtAction.value = 'off';
/*
    // let selection = UiManager.getSelection();
    // let range = selection.getRangeAt(0);
    let range = UiManager.getRange();

    let rects = range.getClientRects();
    AnnotationManager.saveRect('strikeout', rects);
*/	
  }

  function a_quick_highlight(evtAction) {
    // 임시코드
    evtAction.value = 'off';
/*
    // let selection = UiManager.getSelection();
    // let range = selection.getRangeAt(0);
    let range = UiManager.getRange();

    let rects = range.getClientRects();
    AnnotationManager.saveRect('highlight', rects);
*/	
  }

  function a_underline(evtAction) {
    if (checkAllSelectStatus()) {
      evtAction.value = 'off';
      return;
    }
/*	
    // let sel = UiManager.getSelection();
    // let range = (sel.rangeCount > 0) ? sel.getRangeAt(0) : null;
    let range = UiManager.getRange();

    // text selection 상태일 경우 팝업 액션을 실행
    if (range && !range.collapsed) {
      evtAction.value = 'off';
      let rects = range.getClientRects();
      AnnotationManager.saveRect('underline', rects);
    } else {
      AnnotationExecutor.switchAnnotation(evtAction);
    }
*/	
  }

  function a_strikeout(evtAction) {
    if (checkAllSelectStatus()) {
      evtAction.value = 'off';
      return;
    }
/*	
    // let sel = UiManager.getSelection();
    // let range = (sel.rangeCount > 0) ? sel.getRangeAt(0) : null;
    let range = UiManager.getRange();

    // text selection 상태일 경우 팝업 액션을 실행
    if (range && !range.collapsed) {
      evtAction.value = 'off';
      let rects = range.getClientRects();
      AnnotationManager.saveRect('strikeout', rects);
    } else {
      AnnotationExecutor.switchAnnotation(evtAction);
    }
*/	
  }

  function a_highlight(evtAction) {
/* 
    if (checkAllSelectStatus()) {
      evtAction.value = 'off';
      return;
    }
	
    // let sel = UiManager.getSelection();
    // let range = (sel.rangeCount > 0) ? sel.getRangeAt(0) : null;
    let range = UiManager.getRange();

    // text selection 상태일 경우 팝업 액션을 실행
    if (range && !range.collapsed) {
      evtAction.value = 'off';
      let rects = range.getClientRects();
      AnnotationManager.saveRect('highlight', rects);
    } else {
      AnnotationExecutor.switchAnnotation(evtAction);
    }
*/	
    AnnotationExecutor.switchAnnotation(evtAction);
  }

  function checkAllSelectStatus() {
    // 모두 선택 상태에서 밑줄, 취소선, 형광펜 적용 시 토스트 메시지 호출
    if (_isAllSelected) {
/*		
      UiController.showToast(
        window.LangDefine.AllSelectErrorMessage,
        {
          top: '50%',
          left: '40%',
          direction: 'bottom',
          move: 0,
          opacity: 1,
          align: 'center',
        },
        1
      );

      var selection = window.getSelection();
      selection.removeAllRanges();
      UiManager.setSelection(selection);
      _isAllSelected = false;
*/
      return true;
    }

    return false;
  }

  function e_dialog_password(evtAction) {
    webPdfLib.PDFViewerApplication.passwordPrompt.verify(evtAction.value.file_password);
  }

  const _actionMap = (function () {
    return new Map([
      ['d_save', save],
      ['d_download', download],
      ['d_pdf_download', download],
      ['d_open', d_open],
      ['d_print', d_print],
      ['e_dialog_print', e_dialog_print],
      ['d_info', d_info],
      ['e_view_scale', zoom],
      ['e_zoom', zoom],
      ['e_status_zoom', zoom],
      ['v_view_scale', zoom],
      ['e_show_mode_start', slideshow],
      ['e_show_mode', slideshow],
      ['document_window', document_window],
      ['e_find_close', e_find_close],
      ['e_find_replace', e_find_replace],
      ['t_select', switchcursortool],
      ['t_hand', switchcursortool],
      ['e_select_all', e_select_all],
      ['e_copy', e_copy],
      ['e_viewsidebar_tab', e_viewsidebar_tab],
      ['e_first_slide', e_first_slide],
      ['e_previous_slide', e_previous_slide],
      ['e_next_slide', e_next_slide],
      ['e_last_slide', e_last_slide],
      ['page_number', page_number],
      ['a_line', AnnotationExecutor.switchAnnotation],
      ['a_area', AnnotationExecutor.switchAnnotation],
      ['a_draw', AnnotationExecutor.switchAnnotation],
      ['a_point', AnnotationExecutor.switchAnnotation],
      ['a_text', AnnotationExecutor.switchAnnotation],
      ['a_underline', a_underline],
      ['a_strikeout', a_strikeout],
      ['a_highlight', a_highlight],
      ['e_undo', e_undo],
      ['e_redo', e_redo],
      ['a_delete_annotation', a_delete_annotation],
      ['a_quick_underline', a_quick_underline],
      ['a_quick_strikeout', a_quick_strikeout],
      ['a_quick_highlight', a_quick_highlight],
      ['e_dialog_password', e_dialog_password],
    ]);
  })();

  return {
    execute(evtAction) {
      let action = _actionMap.get(evtAction.name);
      if (action) {
        action(evtAction);
      }
    },

    setAllSelectStatus(select) {
/*      
      if (_isAllSelected) {
        var selection = window.getSelection();
        selection.removeAllRanges();
        UiManager.setSelection(selection);
      }
      _isAllSelected = select;
*/      
    },

    isFindOpened() {
      return _isFindOpened;
    },
  };
})();
