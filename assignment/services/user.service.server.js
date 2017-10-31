module.exports= function(app,userModel){

    api = {
    'createUser': createUser,
    'findUser': findUser,
    'findUserById':findUserById,
    'updateUser': updateUser,
    'deleteUser': deleteUser
  };

	app.post('/api/user',api.createUser);
	app.get('/api/user',api.findUser);
	app.get('/api/user/:userId',api.findUserById);
	app.put('/api/user/:userId',api.updateUser);
	app.delete('/api/user/:userId',api.deleteUser);

	function createUser(req,res){
		var user = req.body.user;
		userModel.createUser(user)
			.then(
				function(result){
					res.send(result);
				},
				function(error){
					console.log(error);
					res.status(500).send("Couldn't create user");
				}
			);
	}
	
	function findUser(req,res){
		var username = req.query.username;
		var password = req.query.password;
		if(password==undefined){
			userModel.findUserByUsername(username)
				.then(
					function(user){
						res.send(user);
					},
					function(error){
						res.status(404).send('User Not found');
					}
				)
		}else{
			userModel.findUserByCredentials(username,password)
				.then(
					function(user){
						res.send(user);
					},
					function(error){
						res.status(404).send('User Not found');
					}
				)
		}
	}

  	function findUserById(req,res) {
  		var userId = req.params.userId;
  		userModel.findUserById(userId)
	  		.then(
					function(user){
						res.send(user);
					},
					function(error){
						console.log(error);
						res.status(404).send('Not found');
					}
				);
		
	    
  	}

  	function updateUser(req,res){
  		var userId = req.params.userId;
  		var user = req.body.user;
  		userModel.updateUser(userId,user)
  			.then(
  					function(user){
  						res.send(user);
  					},
  					function(error){
  						console.log(error);
  						res.status(404).send("couldn't find user for userId");
  					}
  				); 		
  	}

  	function deleteUser(req,res){
  		var userId = req.params.userId;
  		userModel.deleteUser(userId)
  			.then(
  					function(result){
  						res.send({deleted:true});
  					},
  					function(error){
  						console.log(error);
  						res.status(404).send("Couldn't find user for userId");
  					}
  				);		
  	}
}