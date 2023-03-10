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
import uiManager from '../uiFrame/uiManager.js';
import annotationManager from '../annotation/annotationManager.js';

export default (function () {
  let _isAllSelected = false;

  async function save(_evtAction) {
    console.group(`function save(_evtAction)`);
    await AnnotationManager.save(webPdfLib.PDFViewerApplication.baseUrl, webPdfLib.PDFViewerApplication.pdfDocument, false);
    console.groupEnd();
  }

  async function download(_evtAction) {
    console.group(`function download(_evtAction)`);
    await AnnotationManager.download(webPdfLib.PDFViewerApplication.baseUrl, webPdfLib.PDFViewerApplication.pdfDocument);
    console.groupEnd();
  }

  function d_open(_evtAction) {
    console.group(`function d_open(_evtAction)`);
    webPdfLib.PDFViewerApplication.toolbar.eventBus.dispatch('openfile', {
      source:  webPdfLib.PDFViewerApplication.toolbar,
    });
    console.groupEnd();
  }

  function d_print(_evtAction) {
    console.group(`function d_print(_evtAction)`);
    AnnotationManager.print(webPdfLib.PDFViewerApplication.baseUrl, webPdfLib.PDFViewerApplication.pdfDocument);
    console.groupEnd();
  }

  function d_info(_evtAction) {
    console.group(`function d_info(_evtAction)`);
    webPdfLib.PDFViewerApplication.secondaryToolbar.eventBus.dispatch('documentproperties', {
      source: webPdfLib.PDFViewerApplication.secondaryToolbar,
    });
    console.warn(`function d_info(_evtAction) ??????????????? ?????? ??????`);
    console.groupEnd();
  }

  function d_find(_evtAction) {
    console.group(`function d_find(_evtAction)`);
    console.warn(`function d_find(_evtAction) ??????????????? ?????? ??????`);
    console.groupEnd();
  }
  
  /**
   * 
   * @param {*} evtAction 
   * page-height ?????????
   * page-width ?????????
   * 0.1 ~ 3.0 ??????
   */
  function zoom(evtAction) {
    console.group(`function zoom(evtAction)`);

    const value = evtAction.value;
    console.log(`current scaleValue = ${annotationManager.currentScaleValue}`);
    annotationManager.currentScaleValue = value;
    console.log(`changed scaleValue = ${annotationManager.currentScaleValue}`);
    
    console.groupEnd();
  }

  function slideshow(evtAction) {
    console.group(`function slideshow(evtAction)`);

    if (evtAction.name == 'e_show_mode_start') {
      webPdfLib.PDFViewerApplication.secondaryToolbar.eventBus.dispatch('firstpage', {
        source: webPdfLib.PDFViewerApplication.secondaryToolbar,
      });
      webPdfLib.PDFViewerApplication.secondaryToolbar.close();
    }

    webPdfLib.PDFViewerApplication.toolbar.eventBus.dispatch('presentationmode', {
      source: webPdfLib.PDFViewerApplication.toolbar,
    });

    console.groupEnd();
  }

  function document_window(evtAction) {
    console.group(`function document_window(evtAction)`);

    if (webPdfLib.PDFViewerApplication.pdfSidebar.isOpen) {
      webPdfLib.PDFViewerApplication.pdfSidebar.close();
    } else {
      webPdfLib.PDFViewerApplication.pdfSidebar.open()
    }

    console.groupEnd();
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
      // ???????????? ???????????? ?????? ?????? ???????????? ?????? ????????????
      AnnotationManager.switchUI(evtAction.name === 't_hand' ? 'none' : 'cursor');
/*	  
      if (!Util.isViewMode()) {
        UiManager.setEnableAnnotate(evtAction.name === 't_hand' ? false : true);
      }
*/	  
    }
  }

  function e_select_all(evtAction) {
    // ????????????
    evtAction.value = 'off';
    _isAllSelected = true;

    let elements = document.querySelectorAll('.page');
    var selection = window.getSelection();
    var range = document.createRange();
    range.setStartBefore(elements[0]);
    range.setEndAfter(elements[elements.length - 1]);
    selection.removeAllRanges();
    selection.addRange(range);

    // ?????? ?????? ?????? ?????? ??????, ?????????, ???????????? ???????????? ????????? ???????????????.
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
    // ????????????
    evtAction.value = 'off';

    document.execCommand('copy'); //??????
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
    // ????????????
    evtAction.value = 'off';

    webPdfLib.PDFViewerApplication.secondaryToolbar.eventBus.dispatch('firstpage', {
      source: webPdfLib.PDFViewerApplication.toolbar,
    });
  }

  function e_previous_slide(evtAction) {
    // ????????????
    evtAction.value = 'off';

    webPdfLib.PDFViewerApplication.secondaryToolbar.eventBus.dispatch('previouspage', {
      source: webPdfLib.PDFViewerApplication.toolbar,
    });
  }

  function e_next_slide(evtAction) {
    // ????????????
    evtAction.value = 'off';

    webPdfLib.PDFViewerApplication.secondaryToolbar.eventBus.dispatch('nextpage', {
      source: webPdfLib.PDFViewerApplication.toolbar,
    });
  }

  function e_last_slide(evtAction) {
    // ????????????
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
    // ????????????
    evtAction.value = 'off';

    webPdfLib.gUndoRedoManager.Undo();
  }

  function e_redo(evtAction) {
    // ????????????
    evtAction.value = 'off';

    webPdfLib.gUndoRedoManager.Redo();
  }

  function a_delete_annotation(evtAction) {
    // ????????????
    evtAction.value = 'off';

    AnnotationManager.deleteAnnotation();
    var selection = window.getSelection();
    selection.removeAllRanges();
/*	
    UiManager.setSelection(selection);
*/	
  }

  function a_quick_underline(evtAction) {
    // ????????????
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
    // ????????????
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
    // ????????????
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

    // text selection ????????? ?????? ?????? ????????? ??????
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

    // text selection ????????? ?????? ?????? ????????? ??????
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

    // text selection ????????? ?????? ?????? ????????? ??????
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
    // ?????? ?????? ???????????? ??????, ?????????, ????????? ?????? ??? ????????? ????????? ??????
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
      ['d_open', d_open],
      ['d_print', d_print],
      ['d_info', d_info],
      ['d_find', d_find],
      ['e_zoom', zoom],
      ['e_show_mode_start', slideshow],
      ['e_show_mode', slideshow],
      ['document_window', document_window],
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
  };
})();
