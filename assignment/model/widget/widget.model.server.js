module.exports = function(app,mongoose,PageModel){

	var WidgetSchema = require("./widget.schema.server.js")(app,mongoose),
	WidgetModel = mongoose.model("Widget", WidgetSchema);
	api = {
		"createWidget":createWidget,
		"findAllWidgetsForPage":findAllWidgetsForPage,
		"findWidgetById":findWidgetById,
		"updateWidget":updateWidget,
		"deleteWidget":deleteWidget
	}

	return api;

	
	function createWidget(pageId, widget){
		widget._id = mongoose.Types.ObjectId();
		widget.dateCreated = new Date();
		return PageModel.findPageById(pageId)
			.then(
				function(page){
				widget._page = page;
				return WidgetModel
					.create(widget);
				},
				function(error){
					console.log(error);
					return error;
				}

			)
	}

	function findAllWidgetsForPage(pageId){
		return PageModel.findPageById(pageId)
			.then(
				function(page){
				return WidgetModel
					.find({_page:page});
				},
				function(error){
					console.log(error);
					return error;
				}
			)
	}

	function findWidgetById(widgetId){
		return WidgetModel
			.findOne({_id:widgetId});
	}

	function updateWidget(widgetId,widget){
		return WidgetModel
			.findOneAndUpdate({_id:widgetId},widget);
	}

	function deleteWidget(widgetId){
		return WidgetModel
			.remove({_id:widgetId});
	}
	
}