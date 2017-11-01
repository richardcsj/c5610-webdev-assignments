module.exports=function(app,WidgetModel){

  var multer = require('multer'); 
  var upload = multer({ dest: __dirname+'/../../src/assets/uploads' });
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
    WidgetModel.createWidget(pageId,widget)
        .then(
            function(widget){
              res.send(widget);
            },
            function(error){
              res.status(500).send("Couldn't create widget for pageId");
            }
          );
  }

  function findAllWidgetsForPage(req,res){
  	var pageId = req.params.pageId;	
    WidgetModel.findAllWidgetsForPage(pageId)
        .then(
            function(widgets){
              res.send(widgets);
            },
            function(error){
              res.status(404).send("Couldn't find widgets for pageId");
            }
          );
  }

  function findWidgetById(req,res){
  	var widgetId = req.params.widgetId;
    WidgetModel.findWidgetById(widgetId)
        .then(
            function(widget){
              res.send(widget);
            },
            function(error){
              res.status(404).send("Widget not found for wedgetId");
            }
          );
  }

  function updateWidget(req,res){
  	var widgetId = req.params.widgetId;
  	var widget = req.body.widget;
    WidgetModel.updateWidget(widgetId,widget)
        .then(
            function(widget){
              res.send(widget);
            },
            function(error){
              res.status(404).send("Widget not found for wedgetId");
            }
          );
  }

  function deleteWidget(req,res){
  	var widgetId = req.params.widgetId;
    WidgetModel.deleteWidget(widgetId)
        .then(
            function(result){
              res.send({deleted:true});
            },
            function(error){
              res.status(404).send("Widget not found for wedgetId");
            }
          );
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
        WidgetModel.findWidgetById(widgetId)
            .then(
            function(widget){
              widget.url = '/uploads/'+filename;
              widget.name = req.body.widgetName;
              widget.text = req.body.widgetText;
              widget.width = req.body.widgetWidth;
              WidgetModel.updateWidget(widgetId,widget)
                  .then(
                    function(widget){
                      var callbackUrl   = "/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widget._id;
                      res.redirect(callbackUrl);
                    },
                    function(error){
                      res.status(404).send("Widget not found for wedgetId");
                    }
                  );
            },
            function(error){
              res.status(404).send("Widget not found for wedgetId");
            }
          );      
    }

}