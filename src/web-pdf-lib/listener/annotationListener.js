// annotationListener.js
/*
import UiController from '../../../commonFrame/js/uiFramework/uiController.js';
import UIDefine from '../../../commonFrame/js/uiFramework/uiDefine.js';
import CommonFrameUtil from '../../../commonFrame/js/utils/util.js';
*/
/*
import UiManager from '../../uiFrame/uiManager.js';
*/
import { AddFormCommand, AddChildFormCommand, ModifyFormCommand, RemoveFormCommand, ModifyComment } from '../undoRedo/UndoRedoCommand.js';
import webPdfLib from '../webPdfLib.js';
import annotationManager from '../annotation/annotationManager.js';

export default (function () {
  
  function clearSelection() {
    if (window.getSelection) {
      window.getSelection().removeAllRanges();
    } else if (document.selection) {
      document.selection.empty();
    }
  }

  return {
    onAnnotationAdd: function (docId, pageNumber, annotation) {
      console.log(`call annotationListener.onAnnotationAdd(docId = ${docId}, pageNumber = ${pageNumber}, annotation =`, annotation, ')');
    },
    onAnnotationEdit: function (docId, annotationId, annotation) {
      console.log(`call annotationListener.onAnnotationEdit(docId = ${docId}, annotationId = ${annotationId}, annotation =`, annotation, ')');
    },
    onAnnotationDelete: function (docId, annotationId) {
      console.log(`call annotationListener.onAnnotationDelete(docId = ${docId}, annotationId = ${annotationId})`);
    },
    onCommentAdd: function (docId, annotationId, comment) {
      console.log(`call annotationListener.onCommentAdd(docId = ${docId}, annotationId = ${annotationId}, comment =`, comment, ')');
    },
    onCommentDelete: function (docId, commentId) {
      console.log(`call annotationListener.onCommentAdd(docId = ${docId}, annotationId = ${commentId})`);
    },

    onAnnotationUpdated: function (docId, annotations) {
      console.log(`call annotationListener.onAnnotationUpdated(docId = ${docId}, annotationId =`, annotations, ')');
      annotationManager.modified = true;
    },

    // 도형 클릭 선택
    onAnnotationSelected: function (target, rects) {
      console.log('call annotationListener.onAnnotationSelected(target = ', target, ')');
/*      
      UiManager.updateAnnotationUI(target);
      if (UiController.isShowQuickMenu()) {
        UiController.hideTool(UIDefine.TOOL_QUICK_MENU);
      }

      // 주석 메뉴 기본 위치에서 보이기
      if (!CommonFrameUtil.getBrowserDevice().isMobile) {
        UiController.showTool(UIDefine.TOOL_ANNOTATION_MENU);
      }

      // 주석 메뉴 위치 수정
      {
        const pageBounds = target.parentNode.getBoundingClientRect();
        const annotationMenuEl = UiController.getToolElement(UIDefine.TOOL_ANNOTATION_MENU);
        const annotationMenuMargin = 2;

        const menuWidth = annotationMenuEl.offsetWidth;
        const menuHeight = annotationMenuEl.offsetHeight;

        let x = pageBounds.x + rects.right;
        let y = pageBounds.y + rects.top;

        // 메뉴가 오른쪽으로 넘어갈 경우
        if (pageBounds.right < x + menuWidth) {
          x = pageBounds.right - menuWidth;
        }
        // 메뉴가 왼쪽으로 넘어갈 경우
        if (x < 0) {
          x = 0;
        }

        if (pageBounds.bottom < y + menuHeight) {
          // 메뉴가 영역 아래로 넘어갈 경우
          y = pageBounds.bottom - menuHeight;
        } else if (y - menuHeight - annotationMenuMargin < 0) {
          // 메뉴가 영역 위로 넘어갈 경우
          y += annotationMenuMargin;
        } else {
          y = y - menuHeight - annotationMenuMargin;
        }

        annotationMenuEl.style.left = `${x}px`;
        annotationMenuEl.style.top = `${y}px`;
      }
*/
      clearSelection();
    },

    // 클릭된 도형 해제
    onAnnotationUnSelected: function (target) {
      console.log('call annotationListener.onAnnotationUnSelected(target = ', target, ')');
/*      
      UiManager.updateAnnotationUI(null);
      UiController.hideTool(UIDefine.TOOL_ANNOTATION_MENU);
*/      
    },

    onAnnotationAddForm: function (docId, pageId, target, result) {
      console.log(`call annotationListener.onAnnotationAddForm(docId = ${docId}, pageId = ${pageId}, target = `, target, `, result =`, result, ')');
      if (annotationManager.annotationType != 'draw' && annotationManager.annotationType != 'cursor') {
        annotationManager.switchUI('cursor');
      }
      webPdfLib.gUndoRedoManager.Add(new AddFormCommand(docId, pageId, target, result));
      annotationManager.renderThumnail(pageId);
    },
    onAnnotationAddChildForm: function (docId, pageId, target, result) {
      console.log(`call annotationListener.onAnnotationAddChildForm(docId = ${docId}, pageId = ${pageId}, target = `, target, `, result =`, result, ')');
      webPdfLib.gUndoRedoManager.Add(new AddChildFormCommand(docId, pageId, target, result));
      annotationManager.renderThumnail(pageId);
    },
    onAnnotationModifyForm: function (docId, pageId, target, result) {
      console.log(`call annotationListener.onAnnotationModifyForm(docId = ${docId}, pageId = ${pageId}, target = `, target, `, result =`, result, ')');
      webPdfLib.gUndoRedoManager.Add(new ModifyFormCommand(docId, pageId, target, result));
      annotationManager.renderThumnail(pageId);
    },
    onAnnotationRemoveForm: function (docId, pageId, target, result) {
      console.log(`call annotationListener.onAnnotationRemoveForm(docId = ${docId}, pageId = ${pageId}, target = `, target, `, result =`, result, ')');
      webPdfLib.gUndoRedoManager.Add(new RemoveFormCommand(docId, pageId, target, result));
      annotationManager.renderThumnail(pageId);
    },
    onAnnotationModifyComment: function (docId, pageId, target, result) {
      console.log(`call annotationListener.onAnnotationModifyComment(docId = ${docId}, pageId = ${pageId}, target = `, target, `, result =`, result, ')');
      webPdfLib.gUndoRedoManager.Add(new ModifyComment(docId, pageId, target, result));
    },
    onSetAnnotationSidebarEnable: function (value) {
      console.log(`call annotationListener.onSetAnnotationSidebarEnable(value = ${value})`);
/*      
      UiManager.onSetAnnotationSidebarEnable(value);
*/      
    },
    onSetStyleBarDisableState: function (value) {
      console.log(`call annotationListener.onSetDisableState(value = ${value})`);
/*      
      UiManager.onSetStyleBarDisableState(value);
*/      
    },
    onSetUIEvents: function (value) {
      console.log(`call annotationListener.onSetUIEvents(value = ${value})`);
/*      
      UiManager.onSetUIEvents(value);
*/      
    },
    onSetPopupEditingState: function (value) {
      console.log(`call annotationListener.onSetPopupEditingState(value = ${value})`);
/*      
      UiManager.setPopupEditing(value);
*/      
    },
    onSetEventAction: function (state, value) {
      console.log(`call annotationListener.onSetEventAction`);
/*      
      UiManager.setEventAction(state, value);
*/      
    },

    onAnnotationAddComment: function (documentId, annotationId, content, dataString, author) {
      console.log(`call annotationListener.onAnnotationAddComment`);
      annotationManager.addComment(documentId, annotationId, content, dataString, author);
    },
  };
})();
