const mongoose = require('mongoose');
const { Schema } = mongoose;

var cardSchema = new Schema({
  userId		: String,
  username	: String,
  user_head_photo: String,

  Latitude: String,
  Longitude: String,
  city_name: String,

  card_name: String,
  post_txt: String,
  money: Number,
  day: Number,
  picture: String,
  likes_number: {
    type: Number,
    default: 0
  }

});

mongoose.model('card', cardSchema);
