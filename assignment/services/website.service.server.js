module.exports=function(app,websiteModel){

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
		websiteModel.createWebsiteForUser(userId,website)
        .then(
            function(result){
              res.send(result);
            },
            function(error){
              console.log(error);
              res.status(500).send("Couldn't create website");
            }
          )
  }

  function findAllWebsitesForUser(req,res){
  	var userId = req.params.userId;
    websiteModel.findAllWebsitesForUser(userId)
        .then(
            function(websites){
              res.send(websites);
            },
            function(error){
              console.log(error);
              res.status(404).send("No websites found for userId");
            }
          )
  }

  function findWebsiteById(req,res){
  	var websiteId = req.params.websiteId;
    var found = false;
  	for(var x = 0; x < websites.length; x++){
  		if(websites[x]._id === websiteId){
  			res.send(websites[x]);
        found = true;
  		}
  	}
    if(!found)
      res.status(404).send('Not found');
  }

  function updateWebsite(req,res){
  	var websiteId = req.params.websiteId;
  	var website = req.body.website;
    var edited = false;
  	for (var x = 0; x < websites.length; x++) {
      if (websites[x]._id === websiteId) {
        websites[x] = website;
        edited = true;
        res.send({updated:true});
      }
    }
    if(!edited)
      res.status(404).send("couldn't find website for websiteId");
  }

  function deleteWebsite(req,res){
  	var websiteId = req.params.websiteId;
    var deleted = false;
  	for (var x = 0; x < websites.length; x++) {
      if (websites[x]._id === websiteId) {
        var index = websites.indexOf(websites[x], 0);
        if (index > -1) {
           websites.splice(index, 1);
           deleted = true;
           res.send({deleted:true});
        }
      }
    }
    if(!deleted)
      res.status(404).send("couldn't find website for websitId");
  }

	
}