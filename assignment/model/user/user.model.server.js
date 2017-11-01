module.exports = function(app,mongoose){

	var UserSchema = require("./user.schema.server.js")(app,mongoose),
	UserModel = mongoose.model("User", UserSchema),
	api = {
		"createUser":createUser,
		"findUserById":findUserById,
		"findUserByUsername":findUserByUsername,
		"findUserByCredentials":findUserByCredentials,
		"updateUser":updateUser,
		"deleteUser":deleteUser
	}

	return api;

	
	function createUser(user){
		user._id = mongoose.Types.ObjectId();
		user.dateCreated = new Date();
		user = new UserModel(user);
		return UserModel
			.create(user);		
	}

	function findUserById(userId){
		return UserModel
			.findById(userId);
	}
	
	function findUserByUsername(username){
		return UserModel
			.findOne({username:username});
	}
	
	function findUserByCredentials(username, password){
		return UserModel
			.findOne({username:username,password:password});
	}
	
	function updateUser(userId,user){
		return UserModel
			.findOneAndUpdate({_id:userId},user);
	}

	function deleteUser(userId){
		return UserModel
			.remove({_id:userId});
	}
}