const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addressSchema = new Schema({
   city: { type: String, required: false },
   streetName: { type: String, required: false },
   streetNumber: { type: Number, required: false }
});

const contactInfoSchema = new Schema({
   email: { type: String, required: false },
   phoneNumber: { type: Number },
   address: { type: addressSchema, required: false }
});

const userInfoSchema = new Schema({
   username: { type: String, required: false, unique: true },
   password: { type: String, required: false },
   fullName: { type: String, required: false },
   contactInfo: { type: contactInfoSchema, required: false }
});

const UserInfo = mongoose.model('userinfos', userInfoSchema);
exports.UserInfo = UserInfo;