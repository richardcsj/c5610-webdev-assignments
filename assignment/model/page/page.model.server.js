module.exports = function(app,mongoose,WebsiteModel){

	var PageSchema = require("./page.schema.server.js")(app,mongoose),
	PageModel = mongoose.model("Page", PageSchema);
	api = {
		"createPage":createPage,
		"findAllPagesForWebsite":findAllPagesForWebsite,
		"findPageById":findPageById,
		"updatePage":updatePage,
		"deletePage":deletePage
	}

	return api;

	
	function createPage(websiteId, page){
		page._id = mongoose.Types.ObjectId();
		page.dateCreated = new Date();
		return WebsiteModel.findWebsiteById(websiteId)
			.then(
				function(website){
				page._website = website;
				return PageModel
					.create(page);
				},
				function(error){
					console.log(error);
					return error;
				}

			)
		
			
	}

	function findAllPagesForWebsite(websiteId){
		return WebsiteModel.findWebsiteById(websiteId)
			.then(
				function(website){
				return PageModel
					.find({_website:website});
				},
				function(error){
					console.log(error);
					return error;
				}
			)
	}

	function findPageById(pageId){
		return PageModel
			.findOne({_id:pageId});
	}

	function updatePage(pageId,page){
		return PageModel
			.findOneAndUpdate({_id:pageId},page);
	}

	function deletePage(pageId){
		return PageModel
			.remove({_id:pageId});
	}
	
}