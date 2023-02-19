// annotationActionExecutor.js
/*
import EventActionGenerator from "../../../commonFrame/js/uiFramework/eventActionGenerator.js";
import UiController from "../../../commonFrame/js/uiFramework/uiController.js";
import UIDefine from "../../../commonFrame/js/uiFramework/uiDefine.js";
*/
import AnnotationManager from "../annotation/annotationManager.js";

export default (function () {
	

  function _ToAnnotationType(actionName) {
    let annotationType = null;
    switch(actionName) {
      case 'a_line':
      case 'a_area':
      case 'a_strikeout':
      case 'a_highlight':
      case 'a_draw':
      case 'a_point':
      case 'a_text':
      case 'a_underline':
        annotationType = actionName.substring(2);
        break;
      default:
        break;
    }

    return annotationType;
  };

  function _ToActionName(annotationType) {
    let actionName = null;
    switch(annotationType) {
      case 'line':
      case 'area':
      case 'strikeout':
      case 'highlight':
      case 'draw':
      case 'point':
      case 'text':
      case 'underline':
        actionName = 'a_' + annotationType;
        break;
      default:
        break;
    }

    return actionName;
  };

  return {
    updateUI : function(annotationType, value = 'off') {
/*      
      let actionName = _ToActionName(annotationType);
      if (actionName) {
        $.publish("/ui/update", EventActionGenerator.makeUpdateEventAction(actionName, value));  
      }
*/      
    },

    execCommand : function(cmdType, cmdValue) {
      AnnotationManager.execCommand(cmdType, cmdValue);
    },
    
    switchAnnotation : function(evtAction) {
      let annotationType = _ToAnnotationType(evtAction.name);
      if (AnnotationManager.annotationType === annotationType) {
        annotationType = 'cursor';
      }
      AnnotationManager.switchUI(annotationType);
    }
	};

})();
