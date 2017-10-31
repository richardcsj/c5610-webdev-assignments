module.exports= function(app,userModel){
	users = [
    {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
    {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
    {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}];

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
		var user;
		if(password==undefined){
			user = findUserByUsername(username);
		}else{
			user = findUserByCredentials(username,password);
		}
		if(user!=undefined)
			res.send(user);
		else
			res.status(404).send('User Not found');
	}

	var findUserByUsername = function(username) {
	    for (var x = 0; x < users.length; x++) {
	      if (users[x].username === username) {
	        return users[x];
	      }
	    }
  	}

  	var findUserByCredentials = function(username, password) {
	    for (var x = 0; x < users.length; x++) {
	      if (users[x].username === username && users[x].password === password) {
	        return users[x];
	      }
	    }
  	}

  	function findUserById(req,res) {
  		var userId = req.params.userId;
  		userModel.
  			findUserById(userId)
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
  		var updated = false;
  		for (var x = 0; x < users.length; x++) {
      		if (users[x]._id === userId) {
        		users[x] = user;
        		updated = true;
        		res.send({updated:true});
     		}
    	}
    	if(!updated)
    		res.status(404).send("couldn't find user for userId");
  	}

  	function deleteUser(req,res){
  		var userId = req.params.userId;
  		var deleted = false;
  		for (var x = 0; x < users.length; x++) {
      		if (users[x]._id === userId) {
        	var index = users.indexOf(users[x], 0);
        		if (index > -1) {
           			users.splice(index, 1);
           			deleted = true;
           			res.send({deleted:true});
        		}
      		}
    	}
    	if(!deleted)
    		res.status(404).send("Couldn't find user for userId");
  	}
}