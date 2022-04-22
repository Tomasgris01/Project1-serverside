const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    name: String,
    Author: String,
    dob: Date,
    imageurl: String,
    
})

const Book = mongoose.model('Book', bookSchema)

readBook = async (options={}) =>
  {
    if (Object.entries(options).length == 0)
       return Book.find().lean();
   
   else if (options.name)
   
       return Book.findOne(options).lean();
   
   else
       return undefined;
   
}

exports.readBook = readBook;
