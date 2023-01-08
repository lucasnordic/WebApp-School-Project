const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserInfo = require('./UserInfo');

const petLoverSchema = new Schema({
    userinfo: { type: UserInfo, required: true },
    aboutMe: { type: String, required: true },
    imageUrl: { type: String, required: false },
    availableHours: [{ type: String, required: true }],
    acceptablePets: [{ type: String }],
    _services: [{
        type: mongoose.Types.ObjectId,
        ref: 'services'
    }]
});

module.exports = mongoose.model('petLovers', petLoverSchema);