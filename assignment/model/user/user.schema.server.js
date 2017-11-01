module.exports = function(app,mongoose){

    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
		firstName: String,
		lastName: String,
		email: String,
		phone: String,
		websites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Website' }],
		dateCreated: Date

    });

    return UserSchema;

}