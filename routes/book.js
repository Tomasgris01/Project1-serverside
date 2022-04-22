const express = require('express');
const { readBook, createBook, deleteBook, updateBook } = require('../models/book');
const router = express.Router();



router.post('/addnew', async (req, res) => {



    await createBook(req.body);
    req.session.flash =
    {
        type: 'success', intro: 'Data Saved:', message: "Data for <strong>" +
            req.body.name + "</strong> has been added"
    };
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

router.get('/:name/edit', async (req, res) => {

    var name = req.params.name;

    const person = await readBook({ 'name': name })

    if (!person) {
        console.log('404 because person doesn\'t exist');
        res.render('404');
    }
    else {
        res.render('editbookform', { person: person });
    }
})

router.post('/:name/edit', async (req, res) => {

    await updateBook(req.body);

    res.redirect(303, '/book')

})





router.get('/', async (req, res) => {
    const book = await readBook();

    if (req.session.staffdata) {
        var newName = req.session.staffdata.name;
    }
    else {
        var newName = ""
    }

    res.render('listing', { personlist: book })

})



module.exports = router;