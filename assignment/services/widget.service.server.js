module.exports=function(app){

  var multer = require('multer'); 
  var upload = multer({ dest: __dirname+'/../../src/assets/uploads' });

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
    'deleteWidget': deleteWidget,
    'uploadImage':uploadImage
  };

  app.post('/api/page/:pageId/widget',api.createWidget);
  app.get('/api/page/:pageId/widget',api.findAllWidgetsForPage);
  app.get('/api/widget/:widgetId',api.findWidgetById);
  app.put('/api/widget/:widgetId',api.updateWidget);
  app.delete('/api/widget/:widgetId',api.deleteWidget);
  app.post ("/api/upload", upload.single('myFile'), api.uploadImage);

  function createWidget(req,res){
  	var pageId = req.params.pageId;
  	var widget = req.body.widget;
  	widget._id = Math.floor(Math.random()*900) + 100;
    widget._id = ""+ widget._id ;
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
    var found = false;
  	for (var x = 0; x < widgets.length; x++) {
      if (widgets[x]._id === widgetId) {
        found = true;
        res.send(widgets[x]);
      }
    }
    if(!found)
      res.status(404).send('Widget not found for wedgetId');
  }

  function updateWidget(req,res){
  	var widgetId = req.params.widgetId;
  	var widget = req.body.widget;
    var updated = false; 
  	for(var x = 0; x < widgets.length; x++){
  		if(widgets[x]._id === widgetId){
  			widgets[x] = widget;
        updated = true;
        res.send({updated:true});
  		}
  	}
    if(!updated)
      res.status(404).send('Widget not found for wedgetId');
  }

  function deleteWidget(req,res){
  	var widgetId = req.params.widgetId;
    var deleted = false;
  	for (var x = 0; x < widgets.length; x++) {
      if (widgets[x]._id === widgetId) {
        var index = widgets.indexOf(widgets[x], 0);
        if (index > -1) {
           widgets.splice(index, 1);
           deleted = true;
           res.send({deleted:true});
        }
      }
    }
    if(!deleted)
      res.status(404).send('Widget not found for wedgetId');  	
  }

  function uploadImage(req, res) {
        var widget;
        var widgetId      = req.body.widgetId;
        var myFile        = req.file;

        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var pageId = req.body.pageId;

        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;

        for (var x = 0; x < widgets.length; x++) {
          if (widgets[x]._id === widgetId) {
            widget = widgets[x];
          }
        }
        widget.url = '/uploads/'+filename;
        widget.name = req.body.widgetName;
        widget.text = req.body.widgetText;
        widget.width = req.body.widgetWidth;

        var callbackUrl   = "/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId;

        res.redirect(callbackUrl);
    }

}