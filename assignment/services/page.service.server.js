module.exports= function(app){

  pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
        ];

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
  	page._id = ""+Math.floor(Math.random()*900) + 100;
  	page.websiteId = websiteId;
  	pages.push(page);
  	res.send(page);
  }

  function findAllPagesForWebsite(req,res){
  	var websiteId = req.params.websiteId;	
    var resultPages = [];
    for (var x = 0; x < pages.length; x++) {
      if (pages[x].websiteId === websiteId) {
        resultPages.push(pages[x]);
      }
    }
    res.send(resultPages);
  }

  function findPageById(req,res){
  	var pageId = req.params.pageId;
  	for (var x = 0; x < pages.length; x++) {
      if (pages[x]._id === pageId) {
        res.send(pages[x]);
      }
    }
  }

  function updatePage(req,res){
  	var page = req.body.page;
  	var pageId = req.params.pageId;
  	for (var x = 0; x < pages.length; x++) {
      if (pages[x]._id === pageId) {
        pages[x] = page;
      }
    }
  }

  function deletePage(req,res){
  	var pageId = req.params.pageId;
  	for (var x = 0; x < pages.length; x++) {
      if (pages[x]._id === pageId) {
        var index = pages.indexOf(pages[x], 0);
        if (index > -1) {
           pages.splice(index, 1);
        }
      }
    }
  }
	
}