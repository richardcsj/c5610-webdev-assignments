module.exports=function(app,websiteModel){

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
          );
  }

  function findAllWebsitesForUser(req,res){
  	var userId = req.params.userId;
    websiteModel.findAllWebsitesForUser(userId)
        .then(
            function(websites){
              res.send(websites);
            },
            function(error){
              res.status(404).send("No websites found for userId");
            }
          );
  }

  function findWebsiteById(req,res){
  	var websiteId = req.params.websiteId;
    websiteModel.findWebsiteById(websiteId)
        .then(
            function(website){
              res.send(website);
            },
            function(error){
              res.status(404).send('Not found');
            }
          );
    
  }

  function updateWebsite(req,res){
  	var websiteId = req.params.websiteId;
  	var website = req.body.website;
    websiteModel.updateWebsite(websiteId,website)
        .then(
            function(website){
              res.send(website);
            },
            function(error){
              res.status(404).send("couldn't find website for websiteId");
            }
          );
  }

  function deleteWebsite(req,res){
  	var websiteId = req.params.websiteId;
    websiteModel.deleteWebsite(websiteId)
        .then(
            function(result){
              res.send({deleted:true});
            },
            function(error){
              res.status(404).send("couldn't find website for websitId");
            }
          );
  }

}