const express = require('express');
const router = express.Router();
const choices = require('../models/choice');
const to = require('../utils/to');

router.get('/', (req, res) => res.render('index.ejs'));

router.post('/', async (req,res) => {

    let chosen = (req.body.cats) ? 'Cats' : 'Dogs';
    let err, result

    if (chosen === 'Cats') {
        [err, result] = await to(choices.findOneAndUpdate({}, {$inc : {'cats' : 1}}));
        if(!result) res.send('Error Occured!');
    } else {
        [err, result] = await to(choices.findOneAndUpdate({}, {$inc : {'dogs' : 1}}));
        if(err) res.send('Error Occured!');
    }

    res.send(`Vote for ${chosen} recorded!`);
})

module.exports = router; 