const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://disney:disney123@cluster0.3uhvrke.mongodb.net/?retryWrites=true&w=majority").then(()=> {
    console.log("Mongo connected")
}).catch((err)=> {
    console.log("Failed to connect due to", err);
})

//mongoose is an orm that connects node with mongodb for schema creation an user authentication

const User = new mongoose.Schema({
    name: {type: String, require: true},
    email: {type: String, require: true, unique: true},
    password: {type: String, require: true},
    photourl: {type: String, require: true},
    quote: {type: String},
},
    { collection: 'users'}
)

const model = mongoose.model('UserData', User)

module.exports = model