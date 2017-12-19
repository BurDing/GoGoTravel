//params: initial state

import { FETCH_FOLLOWERS } from '../actions/actionTypes';

export default function(state = [], action){
  // console.log("action: ");
  // console.log(action);
  switch(action.type){
    case FETCH_FOLLOWERS:
      return action.payload;
    default:
      return state;
  }
}
