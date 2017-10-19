module.exports=function(app){


  widgets = [
    {'_id': '123', 'widgetType': 'HEADING', 'pageId': '321', 'size': 2, 'text': 'GIZMODO'},
    {'_id': '234', 'widgetType': 'HEADING', 'pageId': '321', 'size': 4, 'text': 'Lorem ipsum'},
    {
      '_id': '345', 'widgetType': 'IMAGE', 'pageId': '321', 'width': '100%',
      'url': 'http://lorempixel.com/400/200/'
    },
    {'_id': '456', 'widgetType': 'HTML', 'pageId': '321', 'text': '<p>Lorem ipsum</p>'},
    {'_id': '567', 'widgetType': 'HEADING', 'pageId': '321', 'size': 4, 'text': 'Lorem ipsum'},
    {
      '_id': '678', 'widgetType': 'YOUTUBE', 'pageId': '321', 'width': '100%',
      'url': 'https://www.youtube.com/embed/AM2Ivdi9c4E'
    },
    {'_id': '789', 'widgetType': 'HTML', 'pageId': '321', 'text': '<p>Lorem ipsum</p>'}
  ];

  api = {
    'createWidget': createWidget,
    'findAllWidgetsForPage': findAllWidgetsForPage,
    'findWidgetById': findWidgetById,
    'updateWidget': updateWidget,
    'deleteWidget': deleteWidget
  };

  app.post('/api/page/:pageId/widget',api.createWidget);
  app.get('/api/page/:pageId/widget',api.findAllWidgetsForPage);
  app.get('/api/widget/:widgetId',api.findWidgetById);
  app.put('/api/widget/:widgetId',api.updateWidget);
  app.delete('/api/widget/:widgetId',api.deleteWidget);

  function createWidget(req,res){
  	var pageId = req.params.pageId;
  	var widget = req.body.widget;
  	widget._id = ""+Math.floor(Math.random()*900) + 100;
  	widget.pageId = pageId;
  	widgets.push(widget);
  	res.send(widget);
  }

  function findAllWidgetsForPage(req,res){
  	var pageId = req.params.pageId;	
    var resultWidgets = [];
    for (var x = 0; x < widgets.length; x++) {
      if (widgets[x].pageId === pageId) {
        resultWidgets.push(widgets[x]);
      }
    }
    res.send(resultWidgets);
  }

  function findWidgetById(req,res){
  	var widgetId = req.params.widgetId;
  	for (var x = 0; x < widgets.length; x++) {
      if (widgets[x]._id === widgetId) {
        res.send(widgets[x]);
      }
    }
  }

  function updateWidget(req,res){
  	var widgetId = req.params.widgetId;
  	var widget = req.body.widget;
  	for(var x = 0; x < widgets.length; x++){
  		if(widgets[x]._id === widgetId){
  			widgets[x] = widget;
  		}
  	}
  }

  function deleteWidget(req,res){
  	var widgetId = req.params.widgetId;
  	for (var x = 0; x < widgets.length; x++) {
      if (widgets[x]._id === widgetId) {
        var index = widgets.indexOf(widgets[x], 0);
        if (index > -1) {
           widgets.splice(index, 1);
        }
      }
    }  	
  }
}