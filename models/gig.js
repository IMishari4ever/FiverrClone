const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GigSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: 'User'},
  title: String,
  category: String,
  about: String,
  price: Number,
  picture: { type: String, default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtnKNxSMYhaTfScetxzZBycJRMGUtt6Y455g&usqp=CAU'},
  created: { type: Date, default: Date.now }
});

let Model = mongoose.model('Gig', GigSchema);
module.exports = Model;