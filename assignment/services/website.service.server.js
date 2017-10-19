module.exports=function(app){

websites = [
        { "_id": "123", "name": "Facebook", "developerId": "456", "description": "Lorem" },
        { "_id": "234", "name": "Tweeter", "developerId": "456", "description": "Lorem" },
        { "_id": "456", "name": "Gizmodo", "developerId": "456", "description": "Lorem" },
        { "_id": "890", "name": "Go", "developerId": "123", "description": "Lorem" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
        { "_id": "678", "name": "Checkers", "developerId": "123", "description": "Lorem" },
        { "_id": "789", "name": "Chess", "developerId": "234", "description": "Lorem" }
    	];

  api = {
    'createWebsite': createWebsite,
    'findAllWebsitesForUser': findAllWebsitesForUser,
    'findWebsiteById': findWebsiteById,
    'updateWebsite': updateWebsite,
    'deleteWebsite': deleteWebsite
  };

  app.post('/api/user/:userId/website',api.createWebsite);
  app.get('/api/user/:userId/website',api.findAllWebsitesForUser);
  app.get('/api/website/:websiteId',api.findWebsiteById);
  app.put('/api/website/:websiteId',api.updateWebsite);
  app.delete('/api/website/:websiteId',api.deleteWebsite);

  function createWebsite(req,res){
  	var website = req.body.website;
  	var userId = req.params.userId;
		if(website!=undefined){
			website._id = ""+Math.floor(Math.random()*900) + 100;
			website.developerId = userId;
			websites.push(website);
			res.send(website);
		}
  }

  function findAllWebsitesForUser(req,res){
  	var userId = req.params.userId;
  	var resultWebsites = [];
    for (var x = 0; x < websites.length; x++) {
      if (websites[x].developerId === userId) {
        resultWebsites.push(websites[x]);
      }
    }
    res.send(resultWebsites);
  }

  function findWebsiteById(req,res){
  	var websiteId = req.params.websiteId;
  	for(var x = 0; x < websites.length; x++){
  		if(websites[x]._id === websiteId){
  			res.send(websites[x]);
  		}
  	}
  }

  function updateWebsite(req,res){
  	var websiteId = req.params.websiteId;
  	var website = req.body.website;
  	for (var x = 0; x < websites.length; x++) {
      if (websites[x]._id === websiteId) {
        websites[x] = website;
      }
    }
  }

  function deleteWebsite(req,res){
  	var websiteId = req.params.websiteId;
  	for (var x = 0; x < websites.length; x++) {
      if (websites[x]._id === websiteId) {
        var index = websites.indexOf(websites[x], 0);
        if (index > -1) {
           websites.splice(index, 1);
        }
      }
    }
  }

	
}