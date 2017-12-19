var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var userSchema = new Schema({
    email		: String,
    password	: String,
    username: {
      type: String,
      default: ''
    },
    followings : [ObjectId],
    followers : [ObjectId],
    favoritecards: {
      type: [ObjectId],
      default: []
    },
    description: {
      type: String,
      default: ''
    },
    headpicture: {
      type: String,
      default: "https://media.licdn.com/mpr/mpr/AAEAAQAAAAAAAAkhAAAAJDFiYjhiOGMxLTY2NWEtNGE1OS1hZGY4LTY1MDIzYjFkNDJiZQ.jpg"
    }
});

userSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
