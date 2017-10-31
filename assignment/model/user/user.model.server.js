module.exports = function(app,mongoose){

	var UserSchema = require("./user.schema.server.js")(app,mongoose),
	UserModel = mongoose.model("UserModel", UserSchema);

	return {
	createUser:function(user){
		user._id = Math.floor(Math.random()*900) + 100;
		return UserModel
			.create(user);
			
	},

	findUserById:function(userId){
		return UserModel
			.findById(userId);
		}
	}

}