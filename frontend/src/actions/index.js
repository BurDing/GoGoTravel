import axios from 'axios';
import { FETCH_USER, FETCH_CARDS, FETCH_FOLLOWINGS, FETCH_FOLLOWERS, DELETE_CARDS, CHECK_IF_FAV  } from './actionTypes'

// const fetchUser = () => {
//   axios.get('/login')
// }

export const fetchUser = () => async dispatch => {
  //get the information of current user
  const res = await axios.get('/api/profile');

  dispatch({ type: FETCH_USER, payload: res.data });
};


export const submitCard = (values, history) => async dispatch => {
  const { card_name, address, day, money, picture, post_txt } = values;
  const addressList = address.split(",");

  const city_name = addressList[0];
  let Latitude = 0;
  let Longitude = 0;

  let count = 0;
  for(let elem of addressList){
    if(!isNaN(elem)){
      if(count == 0){
        Latitude = elem;
        count ++;
      }
      else if (count == 1){
        Longitude = elem;
        count ++;
      }
    }
  }

  const craftedValues = {
    card_name, city_name, Latitude, Longitude, day, money, picture, post_txt
  };


  const res = await axios.post('/api/cards', craftedValues);
  history.push('/profile');
  dispatch({ type: FETCH_USER, payload: res.data });
};


export const fetchCards = () => async dispatch => {
  const res = await axios.get('/api/cards');

  dispatch({ type: FETCH_CARDS, payload: res.data });
};


export const fetchFollowings= () => async dispatch => {
  const res = await axios.get('/api/followings');
  console.log(res);

  dispatch({ type: FETCH_FOLLOWINGS, payload: res.data });
};


export const fetchFollowers= () => async dispatch => {
  const res = await axios.get('/api/followers');
  console.log("ccccccc");
  console.log(res);

  dispatch({ type: FETCH_FOLLOWERS, payload: res.data });
};


export const deleteCards = (cardId, history) => async dispatch => {
    console.log("delete card");
    const cardIdObj = {"cardId": cardId};
    const res = await axios.post('/api/deletecards', cardIdObj);
    history.push('/profile');

  dispatch({ type: FETCH_CARDS, payload: res.data });
};


export const updateProfile = (value, history) => async dispatch => {
    console.log("updating user");
    const res = await axios.post('/api/updateuser', value);
    history.push('/profile');

    dispatch({ type: FETCH_USER, payload: res.data });
};


// export const followUser = (value, history) => async dispatch => {
//     console.log("follow a user");
//     const res = await axios.post('/api/followuser', value);
//
//     dispatch({ type: FOLLOW_USER, payload: res.data });
// };

// export const fetchFavoriteCards = () => async dispatch => {
//   const res = await axios.get('/api/favoritecards');
//
//   dispatch({ type: FETCH_CARDS, payload: res.data });
// };

// export const checkIfFavorite = (value) => async dispatch => {
//   console.log("check if like a card");
//   const craftedValues = {favoritecardId: value};
//   const res = await axios.post('/api/checkiffavorite', craftedValues);
//
//   dispatch({ type: CHECK_IF_FAV, payload: res.data });
// };
//
//
// export const flipIfFavorite = (value, iffavorite) => async dispatch => {
//   console.log("flip favorite status");
//   const craftedValues = {favoritecardId: value};
//   let res;
//   if(iffavorite){
//     res = await axios.post('/api/cancelcardfavorite', craftedValues);
//   }
//   else{
//     res = await axios.post('/api/addcardfavorite', craftedValues);
//   }
//
//   dispatch({ type: CHECK_IF_FAV, payload: res.data });
// };
//
//
// //only for cancel, actually is a branch of the flipIfFavorite fucnitons, above, the purpose is to handle a new parameter: history
// export const cancelFavorite = (value, history) => async dispatch => {
//   console.log("cancel favorite status");
//   const craftedValues = {favoritecardId: value};
//
//   const res = await axios.post('/api/cancelcardfavorite', craftedValues);
//   history.push('./profile/favorite');
//   dispatch({ type: CHECK_IF_FAV, payload: res.data });
// };


// export const addFavoriteCards = (value) => async dispatch => {
//
//     const res = await axios.post('/api/addfavorite', value);
//
//     dispatch({ type: FETCH_USER, payload: res.data });
// };
//
// export const cancelFavoriteCards = (value, history) => async dispatch => {
//     console.log("unlike a card");
//
//     const res = await axios.post('/api/cancelfavorite', craftedValues);
//
//     dispatch({ type: FETCH_USER, payload: res.data });
// };
