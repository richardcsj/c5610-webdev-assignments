module.exports = function(app,mongoose){

    var WebsiteSchema = mongoose.Schema({
    	_user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        name:String,
		description: String,	
		pages:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Page' }],
		dateCreated:Date
    });

    return WebsiteSchema;

}