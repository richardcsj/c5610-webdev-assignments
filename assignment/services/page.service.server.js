module.exports= function(app,pageModel){

  api = {
    'createPage': createPage,
    'findAllPagesForWebsite': findAllPagesForWebsite,
    'findPageById': findPageById,
    'updatePage': updatePage,
    'deletePage': deletePage
  };

  app.post('/api/website/:websiteId/page',api.createPage);
  app.get('/api/website/:websiteId/page',api.findAllPagesForWebsite);
  app.get('/api/page/:pageId',api.findPageById);
  app.put('/api/page/:pageId',api.updatePage);
  app.delete('/api/page/:pageId',api.deletePage);

  function createPage(req,res){
  	var websiteId = req.params.websiteId;
  	var page = req.body.page;
    pageModel.createPage(websiteId,page)
        .then(
            function(page){
              res.send(page);
            },
            function(error){
              res.status(500).send("Couldn't create page");
            }
          );
  }

  function findAllPagesForWebsite(req,res){
  	var websiteId = req.params.websiteId;	
    pageModel.findAllPagesForWebsite(websiteId)
        .then(
            function(pages){
              res.send(pages);
            },
            function(error){
              res.status(404).send("No pages found for websiteId");
            }
          );
  }

  function findPageById(req,res){
  	var pageId = req.params.pageId;
    pageModel.findPageById(pageId)
        .then(
            function(page){
              res.send(page);
            },
            function(error){
              res.status(404).send('Page not found for pageId');
            }
          );
  }

  function updatePage(req,res){
  	var page = req.body.page;
  	var pageId = req.params.pageId;
    pageModel.updatePage(pageId,page)
        .then(
            function(page){
              res.send(page);
            },
            function(error){
              res.status(404).send('Page not found for pageId');
            }
          );
  }

  function deletePage(req,res){
  	var pageId = req.params.pageId;
    pageModel.deletePage(pageId)
        .then(
            function(result){
              res.send({deleted:true});
            },
            function(error){
              res.status(404).send('Page not found for pageId');
            }
          );
  }
	
}