//params: initial state

import { FETCH_FOLLOWINGS } from '../actions/actionTypes';

export default function(state = [], action){
  // console.log("action: ");
  // console.log(action);
  switch(action.type){
    case FETCH_FOLLOWINGS:
      return action.payload;
    default:
      return state;
  }
}
