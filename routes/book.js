const express = require('express');
const { readBook  } = require('../models/book');
const router = express.Router();


router.get('/', async (req, res) =>
{
    const book = await readBook();

    res.render('listing', { personlist: staff })
    
})

router.get('/:name', async (req, res) => {
    var name = req.params.name;

    const person = await readBook({'name': name})

    if (!person) {
        console.log('404 because person doesn\'t exist');
        res.render('404');
    }
    else {
        res.render('person', { person: person });
    }
})



module.exports = router;