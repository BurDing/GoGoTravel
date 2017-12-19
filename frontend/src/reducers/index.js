//purpuse of this index.js: import reducer's directory


//import profile reducers here
import {combineReducers} from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import profileReducer from './profileReducer';
import followingReducer from './followingReducer';
import followerReducer from './followerReducer';


export default combineReducers ({
  auth: authReducer,
  form: reduxForm,
  profile: profileReducer,
  followings: followingReducer,
  followers: followerReducer
});
