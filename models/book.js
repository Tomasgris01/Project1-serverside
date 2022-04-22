const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    name: String,
    Author: String,
    published: String,
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

createBook = async (data) => {
    let bookDoc = new Book(data);
    await bookDoc.save();
}

deleteBook = async (name) => {
    const book = await Book.findOne({ name: name });
    await book.remove();

}

updateBook = async (data) => {
    var id = data._id;
    console.log(id);
    console.table(data)
    await Book.findByIdAndUpdate({_id: id}, {...data})
}

exports.readBook = readBook;
exports.createBook = createBook;
exports.deleteBook = deleteBook;
exports.updateBook = updateBook;
