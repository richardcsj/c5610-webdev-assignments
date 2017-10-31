module.exports = function(app,mongoose){

	var UserSchema = require("./user.schema.server.js")(app,mongoose),
	UserModel = mongoose.model("UserModel", UserSchema);

	return {
		createUser:function(user){
			user._id = Math.floor(Math.random()*900) + 100;
			user.dateCreated = new Date();
			return UserModel
				.create(user);
				
		},

		findUserById:function(userId){
			return UserModel
				.findById(userId);
		},
		findUserByUsername:function(username){
			return UserModel
				.findOne({username:username});
		},
		findUserByCredentials:function(username, password){
			return UserModel
				.findOne({username:username,password:password});
		}
	}
}