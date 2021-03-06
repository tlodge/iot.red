import {NODE_MOUSE_DOWN, NODE_DOUBLE_CLICKED, NODE_CANCEL_CLICKED, NODE_TOUCH_START, NODE_TOUCH_END, NODE_MOUSE_ENTER, NODE_MOUSE_EXIT, NODE_LOAD} from '../constants/ActionTypes';
 


export function nodeMouseDown(node, event){
    return {
      type: NODE_MOUSE_DOWN,
      node,
      event,
    }
} 

export function nodeDoubleClicked(node, event){

  return function (dispatch, getState) {
  
    
    dispatch ({
        type: NODE_DOUBLE_CLICKED,
        node,
        event,
    });
    
    dispatch({
        type: NODE_LOAD,
        node,
        id: node.id
    })
    
    console.log("dispacthin node double ckceld");
    

   
  }
} 

export function nodeTouchStart(node, event){
    return {
      type: NODE_TOUCH_START,
      node,
      event,
    }
}

export function nodeTouchEnd(node, event){
    return {
      type: NODE_TOUCH_END,
      node,
      event
    }
}

export function nodeMouseEnter(node, event){
    return {
      type: NODE_MOUSE_ENTER,
      node,
      event
    }
}

export function nodeMouseLeave(node, event){
    return {
      type: NODE_MOUSE_LEAVE,
      node,
      event
    }
}