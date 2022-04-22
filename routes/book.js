const express = require('express');
const { readBook, createBook } = require('../models/book');
const router = express.Router();



router.post('/addnew', async (req, res) => {

    // note we leave error handling for now and assume our data is created.
    // note: this is not safe code. Any inputs from a user should be validated and sanitised before
    // being saved to the database.

    await createBook(req.body);


    res.redirect(303, '/book')


})

router.get('/addnew', async (req, res) => {

    res.render('personform')


})

router.get('/:name', async (req, res) => {
    var name = req.params.name;

    const person = await readBook({ 'name': name })

    if (!person) {
        console.log('404 because book doesn\'t exist');
        res.render('404');
    }
    else {
        res.render('person', { person: person });
    }
})

router.get('/:name/delete', async (req, res) => {
    var name = req.params.name;

    await deleteBook(name);

    res.redirect(303, '/book');

});





router.get('/', async (req, res) => {
    const book = await readBook();

    res.render('listing', { personlist: book })

})



module.exports = router;