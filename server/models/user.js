const mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs');

const userSchema = new mongoose.Schema({
    name: {type: String},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true},
    authLevel : {type: String, required: true},
    middleInitial: {type: String},
    lastName: {type: String},
    dateOfBirth: {type: Date},
    phoneNumber: {type: String},
    address: {type: String, required: true},
    distanceToClinic: {type: String},
    timeToClinic: {type: String}
});

// adds method to user to create hashed password
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

// adds method to user to check if password is correct
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// had to add this, checks if password was changed before saving
userSchema.pre('save', function(next) {
    if(this.isModified('password')) {
        this.password = this.generateHash(this.password);
    }
    next();
});

const User = mongoose.model('user', userSchema);
module.exports = User;