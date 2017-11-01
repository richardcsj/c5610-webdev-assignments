module.exports = function(app,mongoose,UserModel){

	var WebsiteSchema = require("./website.schema.server.js")(app,mongoose),
	WebsiteModel = mongoose.model("Website", WebsiteSchema);
	api = {
		"createWebsiteForUser":createWebsiteForUser,
		"findAllWebsitesForUser":findAllWebsitesForUser,
		"findWebsiteById":findWebsiteById,
		"updateWebsite":updateWebsite,
		"deleteWebsite":deleteWebsite
	}

	return api;

	
	function createWebsiteForUser(userId, website){
		website._id = mongoose.Types.ObjectId();
		website.dateCreated = new Date();
		return UserModel.findUserById(userId)
			.then(
				function(user){
				website._user = user;
				return WebsiteModel
					.create(website);
				},
				function(error){
					console.log(error);
					return error;
				}

			)
		
			
	}

	function findAllWebsitesForUser(userId){
		return UserModel.findUserById(userId)
			.then(
				function(user){
				return WebsiteModel
					.find({_user:user});
				},
				function(error){
					console.log(error);
					return error;
				}
			)
	}

	function findWebsiteById(websiteId){
		return WebsiteModel
			.findOne({_id:websiteId});
	}

	function updateWebsite(websiteId,website){
		return WebsiteModel
			.findOneAndUpdate({_id:websiteId},website);
	}

	function deleteWebsite(websiteId){
		return WebsiteModel
			.remove({_id:websiteId});
	}
	
}